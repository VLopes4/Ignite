import { Box, Flex, Avatar, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return(
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>
            Vinicius Lopes
          </Text>
          <Text color="gray.300">
            vinnicius4@hotmail.com
          </Text>
        </Box>
      )}
      <Avatar size="md" name="Vinicius Lopes" src="https://github.com/vlopes4.png"/>
    </Flex>
  );
}