export const setJwtToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const getJwtToken = () => {
  return localStorage.getItem('token');
};
