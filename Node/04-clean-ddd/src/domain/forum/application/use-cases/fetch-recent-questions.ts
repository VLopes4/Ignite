import { QuestionsRepository } from "../repositories/questions-repository"
import { Question } from "../../enterprise/entities/question"
import { Either, right } from "@/core/either"

interface FetchRecentQuestionsUseCaseRequest {
  page: number
}

type FetchRecentQuestionsUseCaseResponse = Either<null, {
  questions: Question[]
}>

export class FetchRecentQuestionsUseCase {
  constructor(
    private _questionsRepository: QuestionsRepository
  ) {}

  async execute({ 
    page
  }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
    const questions = await this._questionsRepository.findManyRecent({ page })

    return right({
      questions
    })
  }
}