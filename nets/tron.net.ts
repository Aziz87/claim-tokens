import { CurrencySymbol, NET, NetworkName } from "./net.i";

const Goerli: NET = {
    id: 1000,
    networkName: NetworkName.Tron,
    nativeCurrency: CurrencySymbol.TRX,
    explorer: {
        tx: 'https://tronscan.org/#/transaction/',
        address: 'https://tronscan.org/#/address/',
        block: 'https://tronscan.org/#/block/'
    },
    rpc: [

    ],
    multicall: "TASqW3swpYnYdpSQ6iCEEAGFBpcMFGbgF3",
    tornadoContracts: [

    ],
    miningBlockSeconds: 3,
    wrapedNativToken: { address: 'TNUC9Qb1rRpS5CbWLmNMxXBjyFoydXjWFR', decimals: 6, symbol: CurrencySymbol.WTRX },
    USD: { address: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t', decimals: 6, symbol: CurrencySymbol.USDT },
    uniswapRouter: ""
}

export default Goerli;