import { CurrencySymbol, NET, NetworkName } from "./net.i";

const Goerli: NET = {
    id: 1001,
    networkName: NetworkName.TronNile,
    nativeCurrency: CurrencySymbol.TRX,
    explorer: {
        tx: 'https://nile.tronscan.org/#/transaction/',
        address: 'https://nile.tronscan.org/#/address/',
        block: 'https://nile.tronscan.org/#/block/'
    },
    rpc: [
    ],
    multicall: "TDy8gPHY7DPaJFszQLwNmsv7MvJibMNkvL",
    tornadoContracts: [

    ],
    miningBlockSeconds: 3,
    wrapedNativToken: { address: 'TYsbWxNnyTgsZaTFaue9hqpxkU3Fkco94a', decimals: 6, symbol: CurrencySymbol.WTRX },
    USD: { address: 'TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj', decimals: 6, symbol: CurrencySymbol.USDT },
    uniswapRouter: "",
}

export default Goerli;