/*
 *
 * ExamplePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, FormattedMessage } from 'react-intl';
import { bindActionCreators, compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import request from 'utils/request';

import Button from 'components/Button';
import InputText from 'components/InputText';
import List from 'components/List';

import styles from './styles.scss';
import { loadData, getAllModels, changeDefault, deleteItem } from './actions';
import { makeSelectLoading, makeSelectData } from './selectors';
import reducer from './reducer';
import saga from './saga';



export class ExamplePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loc_name: '',
      name: '',
      currency: '',
      currency_symbol: '',
      currency_format: '',
      dformat: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
  }

  componentDidMount() {

    if (localStorage.getItem("modelExist")) {
      request(`/content-manager/explorer/langues?source=content-manager`, {
        method: 'GET',
      }, false, false).then(response => {
        console.log(response);
        this.setState({ langueDispo: response });
      });

    } else {
      let dataLanguageModel = '{"name":"Langues","description":"","mainField":"","connection":"default","collectionName":"langues","attributes":[{"name":"locale_name","params":{"type":"string"}},{"name":"locale_code","params":{"type":"string"}},{"name":"currency","params":{"type":"string"}},{"name":"currency_symbol","params":{"type":"string"}},{"name":"currency_format","params":{"type":"string"}},{"name":"dformat","params":{"type":"enumeration", "enum": ["dd-mm-yyyy","mm-dd-yyyy", "yyyy-mm-dd", "yyyy-dd-mm"]}},{"name":"default","params":{"type":"boolean"}}]}'
      request(`/content-type-builder/models/`, {
        method: 'POST',
        body: JSON.parse(dataLanguageModel),
      }, true, true).then(response => {
        console.log(response);
        let requestData = JSON.stringify({ fields: { locale_name: "Français", locale_code: "fr_FR", currency: "EUR", currency_symbol: "€", currency_format: "0,00", dformat: "dd-mm-yyyy", default: true }, files: {} });
        localStorage.setItem("requestData", requestData);
        request(`/content-manager/explorer/langues/?source=content-manager`, {
          method: 'POST',
          body: localStorage.getItem("requestData"),
        }, false, false).then(response => {
          localStorage.removeItem("requestData");
          localStorage.setItem("modelExist", true);
          setTimeout(() => {
            window.location.reload();
          }, 300);
        });

      });
    }

  }

  handleChange(event) {
    //console.log(event.target);
    const { name, value } = event.target;
    this.setState({ [name]: value });
    //this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    //console.log(this.state);
    this.props.loadData(this.state);
    event.preventDefault();

  }

  handleClick(event) {
    this.props.changeDefault(event.target.id);

    event.preventDefault();
  }

  getLanguages(langue) {
    let lg = [];
    try {
      Object.keys(langue).map((key, value) => {
        if (langue[key].locale_name == "fr_FR" && langue[key].default) {
          lg.push({ "id": langue[key]._id, "loc_name": langue[key].locale_name, "name": langue[key].locale_code, "currency": langue[key].currency, "currency_symbol": langue[key].currency_symbol, "currency_format": langue[key].currency_format, "dformat": langue[key].dformat, "set_default": "btn btn-outline-primary disabled", "enable": "btn btn-outline-danger disabled" });
        } else if (langue[key].locale_name == "fr_FR" && !langue[key].default) {
          lg.push({ "id": langue[key]._id, "loc_name": langue[key].locale_name, "name": langue[key].locale_code, "currency": langue[key].currency, "currency_symbol": langue[key].currency_symbol, "currency_format": langue[key].currency_format, "dformat": langue[key].dformat, "set_default": "btn btn-primary", "enable": "btn btn-outline-danger disabled" });
        } else if (langue[key].locale_name !== "fr_FR" && langue[key].default) {
          lg.push({ "id": langue[key]._id, "loc_name": langue[key].locale_name, "name": langue[key].locale_code, "currency": langue[key].currency, "currency_symbol": langue[key].currency_symbol, "currency_format": langue[key].currency_format, "dformat": langue[key].dformat, "set_default": "btn btn-outline-primary disabled", "enable": "btn btn-danger" });
        } else {
          lg.push({ "id": langue[key]._id, "loc_name": langue[key].locale_name, "name": langue[key].locale_code, "currency": langue[key].currency, "currency_symbol": langue[key].currency_symbol, "currency_format": langue[key].currency_format, "dformat": langue[key].dformat, "set_default": "btn btn-primary", "enable": "btn btn-danger" });
        }
      });
      return lg;
    } catch (error) {
      console.log("error object keys");
    }
  }


  deleteRecord(event) {
    this.props.deleteItem(event.target.id);
    event.preventDefault();
  }

  generateDataBlock() {
    let languesDispo = this.state.langueDispo;
    let lang = this.getLanguages(languesDispo);
    if (lang) {
      console.log(lang);
      const items = lang.map((item, i) => <tr key={i}><td>{item.loc_name}</td><td>{item.name}</td><td>{item.currency}</td><td>{item.currency_symbol}</td><td>{item.currency_format}</td><td>{item.dformat}</td><td><button className={item.set_default} name={item.name} id={item.id} onClick={this.handleClick} > Set as default </button></td><td><button className={item.enable} id={item.id} onClick={this.deleteRecord} > Delete </button></td></tr>);
      return (
        <tbody>
          {items}
        </tbody>
      );
    }
    return;
  }

  render() {
    // Generate the data block
    const dataBlock = this.generateDataBlock();

    const { loc_name, name, currency, currency_symbol, currency_format, dformat } = this.state;
    return (
      <div className="examplePage">
        <div className="row col-md-12">
          <div className="col-md-12">
            <form onSubmit={this.handleSubmit} className="form-group">
              <div className="row">
                <div className="col-md-2">
                  <label>Add Language Name</label>
                  <input type="text" placeholder="Français" className="form-control" name="loc_name" value={loc_name} onChange={this.handleChange} />
                </div>
                <div className="col-md-2">
                  <label>Add Language Code</label>
                  <input type="text" placeholder="fr_FR" className="form-control" name="name" value={name} onChange={this.handleChange} />
                </div>
                <div className="col-md-2">
                  <label>Add Currency</label>
                  <input type="text" placeholder="EUR" className="form-control" name="currency" value={currency} onChange={this.handleChange} />
                </div>
                <div className="col-md-2">
                  <label>Add Currency Symbol</label>
                  <input type="text" placeholder="€" className="form-control" name="currency_symbol" value={currency_symbol} onChange={this.handleChange} />
                </div>
                <div className="col-md-2">
                  <label>Add Currency Format</label>
                  <input type="text" placeholder="0,00" pattern="^(?=.)(\d{1,3}(,\d{1,3})*)?(\.\d+)?$" className="form-control" name="currency_format" value={currency_format} onChange={this.handleChange} />
                </div>
                <div className="col-md-2">
                  <div className="form-group">
                    <label htmlFor="dformat">Date Format:</label>
                    <select className="form-control" id="dformat" name="dformat" onChange={this.handleChange} required> 
                      <option>Choose your date format</option>
                      <option value="dd-mm-yyyy">dd-mm-yyyy</option>
                      <option value="mm-dd-yyyy">mm-dd-yyyy</option>
                      <option value="yyyy-mm-dd">yyyy-mm-dd</option>
                      <option value="yyyy-dd-mm">yyyy-dd-mm</option>
                    </select>
                  </div>
                </div>
              </div>
                <div className="col-md-12">
                  <button id="app.components.Button.save" type="submit" className="btn btn-primary"> Submit  </button>
                </div>
            </form>
          </div>
        </div>
        <div className="col-md-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Locale name</th>
                <th scope="col">Locale code</th>
                <th scope="col">Currency Code</th>
                <th scope="col">Currency Symbole</th>
                <th scope="col">Currency Format</th>
                <th scope="col">Date Format</th>
                <th scope="col">Set as Default</th>
              </tr>
            </thead>

            {dataBlock}

          </table>
        </div>
      </div>
    );
  }
}

ExamplePage.contextTypes = {
  router: PropTypes.object,
};

ExamplePage.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]).isRequired,
  loadData: PropTypes.func.isRequired,
  getAllModels: PropTypes.func.isRequired,
  changeDefault: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      loadData,
      getAllModels,
      changeDefault,
      deleteItem
    },
    dispatch,
  );
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  data: makeSelectData(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'examplePage', reducer });
const withSaga = injectSaga({ key: 'examplePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(injectIntl(ExamplePage));
