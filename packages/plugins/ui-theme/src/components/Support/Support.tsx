/* eslint-disable verdaccio/jsx-no-style */

/* eslint-disable react/jsx-max-depth */

/* eslint-disable react/jsx-pascal-case */
import { Link } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';

const title = 'NO POLITICS';

const links = [
  {
    href: 'https://www.rt.com',
    text: 'RT',
  },
  {
    href: 'http://www.kremlin.ru/',
    text: 'Kremlin',
  },
  {
    href: 'https://xn--b1agazb5ah1e.xn--p1ai/',
    text: 'МЫ ВМЕСТЕ',
  },
];

const Support = () => {
  const linkElements = links.map((link) => (
    <li key={link.text}>
      <Link href={link.href} target="_blank">
        <Typography>{link.text}</Typography>
      </Link>
    </li>
  ));

  return (
    <>
      <Grid container={true} spacing={2}>
        <Grid item={true} xs={12}>
          <Typography component="h2" variant="h6">
            {title}
          </Typography>
        </Grid>
        <Grid item={true} lg={12} xs={12}>
          <span style={{ fontStyle: 'italic', fontSize: '0.75rem' }}>
            <Typography>
              {`NO POLITICS in Free Software`}
            </Typography>
          </span>
          <ul style={{ padding: '10px 0' }}>{linkElements}</ul>
          <div>
            <Typography variant="div">{`Spread the voice, make the difference today.`}</Typography>
          </div>
          <div style={{ padding: '10px 0', fontWeight: 600 }}>
            <Typography variant="div">{`Russian Verdaccio`}</Typography>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Support;
