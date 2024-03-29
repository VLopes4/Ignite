import { useState } from "react";
import { Flex, Input, Icon } from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";

export function SearchBox() {
  const [search, setSearch] = useState('')

  return(
    <Flex as="label" flex="1" py="4" px="8" ml="6" maxW={400} alignSelf="center" color="gray.200" position="relative" bg="gray.800" borderRadius="full">
      <Input 
        px="4"
        mr="4"
        value={search}
        color="gray.50"
        variant="unstyled"
        placeholder="Buscar na plataforma"
        _placeholder={{ color: 'gray.400' }}
        onChange={event => setSearch(event.target.value)}
      />
      <Icon as={RiSearchLine} fontSize="20"/>
    </Flex>
  );
}