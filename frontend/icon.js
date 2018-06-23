import React from 'react';
import PropTypes from 'prop-types';

import './styles/icon.styl';

class Icon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icons: {
        back: require('./assets/icons/back.svg'),
        emoji: require('./assets/icons/emoji.svg'),
        user: require('./assets/icons/user.svg'),
        delete: require('./assets/icons/delete.svg'),
        phone: require('./assets/icons/phone.svg'),
        password: require('./assets/icons/password.svg'),
        right: require('./assets/icons/right.svg')
      }
    };
  }

  static propTypes = {
    name: PropTypes.string.isRequired
  }

  render() {
    return (
      <i className="icon"
        dangerouslySetInnerHTML={{ __html: this.state.icons[this.props.name] }}
      >
      </i>
    );
  }
}

export default Icon;
