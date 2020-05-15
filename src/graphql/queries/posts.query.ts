import gql from 'graphql-tag';

export const postsQueries = {
  GET_POST: gql`
    query Post($id: String) {
      Post(id: $id) {
        id
        author {
          id
          username
        }
        title
        message
        category
        comments {
          id
          author {
            id
            username
          }
          message
          votes
        }
      }
    }
  `,
  GET_CATEGORIES: gql`
    query Categories($pageSize: Int) {
      Categories {
        title
        id
        img
        posts(pageSize: $pageSize) {
          posts {
            id
            title
            message
          }
        }
      }
    }
  `,
  GET_CATEGORY: gql`
    query Category($id: String, $after: String, $pageSize: Int) {
      Category(id: $id) {
        title
        posts(after: $after, pageSize: $pageSize) {
          posts {
            id
            author {
              id
              username
            }
            title
            message
          }
          hasMore
          cursor
        }
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