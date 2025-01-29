export const appPaths = {
  // PUBLIC
  login: "/login",
  register: "/register",
  // passwordReset: "/reset-request",
  forgotPassword: "/forgot-password",
  verification: "/verify",
  verifyCode: "/verify-code",
  accountConfirmation: "/confirm",
  newPassword: "/new-password",
  authCallback: "/auth-callback",
  logout: "/logout",

  // COMMON
  dashboard: "/",
  history: "/history",
  profile: "/profile",
  configuration: "/configuration",
  users: "/users",
  user: "/user",
  getUser: (id = ":id") => `/user/${id}`,
};
