import React, { useState } from "react";

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
import AddNFTCard from "./AddNFTCard"; // Import the new component

import Nft4 from "assets/img/nfts/Nft4.png";
import Avatar1 from "assets/img/avatars/avatar1.png";
import Avatar2 from "assets/img/avatars/avatar2.png";
import Avatar3 from "assets/img/avatars/avatar3.png";
import Avatar4 from "assets/img/avatars/avatar4.png";

export default function Marketplace() {
  const [nftCards, setNFTCards] = useState([
    // Add your initial NFT cards here
    {
      name: "Swipe Circles",
      author: "By Peter Will",
      bidders: [Avatar1, Avatar2, Avatar3, Avatar4, Avatar1, Avatar1, Avatar1, Avatar1],
      image: Nft4,
      currentbid: "The motive of this task is to integrate arduino uno with code such that the code executed should be uploaded to arduino and arduino should work.",
      // download:"/projectdetails",
    },
    {
      name: "Swipe Circles",
      author: "By Peter Will",
      bidders: [Avatar1, Avatar2, Avatar3, Avatar4, Avatar1, Avatar1, Avatar1, Avatar1],
      image: Nft4,
      currentbid: "The motive of this task is to integrate arduino uno with code such that the code executed should be uploaded to arduino and arduino should work.",
      // download:"/projectdetails",
    },
    {
      name: "Swipe Circles",
      author: "By Peter Will",
      bidders: [Avatar1, Avatar2, Avatar3, Avatar4, Avatar1, Avatar1, Avatar1, Avatar1],
      image: Nft4,
      currentbid: "The motive of this task is to integrate arduino uno with code such that the code executed should be uploaded to arduino and arduino should work.",
      // download:"/projectdetails",
    },
    {
      name: "Swipe Circles",
      author: "By Peter Will",
      bidders: [Avatar1, Avatar2, Avatar3, Avatar4, Avatar1, Avatar1, Avatar1, Avatar1],
      image: Nft4,
      currentbid: "The motive of this task is to integrate arduino uno with code such that the code executed should be uploaded to arduino and arduino should work.",
      // download:"/projectdetails",
    },
    // ... (Other initial NFT cards)
  ]);
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  // const textColorBrand = useColorModeValue("brand.500", "white");
  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      
      {/* Main Fields */}
      <Grid
        mb='20px'
        gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}>
        <Flex
          flexDirection='column'
          gridArea={{ xl: "1 / 1 / 2 / 4", "2xl": "1 / 1 / 2 / 4" }}>
          {/* <Banner /> */}
          <Flex direction='column'>
            <Text
              mt='25px'
              mb='36px'
              color={textColor}
              fontSize='2xl'
              ms='24px'
              fontWeight='700'>
              All Projects
            </Text>
            <SimpleGrid columns={{ base: 1, md: 4 }} gap="20px" mb={{ base: "20px", xl: "0px" }}>
  {nftCards.map((nftCard, index) => (
    <NFT
      key={index}
      name={nftCard.name}
      author={nftCard.author}
      bidders={nftCard.bidders}
      image={nftCard.image}
      currentbid={nftCard.currentbid}
      download={nftCard.download}
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
