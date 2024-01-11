import { baseAxios } from './axiosInstance';

/**
 *
 * @param email
 * @returns 이메일 인증 반환값
 */
export const validateEmailApi = async (email: string) => {
  return baseAxios.post('/member/email', { email: email });
};
