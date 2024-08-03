import axios from "axios";
import { createContext, useEffect, useState } from "react";

const ToggleContext = createContext(null);

const ContextApi = ({ children }) => {
  const [login, setLogin] = useState({
    isLoading: false,
    isError: false,
    data: [],
  });

  useEffect(() => {
    const getData = async () => {
      setLogin({ ...login, isLoading: true });
      try {
        const res = await axios.get(`http://localhost:3000/login`);
        setLogin({ ...login, isLoading: false, data: res.data });
      } catch (err) {
        setLogin({ ...login, isLoading: false, isError: true });
      }
    };

    getData();
  }, []);

  return (
    <ToggleContext.Provider value={{ login, setLogin }}>
      {children}
    </ToggleContext.Provider>
  );
};

export default ContextApi;