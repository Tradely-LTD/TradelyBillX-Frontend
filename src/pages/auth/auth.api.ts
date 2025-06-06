import { baseApi } from "@/store/baseApi";
import { Methods } from "@/utils/enums";
import { toast } from "react-toastify";
import { setAuth } from "./authSlice";
import { RequestPayload, State } from "../location/location.api";

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
    getUsers: builder.query<{ data: AuthUser[]; success: boolean }, GetUsersParams | void>({
      query: (params) => {
        const queryParams = params?.role ? `?role=${params.role}` : "";
        return {
          url: `auth/users${queryParams}`,
          method: Methods.Get,
        };
      },
    }),
    getProfile: builder.query<{ data: Profile; success: boolean }, { id: string }>({
      query: ({ id }) => {
        return {
          url: `auth/profile/${id}`,
          method: Methods.Get,
        };
      },
    }),
    updateProfile: builder.mutation<any, any>({
      query: ({ data }) => ({
        url: `/auth/profile/${data?.id}`,
        method: Methods.Put,
        body: data,
      }),
      invalidatesTags: ["AUTH"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("Updated Successfully", {
            position: "top-right",
          });
        } catch (err: any) {
          const errorMessage = err?.error?.data?.error || err?.error || "Failed to update ";
          toast.error(errorMessage, {
            position: "top-right",
          });
        }
      },
    }),
    updateUser: builder.mutation<any, any>({
      query: ({ data }) => ({
        url: `/auth/${data.id}`,
        method: Methods.Put,
        body: data,
      }),
      invalidatesTags: ["UNION"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("Updated Successfully", {
            position: "top-right",
          });
        } catch (err: any) {
          const errorMessage = err?.error?.data?.error || err?.error || "Failed to update ";
          toast.error(errorMessage, {
            position: "top-right",
          });
        }
      },
    }),
    getUser: builder.query<{ data: AuthUser; success: boolean }, { id: string }>({
      query: ({ id }) => ({
        url: `auth/user/${id}`,
        method: Methods.Get,
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

export type UserRole = "superadmin" | "admin" | "agent" | null;

interface GetUsersParams {
  role?: UserRole;
}

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  union: string;
  phoneNumber: string;
  profileImage?: string;
  isKYCCompleted: boolean;
  isVerified: boolean;
  role: UserRole;
  status: boolean;
  state: State;
  lga: string;
  city: string;
  market?: RequestPayload;
  streetAddress?: string;
  organisation: Organisation;
  profile: Profile;
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
  stateId: string;
  lgaId: string;
  city: string;
  marketId?: string;
  streetAddress?: string;
}

export interface RegisterResponse {
  message: string;
  token: string;
  user: AuthUser;
  success: boolean;
}

export interface Organisation {
  createdAt: string;
  id: string;
  logo: string;
  orgName: string;
  shortName: string;
  updatedAt: string;
}
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profileImage: string | null;
  isKYCCompleted: boolean;
  isVerified: boolean;
  stateId: string;
  lgaId: string;
  marketId: string;
  role: UserRole;
  status: boolean;
  union: string | null;
  city: string;
  streetAddress: string | null;
  organisationId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Profile {
  id: string;
  agentId: string;
  agentFee: number;
  accountNumber: number;
  bankCode: string;
  accountName: string;
  payStackAccountNumber: string;
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
  useGetUserQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} = authApi;
