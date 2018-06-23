import React from 'react';
import Transition from 'react-addons-css-transition-group';

import './toast.styl';

class Toast extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };
  }

  open() {
    this.setState({ show: true });

    this.timer && clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      this.close();
    }, 3000);
  }

  close() {
    this.setState({ show: false });
  }

  render() {
    const content = (
      <div className="toast">
        { this.props.children }
      </div>
    );

    return (
      <Transition
        transitionName="fade"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        { this.state.show && content }
      </Transition>
    );
  }
}

export default Toast;
