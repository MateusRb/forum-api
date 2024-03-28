import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'
import { InMemoryQuestionsRepository } from 'test/repository/in-memory-questions-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  test('create an question', async () => {
    const result = await sut.execute({
      authorId: '1',
      title: 'New Question',
      content: 'New Question Content',
    })

    expect(result.isRight()).toBe(true)
  })
})
