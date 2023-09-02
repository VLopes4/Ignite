import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { z } from 'zod'
import { PrismaService } from "@/prisma/prisma.service";
import { ZodValidationPipe } from "@/pipes/zod-validation.pipe";
import { JwtAuthGuard } from "@/auth/jwt-auth.guard";
import { CurrentUser } from "@/auth/current-user.decorator";
import { UserPayload } from "@/auth/jwt.strategy";

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string()
})

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(
    private prisma: PrismaService
  ) {}
  
  @Post()
  async handle(
    @Body(new ZodValidationPipe(createQuestionBodySchema)) body: CreateQuestionBodySchema, 
    @CurrentUser() user: UserPayload
  ) {
    const { title, content } = body
    const userId = user.sub

    await this.prisma.question.create({
      data: {
        authorId: userId,
        title,
        content,
        slug: 'sda',
      }
    })
  }
}