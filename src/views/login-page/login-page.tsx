import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import { AuthFormData, LoginForm } from "../components/LoginForm/login-form";
import { useMutation } from "@apollo/react-hooks";
import { authMutation } from "../../graphql/mutations/auth.mutation";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  Container: {
    marginTop: "5rem",
  },
});

interface Props {}

export function LoginPage(props: Props) {
  const classes = useStyles();
  const history = useHistory();
  const [login, loginData] = useMutation(authMutation.LOGIN, {});
  const [reg, regData] = useMutation(authMutation.REG, {});

  React.useEffect(() => {
    if (
      (loginData.called || regData.called) &&
      (!loginData.loading || !regData.loading)
    ) {
      if (
        typeof loginData?.data?.Login !== "undefined" ||
        typeof regData?.data?.Reg !== "undefined"
      ) {
        history.push("/", { auth: true });
      }
    }
  }, [loginData, regData, history]);

  function handleAuthForm(data: AuthFormData, isReg: boolean) {
    if (isReg) {
      reg({
        variables: {
          data: {
            username: data.username.value,
            email: data.email.value,
            password: data.password.value,
          },
        },
      });
    } else {
      login({
        variables: {
          data: {
            email: data.email.value,
            password: data.password.value,
          },
        },
      });
    }
  }

  return (
    <Container className={classes.Container}>
      <LoginForm authHandler={handleAuthForm} />
    </Container>
  );
}
