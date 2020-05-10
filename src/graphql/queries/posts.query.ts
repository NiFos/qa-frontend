import gql from 'graphql-tag';

export const postsQueries = {
  GET_POST: gql`
    query Post($id: String) {
      Post(id: $id) {
        id
        authorId
        title
        message
        category
        comments {
          authorId
          message
          votes
        }
      }
    }
  `,
  GET_CATEGORY: gql`
    query Category($id: Int) {
      Category(id: $id) {
        posts {
          id
          authorId
          title
          message
        }
        hasMore
        cursor
      }
    }
  `,
  SEARCH: gql`
    query Search($text: String!, $after: String, $pageSize: Int) {
      Search(text: $text, after: $after, pageSize: $pageSize) {
        posts {
          id
          title
        }
        hasMore
        cursor
      }
    }
  `,
}