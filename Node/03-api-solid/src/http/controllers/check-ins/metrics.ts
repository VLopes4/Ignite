import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetUsertMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const fetchUserCheckInsHistoryUseCase = makeGetUsertMetricsUseCase()

  const { checkInsCount } = await fetchUserCheckInsHistoryUseCase.execute({ 
    userId: request.user.sub,
  })

  return reply.status(200).send({ checkInsCount })
}