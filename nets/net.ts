import TronNile from './tron-nileex.net';
import Tron from './tron.net';
import Arbitrum from "./arbitrum.net";
import Avalanche from "./avalanche.net";
import BinanceSmartChainTestnet from "./binance-smart-chain-test.net";
import BinanceSmartChain from "./binance-smart-chain.net";
import Ethereum from "./ethereum.net";
import Gnosis from "./gnosis.net";
import Goerli from "./goerli.net";
import { NET } from "./net.i";
import Optimism from "./optimism.net";
import Poligon from "./poligon.net";

const nets: NET[] = [
    Ethereum, BinanceSmartChain, Poligon, Optimism, Arbitrum, Gnosis, Avalanche, Goerli, BinanceSmartChainTestnet, TronNile, Tron
]

export default nets;
