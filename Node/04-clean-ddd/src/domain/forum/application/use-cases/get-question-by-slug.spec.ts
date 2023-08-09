import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { makeQuestion } from 'test/factories/make-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase // system under test

describe('Get Question By Slug', () => {

  // Montar ambiente em memória antes de executar testes
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('titulo-de-exemplo')
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      slug: 'titulo-de-exemplo',
    })

    expect(result.isRight()).toBe(true)
  
    if (result.isRight()) {
      expect(result.value.question.id).toBeTruthy()
      expect(result.value.question.title).toEqual(newQuestion.title)
    }
  })
})