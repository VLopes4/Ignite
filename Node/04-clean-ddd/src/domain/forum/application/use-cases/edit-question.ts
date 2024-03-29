import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { QuestionsRepository } from "../repositories/questions-repository"
import { Question } from "../../enterprise/entities/question"
import { Either, left, right } from "@/core/either"
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error"
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error"
import { QuestionAttachmentsRepository } from "../repositories/question-attachments-repository"
import { QuestionAttachmentList } from "../../enterprise/entities/question-attachment-list"
import { QuestionAttachment } from "../../enterprise/entities/question-attachment"

interface EditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
  attachmentsIds: string[]
}

type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

export class EditQuestionUseCase {
  constructor(
    private _questionsRepository: QuestionsRepository,
    private _questionAttachmentRepository: QuestionAttachmentsRepository
  ) {}

  async execute({
    authorId, 
    questionId,
    title,
    content,
    attachmentsIds
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this._questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError('Question not found.'))
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    const currentQuestionAttachments = await this._questionAttachmentRepository.findManyByQuestionId(questionId)
    const questionAttachmentList = new QuestionAttachmentList(currentQuestionAttachments)

    const questionAttachments = attachmentsIds.map((attachmentsId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityID(attachmentsId),
        questionId: question.id
      })
    })

    questionAttachmentList.update(questionAttachments)

    question.attachments = questionAttachmentList
    question.title = title
    question.content = content

    await this._questionsRepository.save(question)

    return right({
      question
    })
  }
}