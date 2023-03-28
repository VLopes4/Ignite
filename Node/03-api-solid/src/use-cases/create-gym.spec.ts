import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

// Test unit
describe('Register Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository) //sut padrão design patterns
  })

  it('should be able to register', async () => {
    const { gym } = await sut.execute({
      title: 'Javascript Gym',
      description: null,
      phone: null,
      latitude: -23.5324552,
      longitude: -46.5066368,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})