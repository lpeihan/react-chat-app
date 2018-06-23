import React from 'react';
import names from './emoji-names';
import PropTypes from 'prop-types';

import './emojis.styl';
import png from '../../assets/images/emojis.png';

class Emojis extends React.Component {
  static propTypes = {
    select: PropTypes.func.isRequired
  }

  select = (name, e) => {
    e.stopPropagation();
    this.props.select(name);
  }

  render() {
    return (
      <div className="emojis">
        {
          names.map((name, index) => {
            return (
              <div className="emoji-item" key={ index } onClick={ this.select.bind(this, name) }>
                <div
                  className="emoji"
                  style={ {
                    backgroundImage: `url(${png})`,
                    backgroundPosition: `left ${-30 * index}px`
                  } } />
              </div>);
          })
        }
      </div>
    );
  }
}

export default Emojis;
