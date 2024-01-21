import { joinInfoType } from '../data/type';
import { checklistApiType } from '../data/type';
import { baseAxios, authAxios } from './axiosInstance';

/**
 *
 * @param email
 * @returns 이메일 인증 반환값
 */
export const validateEmailApi = async (email: string) => {
  return baseAxios.post('/member/email', { email: email });
};

/**
 *
 * @param joinInfo
 * @returns 멤버 아이디, 네임, 액세스 토큰, 리프레시 토큰
 * 회원가입 성공시 로컬 스토리지에 멤버 아이디, 액세스 토큰, 리프레시 토큰 저장
 * 회원가입 실패시 에러 메시지 반환
 */
export const joinApi = async (joinInfo: joinInfoType) => {
  return baseAxios.post('/member/signup', joinInfo);
};

/**
 *
 * @param email
 * @param password
 * @returns 멤버 아이디, 액세스 토큰, 리프레시 토큰
 * 로그인 성공시 로컬 스토리지에 멤버 아이디, 네임, 액세스 토큰, 리프레시 토큰 저장
 * 로그인 실패시 에러 메시지 반환
 */
export const loginApi = async (email: string, password: string) => {
  return baseAxios.post('/member/signin', { email, password });
};

/**
 *
 * @param checklist
 *
 */
export const editChecklistApi = async (checklist: checklistApiType) => {
  return authAxios.patch('/checklist/my', { checklist });
};

/**
 *
 * @returns 체크리스트
 *
 */
export const getChecklistApi = async () => {
  return authAxios.get('/checklist/my', {});
};

/**
 * @param checklist
 *
 */
export const postChecklistApi = async (checklist: checklistApiType) => {
  return authAxios.post('/checklist/new', { checklist });
};

/**
 *
 * @param profileImg
 */
export const editProfileImg = async (profileImageType: string) => {
  return authAxios.patch('/member/profile', { profileImageType });
};

/**
 *
 * @returns 회원 정보
 */
export const getMyInfoApi = async () => {
  return authAxios.get('/member/mypage', {});
};
