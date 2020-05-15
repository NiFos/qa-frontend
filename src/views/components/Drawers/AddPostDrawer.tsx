import React from 'react';
import { Drawer, TextField, makeStyles, Typography, Button, Container, Select, FormControl, InputLabel } from '@material-ui/core';
import { localization } from '../../../lib/localization';

const useStyles = makeStyles({
  header: {
    marginTop: '1rem',
    marginBottom: '2rem',
  },
  text: {
    marginTop: '1rem'
  },
  button: {
    marginTop: '3rem',
    marginBottom: '10rem',
  }
});

interface Props {
  open: boolean,
  onClose: () => void,
  categories: {
    id: string,
    title: string
  }[],
  submit: (title: string, message: string, category: string) => void
}

export function AddPostDrawer(props: Props) {
  const classes = useStyles();
  const [title, setTitle] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [category, setCategory] = React.useState('');

  function handleSubmit() {
    if (category && message && title) {
      props.submit(title, message, category);
    }
  }

  function Categories() {
    let categories = props.categories.map((item) => {
      return (
        <option value={item.id} key={item.id}>{item.title}</option>
      );
    });
    categories.unshift(
      <option value={''} key={'none'}></option>
    );
    return (
      <FormControl>
        <InputLabel htmlFor={'newPost'}>{localization('category')}</InputLabel>
        <Select
          native
          value={category}
          required
          onChange={(e) => setCategory(e.target.value as string)}
          label={localization('category')}
          inputProps={{
            name: 'category',
            id: 'newPost'
          }}
        >
          {categories}
        </Select>
      </FormControl>
    );
  }

  return (
    <Drawer
      anchor={'bottom'}
      open={props.open}
      onClose={props.onClose}
    >
      <Container>
        <Typography variant={'h5'} className={classes.header}>{localization('addPost')}</Typography>
        <TextField
          variant={'outlined'}
          label={localization('title')}
          fullWidth
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          multiline
          rows={10}
          required
          variant={'outlined'}
          label={localization('message')}
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={classes.text}
        />
        <Categories />
        <Button
          className={classes.button}
          fullWidth color={'primary'}
          variant={'contained'}
          onClick={handleSubmit}
          disabled={!category || !message || !title}
        >{localization('submit')}</Button>
      </Container>
    </Drawer>
  );
}