import { authAxios } from './axiosInstance';

export const postReportChatApi = (chatRoomId: string, reason: string) => {
  return authAxios.post('/report/chat-room', { chatRoomId, reason });
};

export const postReportPostApi = (postId: string, reason: string) => {
  return authAxios.post('/report/post', { postId, reason });
};
