import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repository/in-memory-questions-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FetchRecentQuestionsUseCase

describe('Fetch Recent Questions', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository)
  })

  test('should be able to fetch recent questions', async () => {
    inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2024, 0, 20) }),
    )
    inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2024, 0, 18) }),
    )
    inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2024, 0, 23) }),
    )

    const { questions } = await sut.execute({
      page: 1,
    })

    expect(questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2024, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2024, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2024, 0, 18) }),
    ])
  })

  test('should be able to fetch paginated recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
      inMemoryQuestionsRepository.create(makeQuestion())
    }

    const { questions } = await sut.execute({
      page: 2,
    })

    expect(questions).toHaveLength(2)
  })
})
