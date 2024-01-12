export const setOnboardingFinished = (onboarding: boolean) => {
  localStorage.setItem('onboardingFinish', JSON.stringify(onboarding));
};

export const getOnboardingFinished = () => {
  return JSON.parse(localStorage.getItem('onboardingFinish') || 'false');
};

export const setAccessToken = (token: string) => {
  localStorage.setItem('access', token);
};

export const getAccessToken = () => {
  return localStorage.getItem('access');
};

export const setRefreshToken = (token: string) => {
  localStorage.setItem('refresh', token);
};

export const getRefreshToken = () => {
  return localStorage.getItem('refresh');
};

export const setMemberId = (id: string) => {
  localStorage.setItem('memberId', id);
};

export const getMemberId = () => {
  return localStorage.getItem('memberId');
};

export const setMemberName = (name: string) => {
  localStorage.setItem('memberName', name);
};

export const getMemberName = () => {
  return localStorage.getItem('memberName');
};
