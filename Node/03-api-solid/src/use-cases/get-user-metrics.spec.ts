import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetUsertMetricsUseCase } from './get-user-metrics'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUsertMetricsUseCase

// Test unit
describe('Fetch User Check-in History Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUsertMetricsUseCase(checkInsRepository) //sut padrão design patterns
  })

  it('should be able to get check-ins count from metrics', async () => {
    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await checkInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(2)
  })
})