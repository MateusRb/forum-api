import { UniqueEntityID } from '@/core/entities/unique-entity-id'
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
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionsRepository.items[0].attachments).toHaveLength(2)
    expect(inMemoryQuestionsRepository.items[0].attachments).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('2') }),
    ])
  })
})
