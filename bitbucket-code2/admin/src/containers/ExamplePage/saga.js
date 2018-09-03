import { LOCATION_CHANGE } from 'react-router-redux';

import { map, omit } from 'lodash';
import { fork, put, select, call, takeLatest, take, cancel } from 'redux-saga/effects';

import request from 'utils/request';

import { loadedData } from './actions';
import { LOAD_DATA, CHANGE_LANGUAGE, DELETE_ITEM } from './constants';


export function* loadData(language) {
  // check if model language exists on database
  let modelLang = "";

  let requestData = JSON.stringify({ fields: { locale_name: language.data.loc_name, locale_code: language.data.name, currency: language.data.currency, currency_symbol: language.data.currency_symbol, currency_format: language.data.currency_format, dformat: language.data.dformat }, files: {} });
  localStorage.setItem("requestData", requestData);

  request(`/content-manager/explorer/langues/?source=content-manager`, {
    method: 'POST',
    body: localStorage.getItem("requestData"),
  }, false, false);
  localStorage.removeItem("requestData");
  //  strapi.reload();
  // update models

  const models = request(`/content-type-builder/models`, {
    method: 'GET',
  })
    .then(response => {
      console.log(response);
      // console.log(response.models.models);
      let mymodels = response.models;
      let lang = language.data.name;
      _.forEach(mymodels, modelBuilder => {
        if (modelBuilder.name !== "role" && modelBuilder.name !== "permission" && modelBuilder.name !== "user" && modelBuilder.name !== "langues") {
          request(`/content-type-builder/models/` + modelBuilder.name, {
            method: 'GET',
          })
            .then(resp => {
              console.log(resp.model);
              let modelName = resp.model.collectionName;
              let mainField = "";
              let description = "";
              let connection = "default";
              let collectionName = resp.model.collectionName;
              let attributes = resp.model.attributes;
              let attr = [];
              let translatable = false;
              //console.log(resp.model.collectionName);
              Object.keys(attributes).map((value, key) => {
                //console.log(attributes[key]);
                if (attributes[key].name.indexOf("fr_FR") != -1) {
                  console.log("translatable field found");
                  translatable = true;
                  var originFieldName = attributes[key].name.split("_");
                  var newFIeldName = "translation_" + originFieldName[1] + "_" + lang;
                  attr.push({ "name": attributes[key].name, "params": attributes[key].params });
                  attr.push({ "name": newFIeldName, "params": attributes[key].params });
                } else {
                  attr.push({ "name": attributes[key].name, "params": attributes[key].params });
                }
              });
              console.log(attr);
              attributes = attr;
              // build json here
              let data = [];

              data.push({ "name": modelName, "description": description, "mainField": mainField, "connection": connection, "collectionName": collectionName, "attributes": attributes });
              if (translatable) {
                console.log("Update model : " + modelName);
                return new Promise(resolve => {
                  const resp = request(`/translation/models/` + modelName, {
                    method: 'PUT',
                    body: JSON.stringify(data[0]),
                  }, false, false);;
                  resolve();
                });

              }
              request("/content-type-builder/strapiReload");
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            });
        }
      });
    });
}

export function* getAllModels() {
  return request(`/content-manager/models`, {
    method: 'GET',
  });
}

export function* changeDefault(locale) {
  let locale_id = locale.data;

  //find previous default language and set it to false
  const langeDef = request(`/content-manager/explorer/langues/`, {
    method: 'GET',
  }).then(results => {

    _.forEach(results, result => {
      if (result.default == true) {
        let setToFalse = JSON.stringify({ fields: { _id: result._id, locale_name: result.locale_name, __v: '0', default: 'false', id: result._id }, files: {} });
        request(`/content-manager/explorer/langues/` + result._id + `?source=content-manager`, {
          method: 'PUT',
          body: setToFalse,
        }, false, false);
      }
    });

  }).then(langRes => {
    request(`/content-manager/explorer/langues/` + locale_id, {
      method: 'GET',
    }).then(selectedLang => {
      let nameloc = selectedLang.locale_name;
      let requestData = JSON.stringify({ fields: { _id: locale_id, locale_name: nameloc, __v: '0', default: 'true', id: locale_id }, files: {} });
      request(`/content-manager/explorer/langues/` + locale_id + `?source=content-manager`, {
        method: 'PUT',
        body: requestData,
      }, false, false);

      setTimeout(() => {
        window.location.reload();
      }, 500);
    });
  });

}

export function* deleteItem(lang_id) {
  // Check if deleted Language is default  
  const deleteLang = request(`/content-manager/explorer/langues/` + lang_id.data, {
    method: 'GET',
  }).then(selectedLang => {
    // Never delete fr_FR language
    if (selectedLang.locale_code != "fr_FR") {
      if (selectedLang.default) {
        request(`/content-manager/explorer/langues/?_q=fr_FR`, {
          method: 'GET',
        }).then(defaultlg => {
          let requestData = JSON.stringify({ fields: { _id: defaultlg[0]._id, locale_code: defaultlg[0].locale_code, __v: '0', default: 'true', id: defaultlg[0]._id }, files: {} });
          request(`/content-manager/explorer/langues/` + defaultlg[0]._id + `?source=content-manager`, {
            method: 'PUT',
            body: requestData,
          }, false, false);
        });
      }
      // delete language
      request(`/content-manager/explorer/langues/` + lang_id.data, {
        method: 'DELETE',
      }).then(deletedItem => {

        const models = request(`/content-type-builder/models`, {
          method: 'GET',
        })
          .then(response => {
            let mymodels = response.models;
            _.forEach(mymodels, modelBuilder => {
              if (modelBuilder.name !== "role" && modelBuilder.name !== "permission" && modelBuilder.name !== "user" && modelBuilder.name !== "langues") {
                request(`/content-type-builder/models/` + modelBuilder.name, {
                  method: 'GET',
                })
                  .then(resp => {
                    let modelName = resp.model.collectionName;
                    let mainField = "";
                    let description = "";
                    let connection = "default";
                    let collectionName = resp.model.collectionName;
                    let attributes = resp.model.attributes;
                    let attr = [];
                    let translatable = false;
                    Object.keys(attributes).map((value, key) => {
                      if (attributes[key].name.indexOf(selectedLang.locale_code) == -1) {
                        console.log(attributes[key].name);
                        translatable = true;
                        attr.push({ "name": attributes[key].name, "params": attributes[key].params });
                      }
                    });
                    attributes = attr;
                    // build json here
                    let data = [];

                    console.log(attributes);
                    data.push({ "name": modelName, "description": description, "mainField": mainField, "connection": connection, "collectionName": collectionName, "attributes": attributes });
                    if (translatable) {
                      return new Promise(resolve => {
                        const resp = request(`/translation/models/` + modelName, {
                          method: 'PUT',
                          body: JSON.stringify(data[0]),
                        }, false, false);;
                        resolve();
                      });

                    }
                   // request("/content-type-builder/strapiReload");
                    setTimeout(() => {
                      window.location.reload();
                    }, 1000);
                  });
              }
            });
          });
      });
    }
    /*
    //console.log(selectedLang);
    // Never delete fr_FR language
    if (selectedLang.locale_code != "fr_FR") {
      //  console.log("different de fr FR");
      if (selectedLang.default) {
        //select fr_FR as default language
        request(`/content-manager/explorer/langues/?_q=fr_FR`, {
          method: 'GET',
        }).then(defaultlg => {
          //  console.log(defaultlg);
          let requestData = JSON.stringify({ fields: { _id: defaultlg[0]._id, locale_code: defaultlg[0].locale_code, __v: '0', default: 'true', id: defaultlg[0]._id }, files: {} });
          request(`/content-manager/explorer/langues/` + defaultlg[0]._id + `?source=content-manager`, {
            method: 'PUT',
            body: requestData,
          }, false, false);
          // delete language
          request(`/content-manager/explorer/langues/` + lang_id.data, {
            method: 'DELETE',
          }).then(deletedItem => {
            const models = request(`/content-manager/models`, {
              method: 'GET',
            })
              .then(response => {
                _.forEach(response.models.models, mymodel => {
                  if (mymodel.collectionName !== "langues" && mymodel.collectionName !== "tags" && mymodel.collectionName !== "contenttypes") {
                    let modelName = mymodel.collectionName;
                    let mainField = "";
                    let description = "";
                    let connection = "default";
                    let collectionName = mymodel.collectionName;
                    let attributes = mymodel.attributes;
                    let attr = [];
                    Object.keys(attributes).map((value, key) => {
                      if (value.indexOf(selectedLang.locale_code) !== -1) {
                        console.log(attributes[key]);
                        delete attributes[value];
                      }
                      //rebuild attributes data format to update the models
                      var newFIeldName = value;

                      if (value.indexOf("fr_FR") != -1) {

                        attributes[newFIeldName] = attributes[value];
                        attr.push({ "name": value, "params": attributes[value] });
                      }

                    });
                    attributes = attr;
                    // build json here
                    let data = [];

                    data.push({ "name": modelName, "description": description, "mainField": mainField, "connection": connection, "collectionName": collectionName, "attributes": attributes });
                    //  console.log(attributes);
                    request(`/content-type-builder/models/` + modelName, {
                      method: 'PUT',
                      body: JSON.stringify(data[0]),
                    }, false, false);

                  }
                });
              });
          });
        });
      } else {
        //  console.log("not Default");
        request(`/content-manager/explorer/langues/` + lang_id.data, {
          method: 'DELETE',
        }).then(deletedItem => {
          //  console.log("language deleted from content-manager");
          const models = request(`/content-manager/models`, {
            method: 'GET',
          })
            .then(response => {
              //      console.log("ffetch all models and remove the language");
              //      console.log(response);
              _.forEach(response.models.models, mymodel => {
                if (mymodel.collectionName !== "langues" && mymodel.collectionName !== "tags" && mymodel.collectionName !== "contenttypes") {
                  //         console.log(mymodel.collectionName);
                  let modelName = mymodel.collectionName;
                  let mainField = "";
                  let description = "";
                  let connection = "default";
                  let collectionName = mymodel.collectionName;
                  let attributes = mymodel.attributes;
                  let attr = [];
                  Object.keys(attributes).map((value, key) => {
                    //          console.log(value);
                    if (value.indexOf(selectedLang.locale_code) !== -1) {
                      // console.log(attributes[key]);
                      delete attributes[value];
                    }
                    //rebuild attributes data format to update the models
                    var newFIeldName = value;

                    if (value.indexOf("fr_FR") != -1) {

                      attributes[newFIeldName] = attributes[value];
                      attr.push({ "name": value, "params": attributes[value] });
                    }

                  });
                  attributes = attr;
                  // build json here
                  let data = [];

                  data.push({ "name": modelName, "description": description, "mainField": mainField, "connection": connection, "collectionName": collectionName, "attributes": attributes });
                  //      console.log("delete here");
                  request(`/translation/models/` + modelName, {
                    method: 'PUT',
                    body: JSON.stringify(data[0]),
                  }, false, false);
                }
              });
            });
        });
      }

      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
      return "This language is set as global default, can't delete it.";
    }


*/

  });
}


// Individual exports for testing
export function* defaultSaga() {
  const loadDataWatcher = yield fork(takeLatest, LOAD_DATA, loadData);
  const changeDefaultWatcher = yield fork(takeLatest, CHANGE_LANGUAGE, changeDefault);
  const deleteItemWatcher = yield fork(takeLatest, DELETE_ITEM, deleteItem);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(loadDataWatcher);
  yield cancel(changeDefaultWatcher);
  yield cancel(deleteItemWatcher);
}

// All sagas to be loaded
export default defaultSaga;
