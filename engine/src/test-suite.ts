import "dotenv/config";
import { MatchEngine } from "./match-engine.js";
import { RedisClient } from "@/lib/redis.js";

async function runTestSuite() {
  console.log("\n🧪 ==========================================");
  console.log("   TradeOn End-to-End Core Verification Suite");
  console.log("==========================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${testName} - ${detail || 'Assertion failed'}`);
      failed++;
    }
  }

  // TEST 1: Match Engine Initialization
  console.log("📌 Test Group 1: Match Engine Core Operations");
  const engine = new MatchEngine();
  engine.initializeMarket(999);
  const initialBook = engine.getMarketBook(999);
  assert(initialBook !== undefined, "Initialize Market #999", "Market book should be defined");
  assert(initialBook?.yesOrders.length === 0, "Zero-State YES Orderbook", "YES orders should be 0");
  assert(initialBook?.noOrders.length === 0, "Zero-State NO Orderbook", "NO orders should be 0");

  // TEST 2: User Balance Locking & Order Creation
  console.log("\n📌 Test Group 2: Balance Locking & Order Placement");
  const userIdA = "test_user_alpha";
  const userIdB = "test_user_beta";

  // Simulate processOrder for User A: Place YES bid @ 60 paise (Qty: 10) = 600 paise cost
  await (engine as any).processOrder({
    requestId: "req-1",
    clientOrderId: "ord-yes-1",
    userId: userIdA,
    marketId: 999,
    type: "ORDER_CREATE",
    side: "YES",
    price: 60,
    quantity: 10,
    timestamp: Date.now(),
  }, false);

  const bookAfterYes = engine.getMarketBook(999);
  assert(bookAfterYes?.yesOrders.length === 1, "Resting YES Order Enqueued", "YES orderbook should have 1 resting order");
  assert(bookAfterYes?.yesOrders[0].price === 60, "YES Limit Price Verification", "Price should be 60 paise");

  const balA = (engine as any).balances.get(userIdA);
  assert(balA?.reserved === 600, "Reserve Balance Lock (User A)", `Expected reserved: 600 paise, got: ${balA?.reserved}`);

  // TEST 3: Complementary Cross-Side Order Matching (YES @ 60 + NO @ 40 = 100)
  console.log("\n📌 Test Group 3: Cross-Side Binary Order Matching");
  // User B places NO bid @ 40 paise (Qty: 10)
  await (engine as any).processOrder({
    requestId: "req-2",
    clientOrderId: "ord-no-1",
    userId: userIdB,
    marketId: 999,
    type: "ORDER_CREATE",
    side: "NO",
    price: 40,
    quantity: 10,
    timestamp: Date.now(),
  }, false);

  const bookAfterMatch = engine.getMarketBook(999);
  assert(bookAfterMatch?.yesOrders.length === 0, "YES Resting Order Filled", "YES orderbook should be empty after fill");
  assert(bookAfterMatch?.noOrders.length === 0, "NO Resting Order Filled", "NO orderbook should be empty after fill");

  const balAAfterMatch = (engine as any).balances.get(userIdA);
  assert(balAAfterMatch?.reserved === 0, "User A Reserved Cleared After Fill", `Expected reserved: 0, got: ${balAAfterMatch?.reserved}`);

  // TEST 4: Order Cancellation & Reserved Fund Release
  console.log("\n📌 Test Group 4: Order Cancellation & Fund Unlock");
  // User A places YES bid @ 50 paise (Qty: 20) = 1000 paise cost
  await (engine as any).processOrder({
    requestId: "req-3",
    clientOrderId: "ord-yes-2",
    userId: userIdA,
    marketId: 999,
    type: "ORDER_CREATE",
    side: "YES",
    price: 50,
    quantity: 20,
    timestamp: Date.now(),
  }, false);

  const balABeforeCancel = (engine as any).balances.get(userIdA);
  assert(balABeforeCancel?.reserved === 1000, "Reserve Balance Locked for Open Order", `Expected reserved: 1000, got: ${balABeforeCancel?.reserved}`);

  // Cancel order
  await (engine as any).processCancel({
    requestId: "req-4",
    clientOrderId: "ord-yes-2",
    userId: userIdA,
    marketId: 999,
    type: "ORDER_CANCEL",
    timestamp: Date.now(),
  }, false);

  const balAAfterCancel = (engine as any).balances.get(userIdA);
  assert(balAAfterCancel?.reserved === 0, "Reserved Funds Released on Order Cancel", `Expected reserved: 0, got: ${balAAfterCancel?.reserved}`);

  // TEST 5: Idempotency Lock Deduplication
  console.log("\n📌 Test Group 5: Idempotency Deduplication");
  const processedBefore = (engine as any).processedRequests.has("req-1");
  assert(processedBefore === true, "Request ID Tracked for Deduplication", "req-1 should be in processedRequests set");

  console.log("\n==========================================");
  console.log(`📊 Test Results: ${passed} Passed, ${failed} Failed`);
  console.log("==========================================\n");

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTestSuite().catch((err) => {
  console.error("Test Suite Execution Error:", err);
  process.exit(1);
});
