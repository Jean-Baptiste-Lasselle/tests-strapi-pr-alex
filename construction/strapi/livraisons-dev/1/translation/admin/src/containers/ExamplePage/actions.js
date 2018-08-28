/*
 *
 * ExamplePage actions
 *
 */

import { LOAD_DATA, LOADED_DATA, SAVE_DATA, GET_ALL_MODELS, CHANGE_LANGUAGE, DELETE_ITEM } from './constants';

export function loadData(data) {
  return {
    type: LOAD_DATA,
    data,
  };
}

export function changeDefault(data) {
  return {
    type: CHANGE_LANGUAGE,
    data
  };
}

export function deleteItem(data) {
  return {
    type: DELETE_ITEM,
    data
  };
}


export function saveData() {
  return {
    type: SAVE_DATA,
  };
}

export function loadedData(data) {
  return {
    type: LOADED_DATA,
    data,
  };
}


export function getAllModels() {
  return {
    type: GET_ALL_MODELS,
  };
}
