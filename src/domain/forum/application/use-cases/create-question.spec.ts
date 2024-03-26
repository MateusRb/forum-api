import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'

const fakeQuestionRepository: QuestionsRepository = {
  create: async () => {},
}

test('create an question', async () => {
  const answerQuestion = new CreateQuestionUseCase(fakeQuestionRepository)

  const { question } = await answerQuestion.execute({
    authorId: '1',
    title: 'New Question',
    content: 'New Question Content',
  })

  expect(question.id).toBeTruthy()
})
