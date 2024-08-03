import axios from "axios";
import { useEffect, useState } from "react";

export const useLocalData = (endpoint) => {
  const [fetchedData, setFetchedData] = useState({
    isLoading: false,
    isError: false,
    data: [],
  });

  useEffect(() => {
    const getData = async () => {
      setFetchedData({ ...fetchedData, isLoading: true });
      try {
        const res = await axios.get(`http://localhost:3000/${endpoint}`);
        setFetchedData({ ...fetchedData, isLoading: false, data: res.data });
      } catch (err) {
        setFetchedData({ ...fetchedData, isLoading: false, isError: true });
      }
    };

    getData();
  }, [endpoint]);

  return fetchedData;
};
