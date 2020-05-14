import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import { LoginForm } from '../components/LoginForm/LoginForm';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { userQueries } from '../../graphql/queries/user.query';
import { authMutation } from '../../graphql/mutations/auth.mutation';

const useStyles = makeStyles({
  Container: {
    marginTop: '5rem'
  }
});


interface Props { }

export function LoginPage(props: Props) {
  const classes = useStyles();
  const [getGoogleOauthUrl] = useLazyQuery(userQueries.GET_OAUTH_URL);
  const [getMe] = useLazyQuery(userQueries.ME, {
    fetchPolicy: 'network-only'
  });
  const [login] = useMutation(authMutation.LOGIN, {
    onCompleted() {
      getMe();
    }
  });

  function handleAuthForm(data: any) {
    login({
      variables: {
        data: {
          email: data.email.value,
          password: data.password.value,
        }
      }
    });
  }
  function handleOauthUrl(type: string) {
    getGoogleOauthUrl({ variables: { type } });
  }

  return (
    <Container
      className={classes.Container}
    >
      <LoginForm authHandler={handleAuthForm} oauthHandler={handleOauthUrl} />
    </Container>
  );
}