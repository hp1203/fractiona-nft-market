import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import Layout from "../components/Layout";
import * as ImagePicker from "expo-image-picker";
import tailwindColors from "../constants/tailwindColors";
import axios, { Axios } from "axios";

const MintNFTScreen = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result.assets);

    if (!result.canceled) {
      setImage(result.assets);
    }
};

const uploadToIpfs = async () => {
    // try {
        // console.log("Image", image);
        // ImagePicker saves the taken photo to disk and returns a local URI to it
        let localUri = image[0].uri;
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        // let match = /\.(\w+)$/.exec(filename);
        let type = image[0].mimeType;

        const formData = new FormData();
        const file = { uri: localUri, name: filename, type };
        formData.append("file", file);
        console.log("File", file);

        // const metadata = JSON.stringify({
        //   name: "File name",
        // });
        // formData.append("pinataMetadata", metadata);
  
        // const options = JSON.stringify({
        //   cidVersion: 0,
        // });

        // formData.append("pinataOptions", options);
  
        // const res = await axios(
        //   "https://api.pinata.cloud/pinning/pinFileToIPFS",
        //   {
        //     method: "POST",
        //     headers: {
        //       "Authorization": `Bearer ${import.meta.env.PINATA_API_JWT}`,
        //       "Content-Type": "multipart/form-data"
        //     },
        //     body: formData,
        //   }
        // );
        
        // const res = await axios({
        //     method: "POST",
        //     url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        //     data: formData,
        //     headers: {
        //         "Authorization": `Bearer ${import.meta.env.PINATA_API_JWT}`,
        //         "Content-Type": "multipart/form-data"
        //     }
        // });
        axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
            headers: {
                "Accept": 'application/json',
                "Authorization": `Bearer ${import.meta.env.PINATA_API_JWT}`,
                "Content-Type": "multipart/form-data"
            }
        }).then(res => res.json()).then(console.log).catch(error => console.log(error))
        // const resData = await res.json();
        // console.log(resData);
    //   }
    //    catch (error) {
    //     console.log(error);
    //   }
  };

  return (
    <Layout>
      <ScrollView
        showsVerticalScrollIndicator="false"
        className="m-3 flex space-y-3"
      >
        <View className="w-full h-80 border border-gray-500 rounded-2xl flex justify-center items-center overflow-hidden">
          {image !== null ? (
            <Image
              source={{
                uri: image[0].uri,
              }}
              resizeMode="cover"
              className="w-full h-80"
            />
          ) : (
            <Pressable onPress={pickImage} className="border">
              <Text className="text-white text-center font-semibold ">
                Click here{"\n"} to select image
              </Text>
            </Pressable>
          )}
        </View>
        {/* <View className="border border-gray-500 rounded-xl bg-gray-800 px-3">
        </View> */}
        <TextInput
          placeholder="Enter NFT Name"
          className="h-16 text-white text-lg border rounded-2xl px-3 border-gray-400"
          placeholderTextColor={tailwindColors.gray["400"]}
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <TextInput
          placeholder="Enter NFT Description"
          numberOfLines={10}
          className="h-16 text-white text-lg border rounded-2xl px-3 border-gray-400"
          placeholderTextColor={tailwindColors.gray["400"]}
          onChangeText={(text) => setDescription(text)}
          value={description}
        />
        <Pressable
          className="flex items-center justify-center bg-yellow-400 p-3 rounded-full"
          onPress={uploadToIpfs}
        >
          <Text className="text-gray-900 text-xl font-semibold">Mint</Text>
        </Pressable>
      </ScrollView>
    </Layout>
  );
};

export default MintNFTScreen;
