import gql from 'graphql-tag';

export const commentsMutation = {
  CREATE_COMMENT: gql`
    mutation CreateComment($data: CommentInput) {
      CreateComment(data: $data)
    }
  `,
  DELETE_COMMENT: gql`
    mutation DeleteComment($id: String) {
      DeleteComment(id: $id)
    }
  `,
  UPDATE_COMMENT: gql`
    mutation UpdateComment($data: CommentInput) {
      UpdateComment(data: $data)
    }
  `,
  UPVOTE_COMMENT: gql`
    mutation UpvoteComment($id: String, $up: Boolean) {
      UpvoteComment(id: $id, up: $up)
    }
  `
}