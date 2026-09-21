import Backendless from "../config/backendless";

export const loginService = async (
  email: string,
  password: string
) => {
  const user = await Backendless.UserService.login(
    email,
    password,
    true
  );

  return user;
};