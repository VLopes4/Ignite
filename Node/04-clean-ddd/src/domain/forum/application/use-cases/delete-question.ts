import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { QuestionsRepository } from "../repositories/questions-repository"
import { Question } from "../../enterprise/entities/question"
import { Either, left, right } from "@/core/either"
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error"
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error"

interface DeleteQuestionUseCaseRequest {
  authorId: string
  questionId: string
}

type DeleteQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

export class DeleteQuestionUseCase {
  constructor(
    private _questionsRepository: QuestionsRepository
  ) {}

  async execute({
    authorId, 
    questionId
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this._questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError('Question not found.'))
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this._questionsRepository.delete(question)

    return right({})
  }
}