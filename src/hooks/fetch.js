import { useDispatch, useSelector } from 'react-redux';
import { apiActions } from 'modules/api/actions';
import { selectApiState } from 'modules/api/selectors';
import camelcase from 'camelcase';

const useFetch = (endpoint) => {
  const dispatch = useDispatch();

  const apiState = useSelector(selectApiState);
  const performFetch = data => dispatch(apiActions.fetch(endpoint, data));
  const response = apiState[camelcase(endpoint)];

  return { response, performFetch };
};

export default useFetch;
