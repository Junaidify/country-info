import { Box, Button, Input } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocalData } from "../hooks/useLocalData";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const login = useLocalData("login");

  const handleSubmit = useCallback(async () => {
    if (!loginData.email || !loginData.password) {
      alert("Please fill in all fields");
      return;
    }

    const user = login.find(
      (item) =>
        item.email === loginData.email && item.password === loginData.password
    );

    if (user) {
      alert("Login Success");
      navigate("/welcome");
      try {
        const res = await axios.post("https://country-info-1.onrender.com/login", loginData);
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("Login Failed");
      navigate("/");
    }

    setLoginData({
      email: "",
      password: "",
    });
  }, [login, navigate]);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  return (
   
      <Box w={"xs"} p={4} width={"30%"} margin={"20vh auto"} display={"flex"} flexDirection={"column"} rowGap={8} >
        <Input
          value={loginData.email}
          name="email"
          onChange={handleChange}
          placeholder="Email"
          size="md"
        />
        <Input
          value={loginData.password}
          name="password"
          onChange={handleChange}
          placeholder="Password"
          size="md"
          type="password" 
        />
        <Button
          onClick={handleSubmit}
          colorScheme="teal"
          variant="solid"
          size="md"
        >
          Login
        </Button>
      </Box>
  
  );
};

export default Login;
