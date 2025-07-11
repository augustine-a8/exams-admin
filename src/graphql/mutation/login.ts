import { gql } from "@apollo/client";

export const SIGN_IN_ADMIN = gql`
  mutation SignInAdministrator($email: String!, $password: String!) {
    signInAdministrator(email: $email, password: $password) {
      token
    }
  }
`;
