import { Wallet } from "ethers";
import * as fs from "fs";

const privateKeys = JSON.parse(fs.readFileSync("../secrets/privateKeys.json").toString());
const privateKeys2 = JSON.parse(fs.readFileSync("../secrets/privateKeys2.json").toString());
const validAddresses = JSON.parse(fs.readFileSync("../secrets/validAddresses.json").toString()).map((x: string) => x.toLowerCase());
for (let privateKey of privateKeys2) if (privateKeys.indexOf(privateKey) === -1) privateKeys.push(privateKey);


(async () => {
    const wallets: { a: string, p: string }[] = [];
    for (let p of privateKeys) {
        const wallet = new Wallet(p);
        const a = await wallet.getAddress();
        if (validAddresses.indexOf(a.toLowerCase()) === -1) {
            wallets.push({ a, p })
        }
    }

    fs.writeFileSync("../secrets/wallets.json", JSON.stringify(wallets, undefined, 2));
})()
