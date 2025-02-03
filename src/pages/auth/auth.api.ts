import { baseApi } from "@/store/baseApi";
import { Methods } from "@/utils/enums";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (data) => ({
        url: "/login",
        method: Methods.Post,
        data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/authentication/logout",
        method: Methods.Put,
      }),
    }),

    passwordReset: builder.mutation<ResetPasswordResponse, PasswordResetArgs>({
      query: (data) => ({
        url: "/password-reset",
        method: Methods.Post,
        data,
      }),
    }),
    verifyEmail: builder.mutation<any, string>({
      query: (token) => ({
        url: "/email-verification",
        params: { token },
        method: Methods.Put,
      }),
      invalidatesTags: ["AUTH"],
    }),
  }),
});

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: AuthUser;
}

export interface AuthUser {
  userId: string;
  loginStatus: boolean;
  createdBy: string;
  fullName: string;
  emailVerified: boolean;
  verificationCode: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface PasswordResetArgs {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export interface RefreshTokenResponse extends LoginResponse {}
export const {
  useVerifyEmailMutation,
  useLoginMutation,
  useLogoutMutation,
  usePasswordResetMutation,
} = authApi;
