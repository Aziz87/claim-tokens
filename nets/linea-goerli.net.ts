import { CurrencySymbol, NET, NetworkName } from "./net.i";

const LineaGoerli: NET = {
    id: 59140,
    networkName: NetworkName.EthereumLineaGoerli,
    nativeCurrency: CurrencySymbol.ETH,
    explorer: {
        tx: 'https://explorer.goerli.linea.build/tx/',
        address: 'https://explorer.goerli.linea.build/address/',
        block: 'https://explorer.goerli.linea.build/block/'
    },
    rpc: [
        { name: 'Linea Goerli rpc', url: 'https://rpc.goerli.linea.build' }
    ],
    multicall: "0x9901f3053527a58B8C210B144f53CbeA7b6E23Fb",
    tornadoContracts: [
    ],
    miningBlockSeconds: 12,
    wrapedNativToken: { address: '0x2C1b868d6596a18e32E61B901E4060C872647b6C', decimals: 18, symbol: CurrencySymbol.WETH },
    USD: { address: '0x83240E55e35147B095e8958103a4fd4B32700a3C', decimals: 18, symbol: CurrencySymbol.USDT },
    uniswapRouter: ""
}

export default LineaGoerli;