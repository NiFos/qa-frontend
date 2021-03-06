/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Container, Typography, Divider, makeStyles } from "@material-ui/core";
import { postsQueries } from "../../graphql/queries/posts.query";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import { withRouter } from "react-router-dom";
import { Loading } from "../components/Loading/Loading";
import { Comments } from "../components/Comments/Comments";
import { commentsMutation } from "../../graphql/mutations/comments.mutations";

const useStyles = makeStyles({
  div: {
    marginBottom: "1rem",
  },
});

interface Props {
  match: any;
  history: any;
  location: any;
}

function Post(props: Props) {
  const classes = useStyles();
  const [getPost, { data, loading, error }] = useLazyQuery(
    postsQueries.GET_POST,
    {
      variables: {
        id: props.match.params.id,
      },
      fetchPolicy: "network-only",
    }
  );
  const [upVote] = useMutation(commentsMutation.UPVOTE_COMMENT);
  const [addComment] = useMutation(commentsMutation.CREATE_COMMENT, {
    onCompleted() {
      getPost();
    },
  });

  React.useEffect(() => {
    getPost();
  }, []);

  function voteHandler(id: string, up: boolean) {
    upVote({
      variables: {
        data: {
          id,
          up,
        },
      },
    });
  }

  function submitHandler(message: string) {
    addComment({
      variables: {
        data: {
          id: props.match.params.id,
          message,
        },
      },
    });
  }

  return (
    <React.Fragment>
      {loading ? (
        <Loading />
      ) : error ? (
        <Typography variant={"h4"} color={"error"}>
          {error}
        </Typography>
      ) : data && data.Post ? (
        <Container>
          <Typography variant={"h5"}>{data.Post.title}</Typography>
          <Typography variant={"body1"}>{data.Post.message}</Typography>
          <Divider className={classes.div} />
          <Comments
            comments={data.Post.comments}
            userVoteComments={[]}
            vote={voteHandler}
            createComment={submitHandler}
          />
        </Container>
      ) : (
        "No post"
      )}
    </React.Fragment>
  );
}

const PostWithRouter = withRouter(Post);

export { PostWithRouter as Post };
