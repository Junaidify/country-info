import React from "react";
import { useLocalData } from "../hooks/useLocalData";
import { Box, Grid, Text, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const FavCountry = () => {
  const favCountry = useLocalData("favCountry");
  const navigate = useNavigate();

  if (favCountry.isLoading) {
    return <h1>Loading...</h1>;
  }

  if (favCountry.isError) {
    return <h1>Error</h1>;
  }

  if (!Array.isArray(favCountry.data) || favCountry.data.length === 0) {
    return <h1>No favorite countries found</h1>;
  }

  console.log(favCountry.data);

  return (
    <>
    <Text fontSize={"2xl"} textAlign={"center"} fontWeight={"bold"} mt={"5vh"}>Favorite Countries</Text>
      <Grid
        templateColumns={"repeat(4, 1fr)"}
        gap={6}
        width={"80%"}
        m={"5vh auto"}
      >
        {favCountry.data.map((item) => (
          <Box
            key={item.country}
            onClick={() => navigate(`/country/${item.country}`)}
            position={"relative"}
          >
            <Text w={"full"} height={"60%"}>
              <Image w={"full"} h={"full"} src={item.flag} />
            </Text>
            <Box>
              <Text fontSize={"lg"}>
                <strong style={{ fontSize: "1rem", marginRight: "0.7rem" }}>
                  Country:
                </strong>
                {item.country}
              </Text>
              <Text fontSize={"md"}>
                <strong style={{ fontSize: "1rem", marginRight: "0.7rem" }}>
                  Currency:
                </strong>
                {item.currencies?.USD
                  ? Object.values(item.currencies.USD).join(", ")
                  : "N/A"}
              </Text>
              <Text fontSize={"lg"}>
                <strong style={{ fontSize: "1rem", marginRight: "0.7rem" }}>
                  Capital:
                </strong>
                {item.capital.join(", ")}
              </Text>
              <Text fontSize={"lg"}>
                <strong style={{ fontSize: "1rem", marginRight: "0.7rem" }}>
                  Languages:
                </strong>
                {item.languages
                  ? Object.values(item.languages).join(", ")
                  : "N/A"}
              </Text>
            </Box>
          </Box>
        ))}
      </Grid>
    </>
  );
};
