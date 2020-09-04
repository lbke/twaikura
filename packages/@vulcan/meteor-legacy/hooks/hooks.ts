// @see packages/vulcan-users/lib/server/mutations.js
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const authenticateWithPassword = () => {};

export const useLogout = () => {};

import { OperationVariables } from "@apollo/react-common";
import { MutationHookOptions, MutationTuple } from "@apollo/react-hooks";
// Mutation with a fixed query
type PrebuiltMutation<TData = any, TVariables = OperationVariables> = (
  options?: MutationHookOptions<TData, TVariables>
) => MutationTuple<TData, TVariables>;

interface SignupInput {
  email: string;
  password: string;
}
interface SignupOutput {
  userId: string;
}
const signupMutation = gql`
  mutation signup($input: SignupInput) {
    signup(input: $input) {
      userId
    }
  }
`;
export const useSignup: PrebuiltMutation<SignupInput, SignupOutput> = (
  options
) => {
  return useMutation(signupMutation, options);
};

interface AuthWithPasswordInput {
  email: string;
  password: string;
}
interface AuthWithPasswordOutput {
  token: string;
  userId: string;
}
const authenticateWithPasswordMutation = gql`
  mutation auth($input: AuthPasswordInput) {
    authenticateWithPassword(input: $input) {
      token
      userId
    }
  }
`;
export const useAuthenticateWithPassword: PrebuiltMutation<
  AuthWithPasswordInput,
  AuthWithPasswordOutput
> = (options) => useMutation(authenticateWithPasswordMutation, options);

interface LogoutInput {}
interface LogoutOutput {
  userId: string;
}
const logoutMutation = gql`
  mutation logout {
    logout {
      userId
    }
  }
`;
export const useLogoutMutation: PrebuiltMutation<LogoutInput, LogoutOutput> = (
  options
) => useMutation(logoutMutation, options);
// export const useSetPassword = () => {
//
// }
//
// export const useSendResetPasswordEmail = () => {
//
// }
//
// export const useResetPassword = () => {
//
// }
//
// export const useSendVerificationEmail = () => {
//
// }
//
// export const verifyEmail = () => {
//
// }
