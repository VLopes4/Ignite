import { PrismaGymRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { SearchGymUseCase } from "../search-gyms"

export function makeSearchGymUseCase() {
  const gymRepository = new PrismaGymRepository()
  const useCase = new SearchGymUseCase(gymRepository)

  return useCase
}