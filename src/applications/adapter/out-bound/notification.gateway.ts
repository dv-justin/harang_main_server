import { forwardRef, Inject } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NotificationServicePort } from 'src/applications/port/in-bound/notification.service.port';
import { NotificationGatewayPort } from 'src/applications/port/out-bound/notification.gateway.port';

@WebSocketGateway(4001, {
  namespace: 'notifications',
  cors: {
    origin: '*',
  },
})
export class NotificationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(
    @Inject(forwardRef(() => NotificationServicePort))
    private readonly notificationServicePort: NotificationServicePort,
  ) {}

  afterInit(server: Server) {
    console.log('웹소켓 서버 초기화 ✅', server);
  }

  async handleConnection(client: Socket) {
    console.log('Client connected:', client.id);

    const notifications =
      await this.notificationServicePort.getNotifications(1);
    client.emit('notifications', notifications);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client Disconnected : ${client.id}`);
  }

  sendNotificationToClients(data: any) {
    this.server.emit('newAlarm', data);
  }
}
