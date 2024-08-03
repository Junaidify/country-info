import { useEffect, useRef, useState } from "react";
import { Text, Image, Input, Button, Flex, Box } from "@chakra-ui/react";
import welcome_img from "../images/welcome.jpg";
import { useFetch } from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

export const Welcome = () => {
  const { isLoading, isError, data } = useFetch('USD');
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [searchbar, setSearchBar] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const storedSearch = localStorage.getItem("favCountry");
    if (storedSearch) {
      setSearchBar(JSON.parse(storedSearch));
    }
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favCountry", JSON.stringify(searchbar));
  }, [searchbar]);

  const handleSearch = () => {
    if (!search) return;

    const filteredData = data.filter((item) =>
      item.name.common.toLowerCase().includes(search.toLowerCase())
    );

    setSearchBar((prev) => [...prev, search]);

    if (filteredData.length > 0) {
      filteredData.forEach((item) => navigate(`/country/${item.name.common}`));
    } else {
      alert("Country not found");
    }

    setSearch("");
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Something went wrong</h1>;
  }

  return (
    <>
      <Box width={"80%"} margin={"0 auto"} p={4}>
        <Flex w={"md"} margin={"0 auto"} p={4}>
          <Input
            ref={inputRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Country"
            size="lg"
          />
          <Button onClick={handleSearch} colorScheme="teal" variant="solid">
            Search
          </Button>
        </Flex>
        <Text textAlign={"center"} width={"80%"} m={"0 auto"}>
          <Image w={"full"} h={"full"} src={welcome_img} />
        </Text>

        <Box textAlign={"center"}>
          {searchbar.length > 0 && (
            <Box mt={4}>
              <Text fontSize="xl" fontWeight="bold">
                Recent Searches:
              </Text>
              {searchbar.map((item, index) => (
                <Text key={index}>{item}</Text>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};
