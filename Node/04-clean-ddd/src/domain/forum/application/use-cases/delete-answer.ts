import { Either, left, right } from "@/core/either"
import { AnswersRepository } from "../repositories/answers-repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"
import { NotAllowedError } from "./errors/not-allowed-error"

interface DeleteAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

type DeleteAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

export class DeleteAnswerUseCase {
  constructor(
    private _answersRepository: AnswersRepository
  ) {}

  async execute({
    authorId, 
    answerId
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this._answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError('Answer not found.'))
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this._answersRepository.delete(answer)

    return right({})
  }
}