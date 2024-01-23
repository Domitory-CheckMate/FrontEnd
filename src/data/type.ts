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

export type articleStateType = '모집중' | '모집완료';

export type userType = {
  id: number;
  name: string;
  img: string;
  major: string;
  gender: '남자' | '여자';
  mbti: string;
};

export type articleListType = {
  postId: number;
  title: string;
  content: string;
  importantKey: keywordType;
  similarityKey: string;
  scrapCount: number;
  remainDate: number;
  accuracy: number;
  gender: '남자' | '여자';
  postState: articleStateType;
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

// export type checklistApiType = {
//   cleanType: 'RARELY'| 'SOMETIMES' | 'OFTEN' | 'USUALLY' | 'ALWAYS';
//     drinkType:"NEVER"| "SOMETIMES" | "OFTEN" | "ALWAYS";
//     homeType:"RARELY" | "SOMETIMES" | "OFTEN" | "ALWAYS";
//     lifePatternType:"MORNING" | "EVENING";
//     noiseType: "EARPHONE" | "OUTSIDE" | "SHORT" | "ANYWAY";
// 		smokeType:"NONE" | "SMOKE";
// 		sleepGridingType: "TRUE" | "FALSE";
// 		sleepSnoreType: "TRUE" | "FALSE";
// 		sleepTalkingType: "TRUE" | "FALSE";
// 		sleepTurningType: "TRUE" | "FALSE";
// };

export type checklistApiType = {
    cleanType: 'RARELY'| 'SOMETIMES' | 'OFTEN' | 'USUALLY' | 'ALWAYS';
      drinkType:"NEVER"| "SOMETIMES" | "OFTEN" | "ALWAYS";
      homeType:"RARELY" | "SOMETIMES" | "OFTEN" | "ALWAYS";
      lifePatternType:"MORNING" | "EVENING";
      callType: "OUTSIDE" | "INSIDE" | "ANYWAY";
      earPhoneType: "NEED" | "NOT_NEED";
  		smokeType:"NONE" | "SMOKE";
  		sleepGridingType: "TRUE" | "FALSE";
  		sleepSnoreType: "TRUE" | "FALSE";
  		sleepTalkingType: "TRUE" | "FALSE";
  		sleepTurningType: "TRUE" | "FALSE";
  };

export type sleepType = '코골이' | '이갈이' | '잠꼬대' | '뒤척임';

export type noiseType =
  | '이어폰 필수'
  | '전화는 밖에서'
  | '전화는 짧게'
  | '상관없음';

export type keywordType =
  | '청결도'
  | '비흡연'
  | '흡연'
  | '아침형'
  | '저녁형'
  | '잠버릇'
  | '애주가';

export const convertKeywordToNum: Record<keywordType, string> = {
  청결도: '1',
  비흡연: '2',
  흡연: '3',
  아침형: '4',
  저녁형: '5',
  잠버릇: '6',
  애주가: '7',
};

export const convertNumToKeyword: Record<string, keywordType> = {
  '1': '청결도',
  '2': '비흡연',
  '3': '흡연',
  '4': '아침형',
  '5': '저녁형',
  '6': '잠버릇',
  '7': '애주가',
};

export type orderType =
  | '일치율 높은 순'
  | '등록일 순'
  | '모집마감 임박 순'
  | '저장 많은 순'
  | '에러 확인용';

export const convertOrderToNum: Record<orderType, string> = {
  '등록일 순': '1',
  '일치율 높은 순': '2',
  '모집마감 임박 순': '3',
  '저장 많은 순': '4',
  '에러 확인용': '5',
};

export const convertNumToOrder: Record<string, orderType> = {
  '1': '등록일 순',
  '2': '일치율 높은 순',
  '3': '모집마감 임박 순',
  '4': '저장 많은 순',
};

export type keywordCardType = {
  tag: string;
  title: string;
  text: string;
  keyword: keywordType;
};

export type bottomNavType = 'home' | 'chat' | 'user';

export type joinInfoType = {
  email: string;
  password: string;
  name: string;
  school: string;
  major: string;
  genderType: 'MAN' | 'WOMAN';
  mbtiType: string;
};


// export type myInfoType = {
//   profileImg: string;
//   name: string;
//   major: string;
//   gender: "man" | "woman";
//   mbti: string;
// };