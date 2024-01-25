import { authAxios } from './axiosInstance';

export const postReportChatApi = (chatRoomId: string, reason: string) => {
  return authAxios.post('/report/chat-room', { chatRoomId, reason });
};
