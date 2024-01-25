// types.ts 파일에 ChatItem 타입 정의
export interface ChatItem {

  img: string;
  name: string;
  info: string;
  content: string;
  period: string;
  newChat: number;
}

export interface MsgItem {
  id: number;
  img: string;
  name: string;
  content: string;
  time: string;
}
