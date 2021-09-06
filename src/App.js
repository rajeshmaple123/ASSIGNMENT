import React from 'react';
import Services from "components/Services";
import Providers from "components/Providers";

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 2,
    padding: theme.spacing(4),
  }
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Services />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Providers />
      </main>
    </div>
  );
}

export default App;
