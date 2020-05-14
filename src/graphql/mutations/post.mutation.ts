import gql from 'graphql-tag';

export const postsMutation = {
  CREATE_POST: gql`
    mutation CreatePost($data: PostInput) {
      CreatePost(data: $data)
    }
  `,
  UPDATE_POST: gql`
    mutation UpdatePost($data: PostInput) {
      UpdatePost(data: $data)
    }
  `,
  DELETE_POST: gql`
    mutation DeletePost($id: String) {
      DeletePost(id: $id)
    }
  `
}