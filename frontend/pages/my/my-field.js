import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../icon';

import './my-field.styl';

class MyField extends React.Component {
  static propTypes = {
    avatar: PropTypes.string,
    text: PropTypes.string,
    name: PropTypes.string,
    rightShow: PropTypes.bool,
    onClick: PropTypes.func
  }

  static defaultProps = {
    rightShow: true
  }

  render() {
    const { avatar, text, name, rightShow, onClick } = this.props;
    return (
      <div className="my-field" onClick={ onClick }>
        <div className="left">
          <span className="name">{ name }</span>
        </div>
        <div className="right">
          {
            avatar ? <img className="avatar" src={ avatar } /> : <span className="text">{ text }</span>
          }
          { rightShow ? <Icon name="right" /> : <div className="blank" />}
        </div>
      </div>
    );
  }
}

export default MyField;
