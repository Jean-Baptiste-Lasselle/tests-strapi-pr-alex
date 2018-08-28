/**
*
* InputText
* Customization
*   - deactivateErrorHighlight: bool
*     allow the user to remove bootstrap class 'has-danger' on the inputText
*   - customBootstrapClass : string
*     overrides the default 'col-md-6' on the inputText
*   - handleBlur: function
*     overrides the default input validations
*   - errors : array
*   - noErrorsDescription : bool
*     prevent from displaying errors messages
*
* Required
*  - name : string
*  - handleChange : function
*  - value : string
*  - target : string
*  - validations : object
*
* Optionnal
* - description : input description
* - handleFocus : function
* - placeholder : string if set to "" nothing will display
*
* - styles are retrieved from the HOC
*/

import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, includes, mapKeys, reject, map, isObject, union, findIndex, uniqBy, size } from 'lodash';
import WithInput from 'components/WithInput';

/* eslint-disable react/require-default-props  */
class InputText extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      hasInitialValue: false,
    };
  }

  componentDidMount() {
    if (this.props.value && !isEmpty(this.props.value)) {
      this.setState({ hasInitialValue: true });
    }
  }

  handleChange = (e) => {
    let value = e.target.value;
  }

  renderErrors = () => { // eslint-disable-line consistent-return
    if (!this.props.noErrorsDescription) {
      return (
        map(this.state.errors, (error, key) => {
          const displayError = isObject(error) && error.id;
          return (
            <div key={key} className="form-control-feedback invalid-feedback" style={{marginBottom: '1.8rem', fontSize: '1.3rem' }}>{displayError}</div>
          );
        })
      );
    }
  }

  render() {
    // override bootStrapClass
    const bootStrapClass = this.props.customBootstrapClass ? this.props.customBootstrapClass : 'col-md-6';
    // set error class with override possibility
    const bootStrapClassDanger = !this.props.deactivateErrorHighlight && !isEmpty(this.state.errors) ? 'has-danger' : '';

    const label = this.props.name ? <label htmlFor={this.props.name}>{this.props.name}</label> : '';
    const spacer = !this.props.name ? {marginTop: '2.4rem'} : {marginTop: ''};
    const marginBottomInput = isEmpty(this.state.errors) ? '4.3rem' : '2.4rem';
    const input = 
        <input
          name={this.props.name}
          id={this.props.name}
          onChange={this.handleChange}
          type="text"
          className={`form-control ${!isEmpty(this.state.errors) ? 'form-control-danger is-invalid' : ''}`}
          style={{marginBottom: marginBottomInput }}
        />
      ;

    //const requiredClass = this.props.validations.required && this.props.addRequiredInputDesign ? this.props.styles.requiredClass : '';
    let marginTopSmall = this.props.inputDescription ? '-3rem' : '-1.5rem';
    if (!isEmpty(this.state.errors) && this.props.inputDescription) marginTopSmall = '-1.2rem';
    return (
      <div className={`${this.props.styles.inputText} ${bootStrapClass} ${bootStrapClassDanger}`} style={spacer}>
        {label}
        {input}
        <small style={{ marginTop: marginTopSmall }}>{this.props.inputDescription}</small>
        {this.renderErrors()}
      </div>
    );
  }
}

InputText.propTypes = {
  addRequiredInputDesign: PropTypes.bool,
  customBootstrapClass: PropTypes.string,
  deactivateErrorHighlight: PropTypes.bool,
  errors: PropTypes.array,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  handleFocus: PropTypes.func,
  inputDescription: PropTypes.string,
  name: PropTypes.string,
  noErrorsDescription: PropTypes.bool,
  styles: PropTypes.object,
  target: PropTypes.string,
  validations: PropTypes.object,
  value: PropTypes.string,
};

export default WithInput(InputText); // eslint-disable-line new-cap
