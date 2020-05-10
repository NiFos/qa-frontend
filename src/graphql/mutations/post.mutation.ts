import gql from 'graphql-tag';

export const postsQueries = {
  CREATE_POST: gql`
    mutation CreatePost($data: {title: String, message: String, category: Int}) {
      CreatePost(data: $data)
    }
  `,
  UPDATE_POST: gql`
    mutation UpdatePost($data: {title: String, message: String, category: Int, id: String}) {
      UpdatePost(data: $data)
    }
  `,
  DELETE_POST: gql`
    mutation DeletePost($id: String) {
      DeletePost(id: $id)
    }
  `
}