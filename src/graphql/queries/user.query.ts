import gql from 'graphql-tag';

export const userQueries = {
  GET_OAUTH_URL: gql`
    query GetOauthUrl($type: String) {
      GetOauthUrl(type: $type)
    }
  `,
  ME: gql`
    query {
      Me {
        profile {
          id
          username
          email
        }
        loggedIn
      }
    }
  `,
  USER: gql`
    query User($id: String) {
      User(id: $id) {
        id
        username
        email
        posts {
          title
        }
      }
    }
  `
}