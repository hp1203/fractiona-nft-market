import { ActivityIndicator, FlatList, Text, View } from "react-native";
import useAlchemy from "../hooks/useAlchemy";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import NFTCard from "../components/NFTCard";
import Layout from "../components/Layout";
const MyNFTsScreen = () => {
  const { getOwnerNFTs } = useAlchemy();
  const { address } = useAccount();
  const [nfts, setNfts] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log(address);
    const fetchData = async () => {
      setLoading(true);
      getOwnerNFTs(address)
        .then((res) => {
          setNfts(res);
          setLoading(false);
          console.log("NFTs",res[res.length - 1]);
        })
        .catch((err) => {
          setLoading(false);
          console.log("Error", err);
        });
    };
    fetchData();
  }, [address]);
  return (
    <Layout className="flex flex-1">
      {loading ? (
        <ActivityIndicator/>
      ) : (
        <FlatList
          data={nfts}
          renderItem={({item}) => (
            <View className=" m-2">
              <NFTCard tokenId={item.tokenId} contract={item.contract.address} nftName={item.name} nftImage={item.image.originalUrl || item.image.cachedUrl}/>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </Layout>
  );
};

export default MyNFTsScreen;
