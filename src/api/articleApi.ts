import { AxiosResponse } from 'axios';
import { articleListType } from '../data/type';
import { authAxios } from './axiosInstance';

/**
 *
 * @param type 정렬 순서
 * @param key 키워드
 * @param gender 성별
 * @param dormitory 기숙사 종류
 * @param page 페이지
 * @param size 사이즈
 * @returns 모집글 리스트
 */
export interface PostListResponse {
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
  size,
  key,
  gender,
  dormitory,
  page,
}: {
  type: string;
  size: number;
  key?: string;
  gender?: string;
  dormitory?: string;
  page?: number;
}): Promise<AxiosResponse<PostListResponse>> => {
  const queryString =
    `/post?type=${type}&size=${size}` +
    (key !== undefined ? `&key=${key}` : '') +
    (gender !== undefined ? `&gender=${gender}` : '') +
    (page !== undefined ? `&page=${page}` : '') +
    (dormitory !== undefined ? `&dormitory=${dormitory}` : '');
  console.log(queryString);

  return authAxios.get(queryString);
};

export const getMyPostListApi = async ({size, page}: {
  size: number;
  page: number;
}): Promise<AxiosResponse<PostListResponse>> => {
  const queryString =
    `/post/my?size=${size}&page=${page}`;
  console.log(queryString);

  return authAxios.get(queryString);
};

/**
 *
 * @param page 페이지
 * @param size 사이즈
 * @return 내가 스크랩한 글 리스트
 */
export const getMyScrapListApi = async ({
  page,
  size,
}: {
  page: number;
  size: number;
}): Promise<AxiosResponse<PostListResponse>> => {
  return authAxios.get(`/scrap?page=${page}&size=${size}`);
};

/**
 *
 * @param id
 * @returns 게시글 조회
 */
export const getPostApi = async ({id}: {id:string | undefined}) => {
  return authAxios.get(`/post/${id}`);
};

/**
 *
 * @param postState
 * @returns 게시글 상태 수정
 */
export const patchArticleStateApi = async ({id, postState}: {id:string | undefined, postState:string | undefined}) => {
  return authAxios.patch(`/post/state/${id}`,{postState});
};

/**
 *
 * @param postId
 * @returns 스크랩
 */
export const postScrap = async (postId:number) => {
  return authAxios.post(`/scrap`,{postId});
};

/**
 *
 * @param postId
 * @returns 스크랩
 */
export const deleteScrap = async (postId:number) => {
  return authAxios.delete(`/scrap/${postId}`,);
};

