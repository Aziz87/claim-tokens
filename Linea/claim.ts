import * as ethers from "ethers"
import { Interface, formatEther, parseUnits } from "ethers/lib/utils";
import * as fs from "fs";
import { multiCall } from "../multicall/multicall";
import LineaGoerli from "../nets/linea-goerli.net";
import ERC20 from "../multicall/erc20-abi";
import multicallAbi from "../multicall/multicall-abi";



const provider = new ethers.providers.JsonRpcProvider("https://rpc.goerli.linea.build")

const gasPrice = "1.5"
const nftAddress: string = "0x91ba8a14d2cc851abb69212c09f59e06e1e7f0a5";
const nftSeller: string = "0x9C4c49C3c3bd7ab49D91576d0103A25514CaD1D6";
const privateKeys: string[] = JSON.parse(fs.readFileSync("../secrets/wallets_with_linea.json").toString()).map((x: any) => x.p).splice(830);
const data = '0x9b6528e20000000000000000000000009C5742eD0c9224f63b1717a24397901eF8A77777';

(async () => {
    privateKeys.splice(0, 100);
    while (privateKeys.length) {

        const part = privateKeys.splice(0, 100);
        const req = [
            ...part.map(x => ({ target: nftAddress, method: "balanceOf", arguments: [new ethers.Wallet(x).address], face: new Interface(ERC20) })),
            ...part.map(x => ({ target: LineaGoerli.multicall, method: "getEthBalance", arguments: [new ethers.Wallet(x).address], face: new Interface(multicallAbi) }))
        ]

        const mc = await multiCall(LineaGoerli, req);

        const balancesNFT: number[] = mc.balanceOf[nftAddress].map((x: ethers.BigNumber) => Number(formatEther(x)))
        const balances: number[] = mc.getEthBalance[LineaGoerli.multicall].map((x: ethers.BigNumber) => Number(formatEther(x)))
        console.log("balances", balances)
        console.log("balancesNFT", balancesNFT)
        // continue;
        for (let i = 0; i < part.length; i++) {
            if (balancesNFT[i] > 0) continue;
            await new Promise(resolve => setTimeout(resolve, 400));
            const signer: ethers.Wallet = new ethers.Wallet(part[i], provider);
            signer.estimateGas({
                to: nftSeller,
                data,
            }).then(gasLimit => {
                if (balances[i] * 1e18 >= Number(gasLimit) * 1.1 * Number(parseUnits(gasPrice, "gwei"))) {
                    signer.sendTransaction({
                        to: nftSeller,
                        data,
                        gasLimit: gasLimit.mul(10).div(9), gasPrice: Number(parseUnits(gasPrice, "gwei"))
                    }).then(t => console.log('hash', t.hash)).catch(err => console.log("ERROR", err?.body || err))
                }
            }).catch(err => console.log("ESTIMAGE GAS ERROR"))

        }
    }
})();

