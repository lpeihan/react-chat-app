import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../icon';

import './field.styl';

class Field extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  static propTypes = {
    placeholder: PropTypes.string,
    errorText: PropTypes.string,
    icon: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    inputRef: PropTypes.func,
    onInputChange: PropTypes.func
  }

  static defaultProps = {
    placeholder: 'filed',
    errorText: '',
    icon: 'phone',
    type: 'text',
    name: '',
    onInputChange: () => {}
  }

  change = (e) => {
    this.setState({ value: e.target.value });

    this.props.onInputChange(e);
  }

  clear = (e) => {
    this.setState({ value: '' });
  }

  render() {
    return (
      <div className="field">
        <div className="input-wrapper">
          <div className="left-icon">
            <Icon name={ this.props.icon } />
          </div>
          <input className="input" placeholder={ this.props.placeholder }
            name={ this.props.name }
            ref={ this.props.inputRef }
            value={ this.state.value }
            onChange={ this.change }
            type={ this.props.type }
          />
          <div className="delete-icon" onClick={ this.clear }>
            { this.state.value && <Icon name="delete" /> }
          </div>
        </div>

        <div className="error-text">
          { this.props.errorText }
        </div>
      </div>
    );
  }
}

export default Field;
