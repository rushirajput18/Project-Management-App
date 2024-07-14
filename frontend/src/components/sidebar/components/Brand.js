import React from "react";

// Chakra imports
import { Flex, useColorModeValue, Image } from "@chakra-ui/react";

// Custom components
import logo from 'components/icons/image.png';
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  // Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      <Image src={logo} h='66px' w='400px' my='32px' alt='Logo' color={logoColor} />
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
