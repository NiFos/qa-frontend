import React from 'react';
import { Drawer, TextField, makeStyles, Typography, Button, Container } from '@material-ui/core';
import { localization } from '../../../lib/localization';

const useStyles = makeStyles({
  header: {
    marginTop: '1rem',
    marginBottom: '2rem',
  },
  button: {
    marginTop: '3rem',
    marginBottom: '10rem',
  }
});

interface Props {
  open: boolean,
  onClose: () => void,
  submit: (comment: string) => void
}

export function AddCommentDrawer(props: Props) {
  const classes = useStyles();
  const [comment, setComment] = React.useState('');

  function handleSubmit() {
    props.submit(comment);
  }

  return (
    <Drawer
      anchor={'bottom'}
      open={props.open}
      onClose={props.onClose}
    >
      <Container>
        <Typography variant={'h5'} className={classes.header}>{localization('addComment')}</Typography>
        <TextField
          multiline
          rows={10}
          variant={'outlined'}
          label={localization('comment')}
          fullWidth
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button className={classes.button} fullWidth color={'primary'} variant={'contained'} disabled={comment.length <= 0} onClick={handleSubmit}>{localization('submit')}</Button>
      </Container>
    </Drawer>
  );
}