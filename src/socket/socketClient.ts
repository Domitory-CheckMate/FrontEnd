import { Client } from '@stomp/stompjs';

export const connectClient = (
  token: string,
  changeClient: (client: Client) => void,
) => {
  try {
    const client = new Client({
      brokerURL: process.env.REACT_APP_SOCKET_URL,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = (frame) => {
      client.subscribe('/queue/user/1', callback);
      console.log('Connected: ' + frame);
    };

    client.onDisconnect = (frame) => {
      console.log('Disconnected: ' + frame);
    };

    client.activate();
    changeClient(client);
  } catch (error) {
    console.log(error);
  }
};

export const disConnectClient = (client: Client) => {
  try {
    client.deactivate();
  } catch (error) {
    console.log(error);
  }
};

export const callback = (message: { body: string }) => {
  try {
    if (message.body) {
      const data = JSON.parse(message.body);
      console.log(data);
    } else {
      console.error('Message body is empty or undefined.');
    }
  } catch (error) {
    console.error('Error parsing message body:', error);
  }
};

export const getRoomListPublish = (client: Client, token: string) => {
  try {
    client.publish({
      headers: {
        Authorization: `Bearer ${token}`,
      },
      destination: '/app/room-list',
      body: JSON.stringify({}),
    });
  } catch (error) {
    console.log(error);
  }
};

export const enterRoomPublish = (
  client: Client,
  token: string,
  senderId: number,
  receiverId: number,
  callback: (message: { body: string }) => void,
) => {
  try {
    client.subscribe(
      `/queue/chat/` +
        (senderId > receiverId
          ? `${receiverId}+${senderId}`
          : `${senderId}+${receiverId}`),
      callback,
    );
    client.publish({
      headers: {
        Authorization: `Bearer ${token}`,
      },
      destination: '/app/room-enter',
      body: JSON.stringify({
        otherUserId: receiverId,
      }),
    });
  } catch (error) {
    console.log(error);
  }
};

export const unSubscribeChatRoom = (
  client: Client,
  senderId: number,
  receiverId: number,
) => {
  try {
    client.unsubscribe(
      `/queue/chat/` +
        (senderId > receiverId
          ? `${receiverId}+${senderId}`
          : `${senderId}+${receiverId}`),
    );
  } catch (error) {
    console.log(error);
  }
};

export const getPrevChatPublish = (
  client: Client,
  token: string,
  receiverId: number,
  page: number,
) => {
  try {
    client.publish({
      headers: {
        Authorization: `Bearer ${token}`,
      },
      destination: '/app/chat-list',
      body: JSON.stringify({
        otherUserId: receiverId,
        pageNumber: page,
      }),
    });
  } catch (error) {
    console.log(error);
  }
};

export const sendMessagePublish = (
  client: Client,
  token: string,
  message: string,
) => {
  try {
    client.publish({
      headers: {
        Authorization: `Bearer ${token}`,
      },
      destination: '/app/chat',
      body: JSON.stringify({
        content: message,
      }),
    });
  } catch (error) {
    console.log(error);
  }
};

export const getNotReadCntPublish = (client: Client, token: string) => {
  try {
    client.publish({
      headers: {
        Authorization: `Bearer ${token}`,
      },
      destination: '/app/not-read',
    });
  } catch (error) {
    console.log(error);
  }
};
