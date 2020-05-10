import gql from 'graphql-tag';

export const postsQueries = {
  LOGIN: gql`
    mutation Login($data: {email: String, password: String}) {
      Login(data: $data)
    }
  `,
  REG: gql`
    mutation Reg($data: {username: String, email: String, password: String}) {
      Reg(data: $data)
    }
  `,
  LOGIN_OAUTH: gql`
    mutation LoginOauth($token: String) {
      LoginOauth(token: $token)
    }
  `,
}