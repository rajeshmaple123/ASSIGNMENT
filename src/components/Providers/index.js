import React, { useEffect, useMemo } from 'react';
import useFetch from 'hooks/fetch';
import { PROVIDERS } from 'modules/api/endpoints';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import ProfileCard from 'components/Providers/ProviderMenu';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useSelector } from "react-redux";
import { selectActiveFilter } from "modules/app/selectors";
import { BorderColor } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    marginTop: 8,
    backgroundColor: "aliceblue",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "oldlace",
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "48%",
    textAlign: "center",
    
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "oldlace",
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "48%",
    textAlign: "center",
  },
  selected: {
    backgroundColor: "coral",
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "coral",
  },
  selectedLabel: {
    color: "white",
  },
  label: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 24,
  },
  item: {
    padding: '10px',
    [theme.breakpoints.up('sm')]: {
      flexBasis: '50%'
    },
    [theme.breakpoints.down('sm')]: {
      flexBasis: '100%'
    },
    [theme.breakpoints.up('lg')]: {
      flexBasis: '33.33%'
    },
  }
}));

export default function Providers() {
  const classes = useStyles();
  const selectedService = useSelector(selectActiveFilter);
  const { response, performFetch } = useFetch(PROVIDERS)
  const { loading, data: profiles } = response;

  const filteredProfiles = useMemo(() => {
    if (!selectedService) {
      return profiles;
    }

    return profiles.filter(profile => {
      const { subspecialties = [] } = profile.attributes;

      return subspecialties.includes(selectedService);
    })
  }, [profiles, selectedService]);

  useEffect(() => {
    performFetch();
  }, []);

  if (loading || !profiles) {
    return (      
      <Grid container justify="center" direction="row"
      justifyContent="center"
      alignItems="center"
      direction="column" justifyContent="flex-start" spacing={1}
          alignItems="flex-start">
        <CircularProgress />
      </Grid>
      
    )
  }

  return (
    <div className={classes.root}>
      {filteredProfiles
        .map(profile => (
          <div key={profile.id} className={classes.item}>
            <ProfileCard
              src={profile.attributes['card-image']}
              title={profile.attributes.name}
              subSpecialties={profile.attributes.subspecialties.join(', ')}
            />
          </div>
        ))}
    </div>
  )
}
