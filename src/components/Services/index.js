import React, { useCallback, useEffect } from 'react';
import useFetch from 'hooks/fetch';
import { SERVICES } from 'modules/api/endpoints';
import AppBar from '@material-ui/core/AppBar';
import menuButton from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Button from "@material-ui/core/Button";
import { Toolbar } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ServiceMenu from 'components/Services/ServiceMenu';
import { MenuItem } from '@material-ui/core';


import Menu from "@material-ui/core/Menu";

const drawerWidth = 280;


const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
           
    },
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },

  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
 
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },


}));

export default function Services() {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = useCallback(() => {
    setMobileOpen(!mobileOpen);
  }, [mobileOpen]);

  const { response, performFetch } = useFetch(SERVICES);
  const { data: services, loading } = response;

  useEffect(() => {
    performFetch();
  }, []);


 
  const drawer = (
    
    <div  style={{
      marginLeft: "20%",}}>
  
      <menu
        aria-controls="simple-menu"
        aria-haspopup="true"
        
      >
        Services List
      </menu>
      <div className={classes.menuButton} />
 

      <menu >
        
        {(loading || !services)
          ? <Grid container justify="space-between" direction="column" justifyContent="flex-start" spacing={7}
          alignItems="flex-start">
            <CircularProgress />
          </Grid>
          
          : services
            .filter(({ id }, index, arr) => arr
              .findIndex(({ id: duplicateItemId }) => id === duplicateItemId) === index
            )
            .map(({ id, attributes: { name } }) => (
              <ServiceMenu key={id} id={name} />
             // <MenuItem key={id} onClick={this.handleClose}>{name}</MenuItem>
              
            ))}
      </menu>
      <Divider />
    </div>
  );



  return (
    <>
          <menu
          keepMounted
            color="primary"
            aria-label="open drawer"
            edge="true"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >

          </menu>


      <nav className={classes.drawer}  aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={() => document.body}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
              
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </>
  )

}


