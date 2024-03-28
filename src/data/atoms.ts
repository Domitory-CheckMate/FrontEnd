import { atom } from 'recoil';
import { checklistApiType } from './type';

export interface keywords {
  keyword: string;
  match: string;
}

//recoil state 생성
export const keywordState = atom<keywords>({
  key: 'keyword',
  default: {
    keyword: '',
    match: '',
  },
});

export const myCheckListState = atom<checklistApiType>({
  key: 'myCheckList',
  default: undefined,
});

export const memberIdState = atom<number>({
  key: 'id',
  default: 0,
});

export const myEmailState = atom<string>({
  key: 'email',
  default: '',
});
