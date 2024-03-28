import { AxiosResponse } from 'axios';
import { PostListResponse } from './articleApi';
import { authAxios } from './axiosInstance';

export const getTextSearchApi = async ({
  text,
  page,
  size,
}: {
  text: string;
  page: number;
  size: number;
}): Promise<AxiosResponse<PostListResponse>> => {
  return authAxios.get(`/post/search?text=${text}&page=${page}&size=${size}`);
};
