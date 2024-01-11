export interface CustomError extends Error {
  response?: {
    status: number;
    data: {
      message: string;
    };
  };
}

export type mbtiType = {
  first: string;
  second: string;
  third: string;
  fourth: string;
};

export type articleStateType = '모집 중' | '모집 완료';

export type userType = {
  id: number;
  name: string;
  img: string;
  major: string;
  gender: '남자' | '여자';
  mbti: string;
};

export type articleType = {
  id: number;
  state: articleStateType;
  title: string;
  keywords: string[];
  content: string;
  dday: number;
  percent: number;
  bookmark: number;
};

export type articleDetailType = {
  id: number;
  state: articleStateType;
  title: string;
  deadline: string;
  percent: number;
  introduce: string;
  keywords: string[];
  checklist: checklistType;
  isBookmarked: boolean;
  isMine: boolean;
  user: userType;
};

export type checklistType = {
  smoke: '흡연자 선호' | '비흡연자 선호';
  pattern: '아침형 인간' | '저녁형 인간';
  clean:
    | '매일매일'
    | '1주에 3~4번'
    | '1주에 한번'
    | '2주에 한번'
    | '한달에 한번';
  sleep: sleepType[];
  drink: '안마심' | '1주에 2~3번' | '1주에 4~5번' | '매일';
  home: '매주' | '1~2주에 1번' | '달에 1번' | '가끔';
  noise: noiseType[];
};

export type sleepType = '코골이' | '이갈이' | '잠꼬대' | '뒤척임';

export type noiseType =
  | '이어폰 필수'
  | '전화는 밖에서'
  | '전화는 짧게'
  | '상관없음';

export type keywordCardType = {
  tag: string;
  title: string;
  text: string;
  keyword: 'clean' | 'smoke' | 'morning' | 'night';
};

export type bottomNavType = 'home' | 'chat' | 'user';
