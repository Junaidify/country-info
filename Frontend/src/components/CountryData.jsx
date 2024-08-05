import { useEffect, useState, useCallback } from "react";
import { useFetch } from "../hooks/useFetch";
import { Box, Text, Image, Grid, Button, Input } from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

export const CountryData = () => {
  const [currencyCode, setCurrencyCode] = useState("USD");
  const { isLoading, isError, data } = useFetch(currencyCode);
  const [fetchedData, setFetchedData] = useState([]);
  const navigate = useNavigate();
  const { name } = useParams();

  useEffect(() => {
    if (data) {
      setFetchedData(data);
    }
  }, [data]);

  // Sorting functions
  const handleSortAscending = useCallback(() => {
    const sortedData = [...fetchedData].sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    );
    setFetchedData(sortedData);
  }, [fetchedData]);

  const handleSortDescending = useCallback(() => {
    const sortedData = [...fetchedData].sort((a, b) =>
      b.name.common.localeCompare(a.name.common)
    );
    setFetchedData(sortedData);
  }, [fetchedData]);

  const handleCurrencyChange = (e) => {
    setCurrencyCode(e.target.value.toUpperCase());
  };

  const handleFavCountry = (item) => {
    axios
      .post("https://country-info-1.onrender.com/favCountry", {
        country: item.name.common,
        flag: item.flags.png,
        capital: item.capital,
        languages: item.languages,
        currency: item.currencies?.USD,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error fetching data</h1>;

  if (name) {
    const country = fetchedData.find((item) => item.name.common === name);
    if (!country) return <h1>Country not found</h1>;

    return (
      <Box width="50%" m="0 auto">
        <Link to="/country">Back</Link>
        <Text fontSize="2xl">{country.name.common}</Text>
        <Image w="full" h="full" src={country.flags.png} />
        <Text fontSize="lg">
          <strong>Capital:</strong> {country.capital}
        </Text>
        <Text fontSize="lg">
          <strong>Languages:</strong>{" "}
          {Object.values(country.languages).join(", ")}
        </Text>
        <Text fontSize="lg">
          <strong>Currency:</strong>{" "}
          {country.currencies?.USD
            ? Object.values(country.currencies.USD).join(", ")
            : "N/A"}
        </Text>
      </Box>
    );
  }

  return (
    <>
      <Box textAlign="center" mt="5vh">
        <Button
          fontSize="xl"
          fontWeight="bold"
          mr="5vh"
          onClick={handleSortAscending}
        >
          Sort Country (Ascending)
        </Button>
        <Button
          fontSize="xl"
          fontWeight="bold"
          ml="5vh"
          onClick={handleSortDescending}
        >
          Sort Country (Descending)
        </Button>
      </Box>
      <Input
        placeholder="Enter currency code"
        onChange={handleCurrencyChange}
        value={currencyCode}
        border={"2px"}
        width={"20%"}
    position={"absolute"}
    top={"20vh"}
    right={"5vh"}

      />
      <Grid
        templateColumns="repeat(4, 1fr)"
        gap={6}
        width="80%"
        m="20vh auto 5vh auto"
      >
        {fetchedData.map((item) => (
          <Box
            key={item.name.common}
            onClick={() => navigate(`/country/${item.name.common}`)}
            position="relative"
          >
            <Text w="full" height="60%">
              <Image w="full" h="full" src={item.flags.png} />
            </Text>
            <Box>
              <Text fontSize="lg">
                <strong style={{ fontSize: "1rem", marginRight: "0.7rem" }}>
                  Country:
                </strong>
                {item.name.common}
              </Text>
              <Text fontSize="md">
                <strong style={{ fontSize: "1rem", marginRight: "0.7rem" }}>
                  Currency:
                </strong>
                {item.currencies?.USD
                  ? Object.values(item.currencies.USD).join(", ")
                  : "N/A"}
              </Text>
              <Text fontSize="lg">
                <strong style={{ fontSize: "1rem", marginRight: "0.7rem" }}>
                  Capital:
                </strong>
                {item.capital}
              </Text>
              <Text fontSize="lg">
                <strong style={{ fontSize: "1rem", marginRight: "0.7rem" }}>
                  Languages:
                </strong>
                {item.languages
                  ? Object.values(item.languages).join(", ")
                  : "N/A"}
              </Text>
            </Box>
            <Text
              onClick={() => handleFavCountry(item)}
              fontSize="2xl"
              color="white"
              position="absolute"
              top={0}
              right={2}
              className="fav_country"
            >
              <FontAwesomeIcon icon={faHeart} />
            </Text>
          </Box>
        ))}
      </Grid>
    </>
  );
};
