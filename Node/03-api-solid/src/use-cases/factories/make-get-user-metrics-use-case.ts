import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { GetUsertMetricsUseCase } from "../get-user-metrics"

export function makeGetUsertMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new GetUsertMetricsUseCase(checkInsRepository)

  return useCase
}