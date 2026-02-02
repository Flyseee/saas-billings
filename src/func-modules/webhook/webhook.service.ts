import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse } from 'axios';
import { WebhookEventType } from '../../data-modules/enums/webhook-event-type.enum';

@Injectable()
export class WebhookService implements OnModuleInit {
  private readonly oauthToken: string;
  private readonly webhookUrl = 'http://localhost:3000/v1/webhook/notification';

  constructor(private readonly configService: ConfigService) {
    this.oauthToken = this.configService.get<string>('OAUTH_TOKEN')!;
  }

  async onModuleInit() {
    await this.createWebhook(WebhookEventType.PAYMENT_WAITING_FOR_CAPTURE);
    await this.createWebhook(WebhookEventType.PAYMENT_SUCCEEDED);
    await this.createWebhook(WebhookEventType.PAYMENT_CANCELED);
  }

  private async createWebhook(event: WebhookEventType) {
    try {
      const uuid = await import('uuid');
      const response: AxiosResponse = await axios.post(
        'https://api.yookassa.ru/v3/webhooks',
        {
          event: event,
          url: this.webhookUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${this.oauthToken}`,
            'Idempotence-Key': uuid.v4(),
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(`Webhook created for event: ${event}`, response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          `Error creating webhook for event ${event}:`,
          error.response?.data,
        );
      } else {
        console.error(`Unexpected error:`, error);
      }
    }
  }
}
