import * as Clipboard from "expo-clipboard";
import { useToast } from "react-native-toast-notifications";

export default function useUtils() {
    const toast = useToast();
    const numberFormatter = (num, digits) => {
         const lookup = [
            { value: 1, symbol: "" },
            { value: 1e3, symbol: "k" },
            { value: 1e6, symbol: "M" },
            { value: 1e9, symbol: "G" },
            { value: 1e12, symbol: "T" },
            { value: 1e15, symbol: "P" },
            { value: 1e18, symbol: "E" }
        ];
        const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        var item = lookup.slice().reverse().find(function(item) {
            return num >= item.value;
        });
        return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
        // return num >= 1000 ? `${(num/1000).toFixed(digits)}K` : num;
    }

    const shortenAddress = (address) => {
        return `${address.slice(0, 6)}...${address.slice(
          address.length - 4,
          address.length
        )}`;
    };

    const copyToClipboard = async (text) => {
        await Clipboard.setString(text)
        toast.show("Copied!", {
            type:"custom_success",
            placement: "top",
            duration: 4000,
            animationType: "zoom-in",
          });
    }
    
    return {
        numberFormatter,
        shortenAddress,
        copyToClipboard
    }
}