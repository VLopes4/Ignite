import { AnswersRepository } from "../repositories/answers-repository"
import { Question } from "../../enterprise/entities/question"
import { Answer } from "../../enterprise/entities/answer"

interface FetchQuestionsAnswersUseCaseRequest {
  questionId: string
  page: number
}

interface FetchQuestionsAnswersUseCaseResponse {
  answers: Answer[]
}

export class FetchQuestionsAnswersUseCase {
  constructor(
    private _answersRepository: AnswersRepository
  ) {}

  async execute({
    questionId,
    page
  }: FetchQuestionsAnswersUseCaseRequest): Promise<FetchQuestionsAnswersUseCaseResponse> {
    const answers = await this._answersRepository.findManyByQuestionId(
      questionId,
      { page }
    )

    return {
      answers
    }
  }
}