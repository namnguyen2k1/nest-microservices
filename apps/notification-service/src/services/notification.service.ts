import { Injectable } from "@nestjs/common";
import { PagingDTO } from "@shared/dto";
import { Notification, NOTIFICATION_STATUS } from "@shared/types";
import { parsePaging, toObjectId } from "@shared/utils";
import { SendEventDto } from "../dto/send-event.dto";
import { NotificationRepository } from "../notification.repository";
import { SseService } from "./sse.service";

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepo: NotificationRepository,
    private readonly sseService: SseService,
  ) {}

  get notificationModel() {
    return this.notificationRepo.model;
  }

  async create(data: Partial<Notification>) {
    return await this.notificationRepo.create(data);
  }

  async getAllNotificationsOfUser(userId: string, paging: PagingDTO) {
    const _paging = parsePaging(paging);
    const notifications = await this.notificationRepo.findAllPaging(
      {
        userId: toObjectId(userId),
      },
      {
        projection: {},
        ..._paging,
      },
    );
    return notifications;
  }

  async markIsRead(userId: string, payload: { notificationIds: string[]; readAll: boolean }) {
    if (payload.readAll === true) {
      await this.notificationModel.updateMany(
        {
          userId: userId,
        },
        {
          status: NOTIFICATION_STATUS.READ,
        },
      );
      return;
    }
    await Promise.allSettled(
      payload.notificationIds.map((id) =>
        this.notificationRepo.updateOne(
          { id },
          {
            status: NOTIFICATION_STATUS.READ,
          },
        ),
      ),
    );
  }

  async deleteNotificationById(notificationId: string) {
    await this.notificationRepo.deleteOne({ id: notificationId });
  }

  sendGlobalEvent({ data, type }: SendEventDto) {
    const result = this.sseService.publishGlobal({
      type,
      data,
      timestamp: Date.now(),
    });
    return result;
  }

  sendUserEvent(userId: string, { data, type }: SendEventDto) {
    const result = this.sseService.publishToUser(userId, {
      type,
      userId,
      data,
      timestamp: Date.now(),
    });
    return result;
  }
}
