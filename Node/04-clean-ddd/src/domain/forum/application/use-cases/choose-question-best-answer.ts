import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Answer } from "../../enterprise/entities/answer"
import { AnswersRepository } from "../repositories/answers-repository"
import { Question } from "../../enterprise/entities/question"
import { QuestionsRepository } from "../repositories/questions-repository"
import { Either, left, right } from "@/core/either"
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error"
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error"

interface ChooseQuestionBestAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

type ChooseQuestionBestAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError, {
  question: Question
}>

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private _questionsRepository: QuestionsRepository,
    private _answersRepository: AnswersRepository
  ) {}

  async execute({ 
    answerId, 
    authorId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this._answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError('Answer not found'))
    }

    const question = await this._questionsRepository.findById(answer.questionId.toString())

    if (!question) {
      return left(new ResourceNotFoundError('Question not found'))
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    question.bestAnswerId = answer.id

    await this._questionsRepository.save(question)

    return right({
      question
    })
  }
}