import { articlePostType, checklistApiType, joinInfoType } from '../data/type';
// import { checklistApiType } from '../data/type';
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
 * @param checklist
 * @returns 체크리스트 수정
 *
 */
export const editChecklistApi = async (checklist: checklistApiType) => {
  return authAxios.patch('/checkList/my', {
    callType: checklist.callType,
    cleanType: checklist.cleanType,
    drinkType: checklist.drinkType,
    earPhoneType: checklist.earPhoneType,
    homeType: checklist.homeType,
    lifePatternType: checklist.lifePatternType,
    sleepGrindingType: checklist.sleepGrindingType,
    sleepSnoreType: checklist.sleepSnoreType,
    sleepTalkingType: checklist.sleepTalkingType,
    sleepTurningType: checklist.sleepTurningType,
    smokeType: checklist.smokeType,
  });
};

/**
 * @param email
 * @returns 비밀번호 재설정 이메일 전송
 */
export const validateEmailForPwApi = async (email: string) => {
  return baseAxios.post('/member/email/reset', { email });
};

/**
 *
 * @returns 체크리스트
 *
 */
export const getChecklistApi = async () => {
  return authAxios.get('/checkList/my', {});
};

/**
 * @param checklist
 * @returns 체크리스트 작성
 *
 */
export const postChecklistApi = async (checklist: checklistApiType) => {
  return authAxios.post('/checkList/new', {
    callType: checklist.callType,
    cleanType: checklist.cleanType,
    drinkType: checklist.drinkType,
    earPhoneType: checklist.earPhoneType,
    homeType: checklist.homeType,
    lifePatternType: checklist.lifePatternType,
    sleepGrindingType: checklist.sleepGrindingType,
    sleepSnoreType: checklist.sleepSnoreType,
    sleepTalkingType: checklist.sleepTalkingType,
    sleepTurningType: checklist.sleepTurningType,
    smokeType: checklist.smokeType,
  });
};
/**
 *
 * @param profileImg
 * @returns 프로필 이미지 수정
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

/**
 * @param email
 * @param newPassword
 * @returns 비밀번호 재설정
 */
export const changePwApi = async (email: string, newPassword: string) => {
  return baseAxios.patch('/member/reset', { email, newPassword });
};

/**
 * @returns 로그아웃
 */
export const logOut = async () => {
  return authAxios.post('/member/signout', {});
};

/**
 * @returns 탈퇴
 */
export const withdraw = async () => {
  return authAxios.patch('/member/withdraw', {});
};

/**
 *
 * @param article
 * @returns 게시글 작성
 */
export const postNewPostApi = async (article: articlePostType) => {
  return authAxios.post('/post', {
    title: article.title,
    content: article.content,
    importantKey: article.importantKey,
    similarityKey: article.similarityKey,
    roomType: article.roomType,
    dormitoryType: article.dormitoryType,
    endDate: article.endDate,
    checkList: {
      callType: article.checkList.callType,
      cleanType: article.checkList.cleanType,
      drinkType: article.checkList.drinkType,
      earPhoneType: article.checkList.earPhoneType,
      homeType: article.checkList.homeType,
      lifePatternType: article.checkList.lifePatternType,
      sleepGrindingType: article.checkList.sleepGrindingType,
      sleepSnoreType: article.checkList.sleepSnoreType,
      sleepTalkingType: article.checkList.sleepTalkingType,
      sleepTurningType: article.checkList.sleepTurningType,
      smokeType: article.checkList.smokeType,
    },
  });
};

/**
 *
 * @param id,article
 * @returns 게시글 수정
 */
export const patchPostApi = async (id: number, article: articlePostType) => {
  return authAxios.patch(`/post/${id}`, {
    title: article.title,
    content: article.content,
    importantKey: article.importantKey,
    similarityKey: article.similarityKey,
    roomType: article.roomType,
    dormitoryType: article.dormitoryType,
    endDate: article.endDate,
    checkList: {
      callType: article.checkList.callType,
      cleanType: article.checkList.cleanType,
      drinkType: article.checkList.drinkType,
      earPhoneType: article.checkList.earPhoneType,
      homeType: article.checkList.homeType,
      lifePatternType: article.checkList.lifePatternType,
      sleepGrindingType: article.checkList.sleepGrindingType,
      sleepSnoreType: article.checkList.sleepSnoreType,
      sleepTalkingType: article.checkList.sleepTalkingType,
      sleepTurningType: article.checkList.sleepTurningType,
      smokeType: article.checkList.smokeType,
    },
  });
};
