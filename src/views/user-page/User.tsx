import React from 'react';
import { Container, Typography, GridList, GridListTile, Paper, makeStyles } from '@material-ui/core';
import { withRouter, Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { userQueries } from '../../graphql/queries/user.query';
import { Loading } from '../components/Loading/Loading';
import { localization } from '../../lib/localization';

const useStyles = makeStyles({
  item: {
    height: '100%'
  },
  tile: {
    textDecoration: 'none'
  }
});

interface Props {
  match: any,
}

function User(props: Props) {
  const classes = useStyles();
  const userData = useQuery(userQueries.USER, {
    variables: {
      id: props.match.params.id
    }
  });

  function Posts(): JSX.Element[] {
    return (
      userData.data.User.posts.map((item: any) => {
        return (
          <GridListTile component={Link} to={`/post/${item.id}`} className={classes.tile}>
            <Paper className={classes.item}>
              <Typography variant={'h6'}>{item.title}</Typography>
            </Paper>
          </GridListTile>
        );
      })
    );
  }

  return (
    <Container>
      {
        userData.loading
          ? <Loading />
          : userData.error
            ? 'Error'
            : <div>
              <Typography variant={'h4'}>{userData.data.User.username}</Typography>
              <Typography variant={'h5'}>{localization('posts')}</Typography>
              <GridList cols={2} cellHeight={100}>
                {Posts()}
              </GridList>
            </div>
      }
    </Container>
  );
}

const UserWithRouter = withRouter(User);

export { UserWithRouter as User };