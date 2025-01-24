import React from 'react';
import { createUseStyles } from 'react-jss';
import { PokemonList } from '../components';

export const ListPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <PokemonList />
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      padding: '20px',
      backgroundColor: '#f9f9f9',
      color: '#000',
      height: '100%',
      overflow: 'auto'
    },
  },
  { name: 'ListPage' }
);
