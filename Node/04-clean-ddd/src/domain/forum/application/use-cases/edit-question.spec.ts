import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestion } from 'test/factories/make-question'
import { EditQuestionUseCase } from './edit-question'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase // system under test

describe('Edit Question', () => {

  // Montar ambiente em memória antes de executar testes
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('question-1'))

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      authorId: 'author-1',
      title: 'Titulo editado',
      content: 'conteúdo editado',
      questionId: newQuestion.id.toValue(),
    })
  
    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'Titulo editado',
      content: 'conteúdo editado',
    })
  })

  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('question-1'))

    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      authorId: 'author-2',
      title: 'Titulo editado',
      content: 'conteúdo editado',
      questionId: newQuestion.id.toValue(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})