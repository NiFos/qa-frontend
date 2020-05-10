import gql from 'graphql-tag';

export const postsQueries = {
  CREATE_COMMENT: gql`
    mutation CreateComment($data: {id: String, Message: String}) {
      CreateComment(data: $data)
    }
  `,
  DELETE_COMMENT: gql`
    mutation DeleteComment($id: String) {
      DeleteComment(id: $id)
    }
  `,
  UPDATE_COMMENT: gql`
    mutation UpdateComment($data: {id: String, Message: String}) {
      UpdateComment(data: $data)
    }
  `,
  UPVOTE_COMMENT: gql`
    mutation UpvoteComment($id: String, message: String) {
      UpvoteComment(id: $id, message: $message)
    }
  `
}