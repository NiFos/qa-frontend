import gql from "graphql-tag";

export const authMutation = {
  LOGIN: gql`
    mutation Login($data: LoginInput) {
      Login(data: $data)
    }
  `,
  REG: gql`
    mutation Reg($data: RegInput) {
      Reg(data: $data)
    }
  `,
};
