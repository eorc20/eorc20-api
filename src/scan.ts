import fs from "node:fs";
import readline from "node:readline";
import { InscriptionRawData } from "./schemas.js";
import { handleOpCode } from "./operations/index.js";
import { parseOpCode } from "./eorc20.js";
import { Address, Hex } from "viem";

export async function scan() {
    console.log("Scanning inscriptions...");
    let operations = 0;
    return new Promise((resolve, reject) => {
        // console.time("Scan completed");
        // const rl = readline.createInterface({
        //     input: fs.createReadStream(EORC20_PATH),
        //     crlfDelay: Infinity
        // });
        // rl.on('line', (line) => {
        //     const {id, from, to, content, timestamp} = JSON.parse(line) as InscriptionRawData;
        //     const opCode = parseOpCode(content);
        //     handleOpCode(id as Hex, from as Address, to as Address, opCode, timestamp);
        //     operations++;
        // });

        // rl.on("close", () => {
        //     console.timeEnd("Scan completed");
        //     console.log(`Total operations: ${operations}`);
        //     return resolve(true);
        // });

        // rl.on("error", (error) => {
        //     return reject(error);
        // });
    });
}

// await scan();