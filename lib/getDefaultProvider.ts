const { ethers } = require("ethers");

const getDefaultProvider = (chainId: number) => {
    const apiKey = process.env.ALCHEMY_API_KEY
    const baseAlchemyUrl = `.g.alchemy.com/v2/${apiKey}`
    
    //ETHEREUM
    const goerliRpc = apiKey ? "https://eth-goerli" + baseAlchemyUrl : "https://ethereum-goerli-rpc.allthatnode.com";
    // POLYGON
    const polygonRpc = "https://polygon-rpc.com";
    const polygonMumbaiRpc = "https://rpc-mumbai.maticvigil.com";
    // OPTIMISM
    const optimismRpc = "https://mainnet.optimism.io";
    const optimismGoerliRpc = "https://goerli.optimism.io/";
    // ARBITRUM
    const arbitrumRpc = "https://rpc.ankr.com/arbitrum";
    const arbitrumGoerliRpc = "https://goerli-rollup.arbitrum.io/rpc";

    const chainIdInt = parseInt(chainId?.toString());

    if (!chainId) return null;

    // eth
    if (chainIdInt === 5) {
        return ethers.getDefaultProvider(goerliRpc);
    }

    // polygon
    if (chainIdInt === 137) {
        return ethers.getDefaultProvider(polygonRpc);
    }
    if (chainIdInt === 80001) {
        return ethers.getDefaultProvider(polygonMumbaiRpc);
    }

    // optimism
    if (chainIdInt === 10) {
        return ethers.getDefaultProvider(optimismRpc);
    }
    if (chainIdInt === 420) {
        return ethers.getDefaultProvider(optimismGoerliRpc);
    }

    // arbitrum
    if (chainIdInt === 42161) {
        return ethers.getDefaultProvider(arbitrumRpc);
    }
    if (chainIdInt === 421613) {
        return ethers.getDefaultProvider(arbitrumGoerliRpc);
    }

    return ethers.getDefaultProvider(chainIdInt);
};

export default getDefaultProvider;
