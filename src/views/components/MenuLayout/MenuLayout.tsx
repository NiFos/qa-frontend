import React from 'react';
import { Fab, makeStyles, Container, Typography } from '@material-ui/core';
import { Menu, MenuOpen } from '@material-ui/icons';

const useStyles = makeStyles({
  Fab: {
    position: 'absolute',
    bottom: '2rem',
    right: '2rem',
    zIndex: 2
  },
  MenuLayout: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#fff',
    height: '100%',
  }
});

interface BtnProps {
  open: boolean,
  setOpen: () => void
}
function MenuBtn(props: BtnProps) {
  const classes = useStyles();
  return (
    <Fab className={classes.Fab} onClick={props.setOpen}>
      {
        props.open
          ? <MenuOpen />
          : <Menu />
      }
    </Fab>
  );
}

interface Props { }

export function MenuLayout(props: Props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <MenuBtn open={open} setOpen={() => setOpen(!open)} />
      {
        open &&
        <Container className={classes.MenuLayout}>
          <Typography variant={'h2'}>
            Menu
        </Typography>

        </Container>
      }
    </React.Fragment>
  );
}