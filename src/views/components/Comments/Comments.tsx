import React from 'react';
import { GridList, GridListTile, Paper, Typography, Button, ButtonGroup, makeStyles } from '@material-ui/core';
import { localization } from '../../../lib/localization';
import AddIcon from '@material-ui/icons/Add';
import { AddCommentDrawer } from '../Drawers/AddCommentDrawer';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  paper: {
    padding: '1rem',
    height: '100%'
  },
  buttonGroup: {
    display: 'block',
    marginTop: '1rem'
  },
  newComment: {
    width: '100%',
    padding: '2rem',
    textAlign: 'center'
  }
});

interface Props {
  comments: [],
  userVoteComments: [],
  vote: (id: string, up: boolean) => void,
  createComment: (comment: string) => void
}

export function Comments(props: Props): JSX.Element {
  const classes = useStyles();
  const [commentDrawer, setCommentDrawer] = React.useState(false);

  function userVoteComment(id: string) {
    const hasVote = props.userVoteComments.findIndex((item: any) => item.id === id);
    if (hasVote !== -1) {
      return true;
    }
    return false;
  }

  function handleCommentDrawer() {
    setCommentDrawer(!commentDrawer);
  }

  function submitHandler(title: string) {
    props.createComment(title);
    handleCommentDrawer();
  }

  function RenderComments(): JSX.Element[] {
    let comments = props.comments.map((item: any) => {
      return (
        <GridListTile key={item.id}>
          <Paper className={classes.paper}>
            <Link to={`/user/${item.author.id}`}>{item.author.username}</Link>
            <Typography variant={'body1'}>{item.message}</Typography>
            <Typography variant={'caption'}>{localization('votes') + ': ' + (item.votes || 0)}</Typography>

            <ButtonGroup color={'primary'} disabled={userVoteComment(item.id)} className={classes.buttonGroup}>
              <Button color={'primary'} onClick={() => props.vote(item.id, true)}>{localization('voteUp')}</Button>
              <Button color={'secondary'} onClick={() => props.vote(item.id, false)}>{localization('voteDown')}</Button>
            </ButtonGroup>
          </Paper>
        </GridListTile>
      );
    });

    comments.unshift(
      <GridListTile key={'newComment'}>
        <Paper className={[classes.newComment, classes.paper].join(' ')} onClick={handleCommentDrawer}>
          <Typography variant={'h6'}>{localization('addComment')}</Typography>
          <AddIcon fontSize={'large'} />
        </Paper>
      </GridListTile>
    );
    return comments;
  }

  return (
    <React.Fragment>
      <AddCommentDrawer onClose={handleCommentDrawer} open={commentDrawer} submit={submitHandler} />
      <GridList cols={1}>
        {RenderComments()}
      </GridList>
    </React.Fragment>
  );
}

/* interface NewCommentProps {

}
function NewComment(props: NewCommentProps): JSX.Element {
  const classes = useStyles();
  return (
    <GridListTile key={'newComment'}>
      <Paper className={classes.newComment}>
        <Typography variant={'h6'}>{localization('addComment')}</Typography>
        <AddIcon />
      </Paper>
    </GridListTile>
  );
} */