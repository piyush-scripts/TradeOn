import { engine } from "./match-engine.js";

engine.startup().then(() => engine.processLoop()).catch((err) => {
    console.error("Match Engine crashed at boot:", err);
    process.exit(1);
});
