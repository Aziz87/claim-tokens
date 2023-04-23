import * as ethers from "ethers";
import { Interface, formatEther, parseEther, parseUnits } from "ethers/lib/utils";
import * as fs from "fs"
import LineaGoerli from '../nets/linea-goerli.net';
const pacients: string[] = JSON.parse(fs.readFileSync("../secrets/wallets_for_linea.json").toString()).map((x: any) => x.a)
import { multiCall } from "../multicall/multicall";
import multicallAbi from "../multicall/multicall-abi"
import * as dotenv from 'dotenv'
import erc20Abi from "../multicall/erc20-abi";
dotenv.config({ path: "../.env" })


const provider = new ethers.providers.JsonRpcProvider("https://rpc.goerli.linea.build")
const nftAddress = "0x91ba8a14d2cc851abb69212c09f59e06e1e7f0a5"
const env: any = process?.env;
console.log(env.donor)
const donor: ethers.Wallet = new ethers.Wallet(env.donor, provider);
const value = "0.001";
const gasPrice = "1.5";


donor.getTransactionCount("pending").then(async (nonce: number) => {
    nonce--;
    console.log("nonce", nonce);

    while (pacients.length) {
        const part = pacients.splice(0, 100);


        const req = [
            ...part.map(x => ({ target: nftAddress, method: "balanceOf", arguments: [new ethers.Wallet(x).address], face: new Interface(erc20Abi) })),
            ...part.map(x => ({ target: LineaGoerli.multicall, method: "getEthBalance", arguments: [new ethers.Wallet(x).address], face: new Interface(multicallAbi) }))
        ]

        const mc = await multiCall(LineaGoerli, req);

        const balancesNFT: number[] = mc.balanceOf[nftAddress].map((x: ethers.BigNumber) => Number(formatEther(x)))
        const balances: number[] = mc.getEthBalance[LineaGoerli.multicall].map((x: ethers.BigNumber) => Number(formatEther(x)))

        console.log("balances", balances)
        console.log("balancesNFT", balancesNFT)
        // continue;
        for (let i = 0; i < part.length; i++) {
            if (balances[i] >= Number(value)) continue;
            if (balancesNFT[i] !== 0) continue;

            nonce++;
            const to = part[i];
            console.log("send", to, "nonce", nonce)
            await new Promise(resolve => setTimeout(resolve, 400))
            donor.sendTransaction({
                to, value: ethers.utils.parseEther(value), nonce,
                gasLimit: 21000, gasPrice: Number(parseUnits(gasPrice, "gwei"))
            }).then(async a => {
                const r: ethers.providers.TransactionReceipt = await a.wait();
                console.log("hash", r.transactionHash)
            }).catch(err => console.error(err?.body ? JSON.parse(err?.body).error.message : err))

        }
    }
});



