import { useEffect, useState } from "react";
import { Alert } from "react-native";

export const useAppwrite = <T>(fn: Function) => {
    const [data, setData] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await fn();
            setData(response as T[]);
        } catch (error) {
            Alert.alert("Error", (error as Error).message);
        } finally {
            setIsLoading(false);
        }
    }


    // call useEffect, check db for data, if empty return the [], and assign videoList to the FlatList's data prop
    useEffect(() => {
        fetchData();
    }, [])

    const reFetchData = async () => {
        await fetchData();
        console.log("Fetching Data Again", "From useAppwrite.ts \n\n")
    };

    return { isLoading, data, reFetchData };
}