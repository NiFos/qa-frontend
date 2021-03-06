import React from "react";
import {
  Fab,
  makeStyles,
  Container,
  Typography,
  Grid,
  Button,
  Divider,
} from "@material-ui/core";
import { Close, MenuOpen } from "@material-ui/icons";
import { localization } from "../../../lib/localization";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import { postsQueries } from "../../../graphql/queries/posts.query";
import { Category } from "../../../lib/types";
import { userQueries } from "../../../graphql/queries/user.query";

const useStyles = makeStyles((theme) => ({
  Fab: {
    position: "fixed",
    bottom: "2rem",
    right: "2rem",
    zIndex: 999,
  },
  MenuLayout: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    height: "100%",
    zIndex: 998,
  },
  LayoutLogo: {
    textDecoration: "none",
    color: "#000",
  },
  btn: {
    marginTop: "20px",
    width: "100%",
  },
  categoriesLogo: {
    marginTop: "20px",
    marginBottom: "10px",
  },
  Paper: {
    padding: "1rem 2rem",
    textAlign: "center",
  },
  LogInBtn: {
    position: "absolute",
    bottom: "1rem",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

interface BtnProps {
  open: boolean;
  setOpen: () => void;
}
function MenuBtn(props: BtnProps) {
  const classes = useStyles();
  return (
    <Fab className={classes.Fab} onClick={props.setOpen}>
      {props.open ? <Close /> : <MenuOpen />}
    </Fab>
  );
}

interface Props {}

export function Menu(props: Props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = React.useState("");

  const { data, loading, error, client } = useQuery(
    postsQueries.GET_CATEGORIES
  );

  function handleOpen() {
    setOpen(!open);
  }

  React.useEffect(() => {
    try {
      const userData = client.readQuery({
        query: userQueries.ME,
      });

      setUsername(userData.Me.profile.username);
    } catch (error) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  function Categories() {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    if (!data) return <div>Data is null</div>;

    return data.Categories.map((item: Category) => (
      <Grid item xs={4} key={item.id}>
        <Button
          variant={"contained"}
          color={"primary"}
          className={classes.Paper}
          fullWidth={true}
          component={Link}
          to={`/category/${item.id}`}
          onClick={handleOpen}
        >
          {item.title}
        </Button>
      </Grid>
    ));
  }

  function Layout() {
    return (
      <Container className={classes.MenuLayout}>
        <div className={classes.header}>
          <Link to={"/"} onClick={handleOpen} className={classes.LayoutLogo}>
            <Typography variant={"h2"}>{localization("logo")}</Typography>
          </Link>
          <div>
            {username ? (
              <Typography variant={"h5"}>{username}</Typography>
            ) : (
              <Button
                variant={"contained"}
                color={"primary"}
                component={Link}
                to={"/login"}
                onClick={handleOpen}
                className={classes.btn}
              >
                {localization("login")}
              </Button>
            )}
          </div>
        </div>
        <Divider />
        <Typography variant={"h4"} className={classes.categoriesLogo}>
          {localization("categories")}
        </Typography>
        <Grid container spacing={1}>
          {Categories()}
        </Grid>
      </Container>
    );
  }

  return (
    <React.Fragment>
      <MenuBtn open={open} setOpen={handleOpen} />
      {open && <Layout />}
    </React.Fragment>
  );
}
