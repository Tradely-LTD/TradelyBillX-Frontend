import { baseApi } from "@/store/baseApi";
import { Methods } from "@/utils/enums";
import { toast } from "react-toastify";
import { setAuth } from "./authSlice";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (data) => ({
        url: "/auth/login",
        method: Methods.Post,
        body: data,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data: registerData } = await queryFulfilled; // Extract response
          console.log("LLLL::", registerData);
          // Assuming registerData contains authToken and user details
          dispatch(
            setAuth({
              isAuthenticated: true,
              loginResponse: registerData,
            })
          );
          toast.success("Login Successfully", {
            position: "top-right",
          });
        } catch (err: any) {
          const errorMessage = err.error.data.error || err?.error || "Failed to create the account";

          toast.error(errorMessage, {
            position: "top-right",
          });
        }
      },
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (data) => ({
        url: "/auth/register",
        method: Methods.Post,
        body: data,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;

          toast.success("Account created successfully", {
            position: "top-right",
          });
        } catch (err: any) {
          const errorMessage = err.error.data.error || err?.error || "Failed to create the account";

          toast.error(errorMessage, {
            position: "top-right",
          });
        }
      },
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
  message: String;
}

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profileImage?: string;
  isKYCCompleted: boolean;
  isVerified: boolean;
  role: "superadmin" | "admin" | "agent";
  status: boolean;
  state: string;
  lga: string;
  city: string;
  market?: string;
  streetAddress?: string;
}

export interface LoginRequest {
  email: string; // Changed from `username` to `email`
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  state: string;
  lga: string;
  city: string;
  market?: string;
  streetAddress?: string;
}

export interface RegisterResponse {
  message: string;
  token: string;
  user: AuthUser;
  success: boolean;
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
  useRegisterMutation,
} = authApi;
