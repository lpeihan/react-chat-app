import React from 'react';
import Transition from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';

import './confirm.styl';

class Confirm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };
  }

  static propTypes = {
    text: PropTypes.string,
    onConfrim: PropTypes.func
  }

  static defaultProps = {
    text: '您确定要退出登录吗'
  }

  open = () => {
    this.setState({ show: true });
  }

  close = () => {
    this.setState({ show: false });
  }

  confirm = () => {
    this.props.onConfrim();
  }

  render() {
    const content = (
      <div className="confirm" onClick={ this.close }>
        <div className="confirm-content" onClick={ e => e.stopPropagation() }>
          <div className="main">
            <p className="text">{ this.props.text }</p>
          </div>
          <div className="footer">
            <div className="cancel-btn" onClick={ this.close }>
              取消
            </div>
            <div className="confirm-btn" onClick={ this.confirm }>
              确定
            </div>
          </div>
        </div>
      </div>
    );
    return (
      <Transition
        transitionName="popup"
        transitionEnterTimeout={ 300 }
        transitionLeaveTimeout={ 300 }
      >
        { this.state.show && content }
      </Transition>
    );
  }
}

export default Confirm;
