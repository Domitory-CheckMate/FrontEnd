import { joinInfoType } from '../data/type';
import { baseAxios } from './axiosInstance';

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
 * @param univ
 * @param searchText
 * @returns 학과 검색 결과
 */
export const searchDepartmentApi = async (univ: string, searchText: string) => {
  return baseAxios.get(`/department?univ=${univ}&searchText=${searchText}`);
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
 * @param email
 * @returns 비밀번호 재설정 이메일 전송
 */
export const validateEmailForPwApi = async (email: string) => {
  return baseAxios.post('/member/email/reset', { email });
};

/**
 *
 * @param email
 * @param newPassword
 * @returns 비밀번호 재설정
 */
export const changePwApi = async (email: string, newPassword: string) => {
  return baseAxios.patch('/member/reset', { email, newPassword });
};
