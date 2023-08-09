import { QuestionsRepository } from "../repositories/questions-repository"
import { Question } from "../../enterprise/entities/question"
import { Either, left, right } from "@/core/either"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

interface GetQuestionBySlugUseCaseRequest {
  slug: string
}

type GetQuestionBySlugUseCaseResponse = Either<ResourceNotFoundError, {
  question: Question
}>

export class GetQuestionBySlugUseCase {
  constructor(
    private _questionsRepository: QuestionsRepository
  ) {}

  async execute({ 
    slug
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this._questionsRepository.findBySlug(slug)

    if (!question) {
      return left(new ResourceNotFoundError('Question not found'))
    }

    return right({
      question
    })
  }
}