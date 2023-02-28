import { Button } from "@chakra-ui/react"

interface PaginationItemProps {
  number: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
}

export function PaginationItem({ number, isCurrent = false, onPageChange }: PaginationItemProps) {
  if(isCurrent) {
    return(
      <Button  
        w="4" 
        disabled
        size="sm" 
        fontSize="xs" 
        colorScheme="pink"
        _disabled={{ bg: 'pink.500', cursor: 'default' }}
      >
        {number}
      </Button>
    )
  }

  return(
    <Button  
      w="4" 
      size="sm" 
      fontSize="xs" 
      bgColor="gray.700"
      _hover={{ bg: 'gray.500' }}
      onClick={() => onPageChange(number)}
    >
      {number}
    </Button>
  )
}