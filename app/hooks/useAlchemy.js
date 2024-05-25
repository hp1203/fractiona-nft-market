import { Alchemy, Network } from "alchemy-sdk";

export default () => {
  const settings = {
    apiKey: "2W7nnlFNFkzlp-n_fPMsltYin6vYuPiJ",
    network: Network.MATIC_MAINNET,
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
    return metadata;
  };

  return {
    getOwnerNFTs,
    getNFTMetadata,
  };
};
