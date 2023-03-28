import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymUseCase } from './search-gyms'

let searchRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

// Test unit
describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    searchRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(searchRepository) //sut padrão design patterns
  })

  it('should be able to fetch search for gyms', async () => {
    await searchRepository.create({
      title: 'Javascript Gym',
      description: null,
      phone: null,
      latitude: -23.5324552,
      longitude: -46.5066368,
    })

    await searchRepository.create({
      title: 'Typescript Gym',
      description: null,
      phone: null,
      latitude: -23.5324552,
      longitude: -46.5066368,
    })

    const { gyms } = await sut.execute({
      query: 'Javascript',
      page: 1
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Javascript Gym' }),
    ])
  })

  it('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await searchRepository.create({
        title: `Javascript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -23.5324552,
        longitude: -46.5066368,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Javascript',
      page: 2
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Javascript Gym 21' }),
      expect.objectContaining({ title: 'Javascript Gym 22' }),
    ])
  })
})