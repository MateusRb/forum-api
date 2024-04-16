import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository'
import { Notification } from '@/domain/notification/enterprise/entities/notification'

interface SendNotificationUseCaseRequest {
  recipientId: string
  title: string
  content: string
}

type SendNotificationUseCaseResponse = Either<
  null,
  {
    notification: Notification
  }
>

export class SendNotificationUseCase {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute({
    recipientId,
    title,
    content,
  }: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
    const notification = Notification.create({
      recipientId: new UniqueEntityID(recipientId),
      title,
      content,
    })

    this.notificationRepository.create(notification)

    return right({ notification })
  }
}
