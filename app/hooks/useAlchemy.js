import { Alchemy, Network } from "alchemy-sdk";

export default () => {
  const settings = {
    apiKey: process.env.ALCHEMY_API_KEY,
    network: Network.MATIC_AMOY,
  };

  const alchemy = new Alchemy(settings);

  const getOwnerNFTs = async (address) => {
    let options = {
      excludeFilters: "SPAM",
    };
    // return await alchemy.nft.getNftsForOwner('vitalik.eth');
    const nfts = await alchemy.nft.getNftsForOwner(address, options);
    return nfts.ownedNfts;
  };

  const getNFTMetadata = async (contract, tokenId) => {
    const metadata = await alchemy.nft.getNftMetadata(contract, tokenId, {});
    console.log(metadata);
    return metadata;
  };

  return {
    getOwnerNFTs,
    getNFTMetadata,
  };
};
