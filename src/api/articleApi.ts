import { AxiosResponse } from 'axios';
import { articleListType } from '../data/type';
import { authAxios } from './axiosInstance';

/**
 *
 * @param type 정렬 순서
 * @param key 키워드
 * @param gender 성별
 * @param page 페이지
 * @param size 사이즈
 * @returns 모집글 리스트
 */
interface PostListResponse {
  code: number;
  message: string;
  data: {
    results: articleListType[];
    totalPages: number;
    totalElements: number;
  };
}
export const getPostListApi = async ({
  type = '1',
  key,
  gender,
  page,
  size,
}: {
  type: string;
  size: number;
  key?: string;
  gender?: string;
  page?: number;
}): Promise<AxiosResponse<PostListResponse>> => {
  const queryString =
    `/post?type=${type}&size=${size}` +
    (key !== undefined ? `&key=${key}` : '') +
    (gender !== undefined ? `&gender=${gender}` : '') +
    (page !== undefined ? `&page=${page}` : '');
  console.log(queryString);

  return authAxios.get(queryString);
};
