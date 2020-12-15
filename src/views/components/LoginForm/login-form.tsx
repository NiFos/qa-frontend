import React from "react";
import {
  Container,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  makeStyles,
  Button,
} from "@material-ui/core";
import { localization } from "../../../lib/localization";
import { emailValidation, lengthValidation } from "../../../lib/validation";

const useStyles = makeStyles({
  marginBottom: {
    marginBottom: "1.5rem",
  },
});

interface FormData {
  email: {
    value: string;
    valid: boolean;
    touched: boolean;
  };
  password: {
    value: string;
    valid: boolean;
    touched: boolean;
  };
  username: {
    value: string;
    valid: boolean;
    touched: boolean;
  };
}
const initialFormData: FormData = {
  email: {
    touched: false,
    valid: true,
    value: "",
  },
  password: {
    touched: false,
    valid: true,
    value: "",
  },
  username: {
    touched: false,
    valid: true,
    value: "",
  },
};

interface Props {
  authHandler: (formData: FormData) => void;
  oauthHandler: (type: string) => void;
}

export function LoginForm(props: Props) {
  const [formData, setFormData] = React.useState(initialFormData);
  const [authType, setAuthType] = React.useState("login");
  const loginSubmitBtnDisabled =
    !formData.email.valid ||
    !formData.password.valid ||
    !formData.email.touched ||
    !formData.password.touched;
  const regSubmitBtnDisabled =
    !formData.email.valid ||
    !formData.password.valid ||
    !formData.email.touched ||
    !formData.password.touched ||
    !formData.username.valid ||
    !formData.username.touched;
  const submitBtnDisabled =
    authType === "login" ? loginSubmitBtnDisabled : regSubmitBtnDisabled;

  function handleFormData(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const valid = validateForm(name, value);
    setFormData({
      ...formData,
      [e.target.name]: {
        touched: true,
        valid,
        value,
      },
    });
  }

  function validateForm(name: string, value: string) {
    if (name === "email") return emailValidation(value);
    else if (name === "password") return lengthValidation(value, 6);
    else return lengthValidation(value, 6);
  }

  function submitForm() {
    props.authHandler(formData);
  }

  return (
    <Container>
      <Typography variant={"h4"} align={"center"}>
        {localization("login")}
      </Typography>
      <AuthRadio value={authType} setValue={(value) => setAuthType(value)} />
      {authType === "login" ? (
        <LoginFields data={formData} dataHandler={handleFormData} />
      ) : (
        <RegFields data={formData} dataHandler={handleFormData} />
      )}
      <Button
        fullWidth
        variant={"contained"}
        color={"primary"}
        disabled={submitBtnDisabled}
        onClick={submitForm}
      >
        {authType === "login" ? localization("login") : localization("reg")}
      </Button>
    </Container>
  );
}

interface AuthProps {
  value: string;
  setValue: (value: string) => void;
}
function AuthRadio(props: AuthProps) {
  const classes = useStyles();

  return (
    <RadioGroup
      row={false}
      name={"authType"}
      defaultValue={"login"}
      value={props.value}
      onChange={(e) => props.setValue(e.target.value)}
      className={classes.marginBottom}
    >
      <FormControlLabel
        value={"login"}
        control={<Radio color={"primary"} />}
        label={localization("login")}
      />
      <FormControlLabel
        value={"reg"}
        control={<Radio color={"primary"} />}
        label={localization("reg")}
      />
    </RadioGroup>
  );
}

interface FieldsProps {
  data: FormData;
  dataHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function RegFields(props: FieldsProps) {
  const classes = useStyles();

  return (
    <div className={classes.marginBottom}>
      <TextField
        required
        label={localization("userName")}
        variant={"outlined"}
        fullWidth
        name={"username"}
        className={classes.marginBottom}
        value={props.data.username.value}
        onChange={props.dataHandler}
      />
      <TextField
        required
        label={localization("email")}
        variant={"outlined"}
        fullWidth
        name={"email"}
        className={classes.marginBottom}
        value={props.data.email.value}
        onChange={props.dataHandler}
      />
      <TextField
        required
        label={localization("password")}
        variant={"outlined"}
        type={"password"}
        fullWidth
        name={"password"}
        className={classes.marginBottom}
        value={props.data.password.value}
        onChange={props.dataHandler}
      />
    </div>
  );
}

function LoginFields(props: FieldsProps) {
  const classes = useStyles();

  return (
    <div className={classes.marginBottom}>
      <TextField
        required
        label={localization("email")}
        variant={"outlined"}
        value={props.data.email.value}
        fullWidth
        name={"email"}
        className={classes.marginBottom}
        onChange={props.dataHandler}
      />
      <TextField
        required
        label={localization("password")}
        variant={"outlined"}
        type={"password"}
        value={props.data.password.value}
        fullWidth
        name={"password"}
        className={classes.marginBottom}
        onChange={props.dataHandler}
      />
    </div>
  );
}
