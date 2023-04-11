import { PrismaGymRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { FetchNearbyGymUseCase } from "../fetch-nearby-gyms"
import { SearchGymUseCase } from "../search-gyms"

export function makeFetchNearbyGymUseCase() {
  const gymRepository = new PrismaGymRepository()
  const useCase = new FetchNearbyGymUseCase(gymRepository)

  return useCase
}