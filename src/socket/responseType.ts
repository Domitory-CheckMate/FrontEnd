export type socketUserInfoType = {
  userId: number;
  name: string;
  profile: string;
  major: string;
  gender: 'MAN' | 'WOMAN';
  endDate: string;
};

export type socketReceiverType = {
  userId: number;
  name: string;
  profile: string;
  postId: number;
  title: string;
  endDate: string;
};

export type socketRoomType = {
  lastChatInfo: {
    content: string;
    sendTime: string;
  };
  notReadCount: number;
  userInfo: socketUserInfoType;
};

// export type socketRoomListType = {
//   messageType: string;
//   data: {
//     chatRoomList: socketRoomType[];
//   };
// };
