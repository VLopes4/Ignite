import { AnswersRepository } from "../repositories/answers-repository"
import { Question } from "../../enterprise/entities/question"
import { Answer } from "../../enterprise/entities/answer"
import { Either, right } from "@/core/either"

interface FetchQuestionsAnswersUseCaseRequest {
  questionId: string
  page: number
}

type FetchQuestionsAnswersUseCaseResponse = Either<null, {
  answers: Answer[]
}>

export class FetchQuestionsAnswersUseCase {
  constructor(
    private _answersRepository: AnswersRepository
  ) {}

  async execute({
    questionId,
    page
  }: FetchQuestionsAnswersUseCaseRequest): Promise<FetchQuestionsAnswersUseCaseResponse> {
    const answers = await this._answersRepository.findManyByQuestionId(questionId, { 
      page
    })

    return right({
      answers
    })
  }
}