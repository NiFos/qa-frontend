import React from 'react';
import { Container } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

interface Props { }

export function Loading(props: Props) {
  return (
    <Container>
      <Skeleton animation={'wave'} width={'100%'} />
      <Skeleton animation={'wave'} width={'100%'} />
      <Skeleton animation={'wave'} width={'100%'} />
      <Skeleton animation={'wave'} width={'100%'} />
      <Skeleton animation={'wave'} width={'100%'} />
    </Container>
  );
}