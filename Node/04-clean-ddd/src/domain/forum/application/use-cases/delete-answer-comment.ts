import { Either, left, right } from "@/core/either"
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"
import { NotAllowedError } from "./errors/not-allowed-error"

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

type DeleteAnswerCommentUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>

export class DeleteAnswerCommentUseCase {
  constructor(
    private _answerCommentsRepository: AnswerCommentsRepository
  ) {}

  async execute({ 
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment = await this._answerCommentsRepository.findById(answerCommentId)

    if (!answerComment) {
      return left(new ResourceNotFoundError())
    }

    if (answerComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this._answerCommentsRepository.delete(answerComment)

    return right({})
  }
}