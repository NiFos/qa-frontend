import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { postsQueries } from '../../graphql/queries/posts.query';
import { withRouter, Link } from 'react-router-dom';
import { Container, Typography, GridList, GridListTile, Paper, makeStyles } from '@material-ui/core';
import { Loading } from '../components/Loading/Loading';
import { AddPostDrawer } from '../components/Drawers/AddPostDrawer';
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { localization } from '../../lib/localization';
import { postsMutation } from '../../graphql/mutations/post.mutation';
import { textLength } from '../../lib/textlength';

const useStyles = makeStyles({
  item: {
    padding: '0.3rem',
    height: '100%',
  },
  tile: {
    textDecoration: 'none'
  },
  addPost: {
    textAlign: 'center'
  }
});

interface Props {
  history: any,
  location: any,
  match: any

}

function Category(props: Props) {
  const [postDrawer, setPostDrawer] = React.useState(false);
  const pageSize = 10;
  const { data, loading, error, fetchMore, client } = useQuery(postsQueries.GET_CATEGORY, {
    variables: {
      id: props.match.params.id,
      after: '',
      pageSize: pageSize,
    },
    fetchPolicy: 'network-only'
  });
  const [addPost] = useMutation(postsMutation.CREATE_POST);
  const classes = useStyles();

  function handlePostDrawer() {
    setPostDrawer(!postDrawer);
  }

  function getCategoriesLocal() {
    try {
      const data = client.readQuery({
        query: postsQueries.GET_CATEGORIES
      });

      return data.Categories;
    } catch (error) { }
  }


  function submitPost(title: string, message: string, category: string) {
    addPost({
      variables: {
        data: {
          title,
          message,
          category
        }
      }
    });
    handlePostDrawer();
  }

  function loadMore() {
    fetchMore({
      variables: {
        id: props.match.params.id,
        after: data.Category.posts.cursor as string,
        pageSize: pageSize,
      },
      updateQuery: (prev, { fetchMoreResult, variables }) => {
        if (!fetchMoreResult) return prev;

        return {
          ...fetchMoreResult,
          Category: {
            ...fetchMoreResult.Category,
            posts: {
              ...fetchMoreResult.Category.posts,
              posts: [
                ...prev.Category.posts.posts,
                ...fetchMoreResult.Category.posts.posts,
              ]
            }
          }
        }
      }
    })
  }

  function Posts(): JSX.Element[] {
    let posts: any[] = data.Category.posts.posts.map((item: any, index: number) => {
      const { title, message, id } = item;

      return (
        <GridListTile rows={1} cols={index % 3 === 0 ? 2 : 1} key={item.id} component={Link} to={`/post/${id}`} className={classes.tile}>
          <Paper variant={'outlined'} color={'primary'} className={classes.item}>
            <Typography variant={'h6'}>
              {textLength(title, 20)}
            </Typography>
            <Typography variant={'body1'}>
              {textLength(message, 20)}
            </Typography>
          </Paper>
        </GridListTile>
      );
    });
    posts.unshift(
      <GridListTile rows={1} cols={2} key={'newPost'} className={[classes.tile, classes.addPost].join(' ')}>
        <Paper variant={'outlined'} color={'primary'} className={classes.item} onClick={handlePostDrawer}>
          <Typography variant={'h6'}>{localization('addPost')}</Typography>
          <AddIcon fontSize={'large'} />
        </Paper>
      </GridListTile>
    );
    if (data.Category.posts.hasMore) {
      posts.push(
        <GridListTile rows={1} cols={2} key={'loadMore'} className={[classes.tile, classes.addPost].join(' ')}>
          <Paper
            variant={'outlined'}
            color={'primary'}
            className={classes.item}
            onClick={loadMore}
          >
            <Typography variant={'h6'}>{localization('loadMore')}</Typography>
            <ExpandMoreIcon fontSize={'large'} />
          </Paper>
        </GridListTile>
      );
    }

    return posts;
  }

  return (
    <React.Fragment>
      <AddPostDrawer
        open={postDrawer}
        onClose={handlePostDrawer}
        categories={getCategoriesLocal()}
        submit={submitPost}
      />
      {
        loading
          ? <Loading />
          : error
            ? <Typography variant={'h5'} color={'error'}>
              {error}
            </Typography>
            : <Container>
              <Typography variant={'h4'}>
                {data.Category.title}
              </Typography>

              <GridList cols={2}>
                {Posts()}
              </GridList>
            </Container>
      }

    </React.Fragment>
  );
}

const CategoryWithRouter = withRouter(Category);
export { CategoryWithRouter as Category };