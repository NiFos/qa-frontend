import React from 'react';
import { Typography } from '@material-ui/core';
import { localization } from '../../lib/localization';

interface Props { }
export function PcPage(props: Props) {
  return (
    <div>
      <Typography
        variant={'h2'}
        align={'center'}
      >
        {localization('pcUnsupported')}
      </Typography>
    </div>
  );
}