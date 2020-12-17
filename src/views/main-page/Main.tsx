/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
  Container,
  Typography,
  GridList,
  GridListTile,
  Paper,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import { postsQueries } from "../../graphql/queries/posts.query";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { Link, useHistory } from "react-router-dom";
import { textLength } from "../../lib/text-length";
import { localization } from "../../lib/localization";
import { userQueries } from "../../graphql/queries/user.query";

const useStyles = makeStyles({
  item: {
    padding: "0.5rem",
    height: "100%",
  },
  tile: {
    textDecoration: "none",
  },
  title: {
    marginTop: "10px",
    marginBottom: "20px",
  },
});

interface Props {}

export function Main(props: Props) {
  const classes = useStyles();
  const { data, loading, error } = useQuery(postsQueries.GET_CATEGORIES, {
    variables: {
      pageSize: 3,
    },
  });
  const [getMe] = useLazyQuery(userQueries.ME, { fetchPolicy: "network-only" });
  const history = useHistory();

  React.useEffect(() => {
    const isAuth: boolean =
      (history?.location?.state as {
        auth?: boolean;
      })?.auth || false;
    if (isAuth) {
      getMe();
    }
  }, []);

  function CategoriesList() {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    if (!data) return <div>Data is null</div>;

    return data.Categories.map((category: any) => {
      const posts = category.posts.posts.map(
        (item: any): JSX.Element => {
          return (
            <GridListTile
              component={Link}
              to={`/post/${item.id}`}
              className={classes.tile}
              key={item.id}
            >
              <Paper
                className={classes.item}
                elevation={3}
                variant={"outlined"}
                color={"primary"}
              >
                <Typography variant={"h6"}>
                  {textLength(item.title, 20)}
                </Typography>
                <Typography variant={"body1"}>
                  {textLength(item.message, 20)}
                </Typography>
              </Paper>
            </GridListTile>
          );
        }
      );
      posts.push(
        <GridListTile
          component={Link}
          to={`/category/${category.id}`}
          className={classes.tile}
          key={category.id}
        >
          <Paper className={classes.item} elevation={3} variant={"outlined"}>
            <Typography variant={"h6"}>{localization("loadMore")}</Typography>
          </Paper>
        </GridListTile>
      );
      return (
        <div key={category.id}>
          <Typography variant={"h4"} className={classes.title}>
            {category.title}
          </Typography>
          {posts.length > 0 && <GridList cols={2}>{posts}</GridList>}
        </div>
      );
    });
  }

  return (
    <Container>
      {loading ? (
        <CircularProgress />
      ) : data ? (
        <div>{CategoriesList()}</div>
      ) : (
        <div>No data</div>
      )}
    </Container>
  );
}
