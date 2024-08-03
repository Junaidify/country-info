import axios from "axios";
import { useEffect, useState } from "react";

export const useFetch = (CURRENCY_CODE) => {
  const [data, setData] = useState({
    isLoading: false,
    isError: false,
    data: [],
  });

  useEffect(() => {
    setData({ ...data, isLoading: true });

    const getData = async () => {
      try {
        const res = await axios.get(
          `https://restcountries.com/v3.1/currency/${CURRENCY_CODE}`
        );
        setData({ ...data, isLoading: false, data: res.data });
        // console.log(res.data);
      } catch (err) {
        setData({ ...data, isLoading: false, isError: true });
      }
    };

    getData();
  }, []);

  return data;
};