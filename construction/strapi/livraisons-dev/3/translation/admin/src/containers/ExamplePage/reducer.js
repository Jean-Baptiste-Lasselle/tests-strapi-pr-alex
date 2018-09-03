/*
 *
 * ExamplePage reducer
 *
 */

import { fromJS } from 'immutable';

import { LOAD_DATA, LOADED_DATA, CHANGE_LANGUAGE } from './constants';

const initialState = fromJS({
  loading: false,
  data: false,
});

function examplePageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_DATA:
      return state.set('loading', true);
      case CHANGE_LANGUAGE:
        return state.set('loading', false);
    case LOADED_DATA:
      return state.set('loading', false).set('data', fromJS(action.data));
    default:
      return state;
  }
}

export default examplePageReducer;
