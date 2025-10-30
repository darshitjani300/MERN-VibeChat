import axiosInstace from "./axios/axiosInstance";

export const signupApi = async (userData: any) => {
  const response = await axiosInstace.post("/auth/signup", userData);
  return response?.data;
};

export const loginApi = async (userData: {
  email: string;
  password: string;
}) => {
  const response = await axiosInstace.post("/auth/login", userData);
  return response?.data;
};
