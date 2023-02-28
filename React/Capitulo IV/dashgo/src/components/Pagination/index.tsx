import { Box, Stack, Text } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
  currentPage?: number;
  registerPerPage?: number;
  totalCountOfRegisters: number;
  onPageChange: (page: number) => void;
}

const siblingsCount = 1;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)].map((_, index) => {
    return from + index + 1;
  }).filter(page => page > 0)
}

export function Pagination({ 
  onPageChange,
  currentPage = 1,
  registerPerPage = 10, 
  totalCountOfRegisters 
}: PaginationProps) {
  const lastPage = Math.floor(totalCountOfRegisters / registerPerPage);

  const previousPage = currentPage > 1 ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1) : []
  const nextPages = currentPage < lastPage ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage)) : []

  return(
    <Stack direction="row" mt="8" justify="space-between" align="center" spacing="6">
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <Stack direction={["column", "row"]} spacing="2">
        
        {currentPage > (1 + siblingsCount) && (
          <>
            <PaginationItem onPageChange={onPageChange} number={1}/>
            {currentPage > (2 + siblingsCount) && (
              <Text color="gray.300" w="8" textAlign="center">...</Text>
            )}
          </>
        )}

        {previousPage.length > 0 && previousPage.map(page => {
          return <PaginationItem onPageChange={onPageChange} key={page} number={page}/>
        })}

        <PaginationItem onPageChange={onPageChange} number={currentPage} isCurrent/>

        {nextPages.length > 0 && nextPages.map(page => {
          return <PaginationItem onPageChange={onPageChange} key={page} number={page}/>
        })}

        {(currentPage + siblingsCount) < lastPage && (
          <>
            {(currentPage + 1 + siblingsCount) < lastPage && (
              <Text color="gray.300" w="8" textAlign="center">...</Text>
            )}
            <PaginationItem onPageChange={onPageChange} number={lastPage}/>
          </>
        )}

      </Stack>
    </Stack>
  )
}