import React, { useState, useEffect } from "react";
import axios from "axios";
// Chakra imports
import {
  Box,
  Flex,
  Grid,
  Text,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";
import NFT from "components/card/NFT";
import NFT1 from "assets/img/nfts/Nft1.png";
import AddNFTCard from "./AddNFTCard"; // Import the new componen
export default function Marketplace() {
  const [nftCards, setNFTCards] = useState([]);

  useEffect(() => {
    // Fetch project data from the backend API
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/project/allProjects"
        );
        const projects = response.data.data.projects;

        // Map projects data to NFT card format
        const mappedNFTCards = projects.map((project) => ({
          _id: project._id,
          name: project.title,
          description: project.description,
          author: project.leader ? project.leader.name : "Unknown", // Check if leader exists before accessing its name
          bidders: project.employees.map((employee) => employee.name), // Assuming employees have a 'name' field
          //image: NFT1,
        }));

        setNFTCards(mappedNFTCards);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []); // Empty dependency array to run the effect only once

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  // const textColorBrand = useColorModeValue("brand.500", "white");
  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid
        mb="20px"
        gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}
      >
        <Flex
          flexDirection="column"
          gridArea={{ xl: "1 / 1 / 2 / 4", "2xl": "1 / 1 / 2 / 4" }}
        >
          {/* <Banner /> */}
          <Flex direction="column">
            <Text
              mt="25px"
              mb="36px"
              color={textColor}
              fontSize="2xl"
              ms="24px"
              fontWeight="700"
            >
              All Projects
            </Text>
            <SimpleGrid
              columns={{ base: 1, md: 4 }}
              gap="20px"
              mb={{ base: "20px", xl: "0px" }}
            >
              {nftCards.map((nftCard, index) => (
                <NFT
                  _id={nftCard._id}
                  key={index}
                  image={NFT1}
                  name={nftCard.name}
                  author={nftCard.author}
                  bidders={nftCard.bidders}
                  download={nftCard.download}
                  description={nftCard.description}
                />
              ))}
              <AddNFTCard setNFTCards={setNFTCards} />
            </SimpleGrid>
          </Flex>
        </Flex>
      </Grid>
      {/* Delete Product */}
    </Box>
  );
}
