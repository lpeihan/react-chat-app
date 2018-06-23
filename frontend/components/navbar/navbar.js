import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../icon';

import './navbar.styl';

class Navbar extends React.Component {
  static propTypes = {
    title: PropTypes.string
  }

  static defaultProps = {
    title: ''
  }

  static contextTypes = {
    router: PropTypes.object
  }

  back = () => {
    history.go(-1);
  }

  render() {
    return (
      <div className="navbar">
        <div className="left" onClick={ this.back }>
          <Icon name="back" />
        </div>
        <div className="middle">
          { this.props.title }
        </div>
        <div className="right"></div>
      </div>
    );
  }
}

export default Navbar;
