import React from 'react';
import { Container, Typography, GridList, GridListTile, Paper, makeStyles, Divider } from '@material-ui/core';
import { postsQueries } from '../../graphql/queries/posts.query';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { textLength } from '../../lib/textlength';
import { localization } from '../../lib/localization';

const useStyles = makeStyles({
  item: {
    padding: '0.3rem',
    height: '100%',
  },
  tile: {
    textDecoration: 'none'
  }
});

interface Props { }

export function Main(props: Props) {
  const classes = useStyles();
  const { data, loading, error } = useQuery(postsQueries.GET_CATEGORIES, {
    variables: {
      pageSize: 3
    }
  });

  function CategoriesList() {
    if (loading) return <div>Loading...</div>
    if (error) return <div>Error</div>
    if (!data) return <div>Data is null</div>

    return data.Categories.map((category: any) => {
      const posts = category.posts.posts.map((item: any): JSX.Element => {
        return (
          <GridListTile component={Link} to={`/post/${item.id}`} className={classes.tile} key={item.id}>
            <Paper className={classes.item}>
              <Typography variant={'h6'}>{textLength(item.title, 20)}</Typography>
              <Typography variant={'body1'}>{textLength(item.message, 20)}</Typography>
            </Paper>
          </GridListTile>
        );
      });
      posts.push(
        <GridListTile component={Link} to={`/category/${category.id}`} className={classes.tile} key={category.id}>
          <Paper className={classes.item}>
            <Typography variant={'h6'}>{localization('loadMore')}</Typography>
          </Paper>
        </GridListTile>
      );
      return (
        <div>
          <Typography variant={'h3'}>{category.title}</Typography>
          <GridList cols={2}>
            {posts}
          </GridList>
        </div>
      );
    });
  }

  return (
    <Container>
      {
        data &&
        <div>
          {CategoriesList()}
        </div>
      }
    </Container>
  );
}