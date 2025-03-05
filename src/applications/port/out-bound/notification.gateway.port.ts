import { Socket } from 'socket.io';

export abstract class NotificationGatewayPort {
  handleConnection: (client: Socket) => void;
  sendNotificationToClients: (data: any) => void;
}
