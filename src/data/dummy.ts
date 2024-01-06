import { articleDetailType, articleType, keywordCardType } from './type';

export const articleDummy: articleType = {
  id: 1,
  state: '모집 중',
  title: 'ISFP들 중 80%이상 일치하는 사람~!',
  keywords: ['아침형생활1순위', '80%이상'],
  content:
    '최소 90%이상 일치하는 룸메이트를 구합니다. 체크리스트 이외에 궁금한 점 있으면 채팅 주세요.',
  dday: 7,
  percent: 90,
  bookmark: 25,
};

export const keywordCardDummy: keywordCardType = {
  tag: '청결 1순위',
  title: '청결이 중요한 프로 깔끔러',
  text: `매일매일 청소는 기본!\n청결이 1순위였으면 좋겠어요`,
  keyword: 'clean',
};

export const keywordCardSmoke: keywordCardType = {
  tag: '비흡연자 1순위',
  title: '냄새에 예민한 비흡연자',
  text: `간접흡연도 싫어요!\n같이 노담이면 좋겠어요.`,
  keyword: 'clean',
};

export const keywordCardMorning: keywordCardType = {
  tag: '아침형 인간 1순위',
  title: '부지런한 아침형 인간',
  text: `주로 오전에 생활하고 있어요!\n저처럼 아침형 인간이었으면 좋겠어요`,
  keyword: 'clean',
};

export const keywordCardNight: keywordCardType = {
  tag: '저녁형 1순위',
  title: '느긋한 저녁형 인간',
  text: `주로 오후에 생활하고 있어요!\n저처럼 저녁형 인간이었으면 좋겠어요`,
  keyword: 'clean',
};

export const articleListDummy: articleType[] = [
  articleDummy,
  articleDummy,
  articleDummy,
];

export const articleListDummy2: articleType[] = [
  articleDummy,
  articleDummy,
  articleDummy,
  articleDummy,
  articleDummy,
];

export const articleDetailDummy: articleDetailType = {
  id: 0,
  state: '모집 중',
  title: '내 체크리스트랑 딱 맞는 사람만!',
  deadline: '~1월 19일(금) 까지',
  percent: 100,
  introduce: `안녕하세요 소프트웨어학과 홍길동입니다. 저는 최소 90%이상 일치하는 룸메이트를 구하고 있습니다. 

  체크리스트 이외에 궁금한 점 있으면 채팅 주세요.`,
  keywords: ['청결 1순위', '100% 이상'],
  checklist: {
    smoke: '비흡연자 선호',
    pattern: '아침형 인간',
    clean: '1주에 한번',
    sleep: ['잠꼬대', '코골이'],
    drink: '안마심',
    home: '매주',
    noise: ['이어폰 필수', '전화는 짧게'],
  },
  isBookmarked: false,
  isMine: false,
  user: {
    id: 1,
    name: '홍길동',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8_FCUrlMQPlfsPz_OSjzMR3jHy8OHniIM2g&usqp=CAU',
    major: '소프트웨어학과',
    gender: '여자',
    mbti: 'ISFP',
  },
};
