const JWTkey = process.env.NEXT_PUBLIC_JWT_SECRET;

export const JWTsecret = new TextEncoder().encode(
  JWTkey,
)
export const alg = 'HS256'
import { Order } from "@/app/api/(main)/placeOrder/types"

export const eventsDataWithItems = [
  {
    id: 1,
    heading: "Will Dhoni play in IPL-2026?",
    text: "Even if Dhoni is in the IPL squad it will be considered as yes.",
    imageUri: "https://i.ibb.co/cBLxjh7/dhoni.jpg",
    itemId: 1,

  },
  {
    id: 2,
    heading: "OpenAI becomes a for-profit in 2025?",
    text: "Only official report by OpenAI will be considered.",
    imageUri: "https://i.ibb.co/zhBmYh4R/openAI.png",
    itemId: 2,

  },
  {
    id: 3,
    heading: "Will Sam Altman get OpenAI equity in 2025?",
    text: "If confirmed officialy by a legal source or himself",
    imageUri: "https://i.ibb.co/My92PCpc/sam-Altman.jpg",
    itemId: 3,

  },
  {
    id: 4,
    heading: "Will Max Verstappen leave Red Bull before 2026?",
    text: "",
    imageUri: "https://i.ibb.co/8DtxMXbP/max-verst.jpg",
    itemId: 4,
  },
  {
    id: 5,
    heading: "Will India reach WTC-2026?",
    text: "",
    imageUri: "https://i.ibb.co/tPBvVZcq/India.png",
    itemId: 5,

  },
  {
    id: 6,
    heading: "Will bitcoin reach 1.5 lakh INR before 2026?",
    text: "Prices fetched from binance will be considered",
    imageUri: "https://i.ibb.co/NnjRpVq4/bitcoin.png",
    itemId: 7,

  },
  {
    id: 7,
    heading: "Solana ETF approved by Aug 31?",
    text: "SEC decision on Solana ETF applications due.",
    imageUri: "https://i.ibb.co/Dg5b1Rzt/solana.jpg",
    itemId: 7,

  },
  {
    id: 8,
    heading: "Bitcoin ETF Approval Decision by Aug 31?",
    text: "SEC decision on Bitcoin ETF applications due.",
    imageUri: "https://i.ibb.co/NnjRpVq4/bitcoin.png",
    itemId: 8,

  },
]
//asks = no
export let asks: { [itemId: number]: Order[] } = { "1": [], "2": [], "3": [], "4": [], "5": [], "6": [], "7": [], "8": [] };
//bids = yes
export let bids: { [itemId: number]: Order[] } = { "1": [], "2": [], "3": [], "4": [], "5": [], "6": [], "7": [], "8": [] };
