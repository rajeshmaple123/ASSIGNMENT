import React, { useCallback } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useDispatch, useSelector } from 'react-redux';
import { appActions } from 'modules/app/actions';
import { selectActiveFilter } from 'modules/app/selectors';

export default function ServiceMenu({ id }) {
  const dispatch = useDispatch()
  const select = useCallback(() => dispatch(appActions.filter(id)), [id, dispatch])
  const selectedFilter = useSelector(selectActiveFilter);

  return (
    <ListItem button onClick={select} selected={id === selectedFilter}>
      <ListItemText primary={id} />
    </ListItem>
  );
}
