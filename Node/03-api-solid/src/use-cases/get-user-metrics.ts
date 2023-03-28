import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface GetUsertMetricsUseCaseRequest {
  userId: string
}

interface GetUsertMetricsUseCaseResponse {
  checkInsCount: number
}

export class GetUsertMetricsUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
  ) {}

  async execute({ userId }: GetUsertMetricsUseCaseRequest): Promise<GetUsertMetricsUseCaseResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return {
      checkInsCount,
    }
  }
}