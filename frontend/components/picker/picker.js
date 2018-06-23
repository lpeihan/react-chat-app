import React from 'react';
import Transition from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './picker.styl';

class Picker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      translateY: 0
    };

    this.startY = 0;
    this.startTranslateY = 0;
    this.currentIndex = 0;
    this.height = 42;
    this.touching = false;
  }

  static propTypes = {
    options: PropTypes.array,
    onConfirm: PropTypes.func
  }

  static defaultProps = {
    options: [0, 1, 2, 3, 4, 5, 6]
  }

  open = () => {
    this.setState({ show: true });
  }

  close = () => {
    this.setState({ show: false });
  }

  setOption = () => {
    const total = this.props.options.length;

    let index = Math.round(this.state.translateY / this.height);

    index = index > 0 ? 0 : index;
    index = -index <= total - 1 ? index : -(total - 1);

    this.currentIndex = Math.abs(index);
    this.setState({ translateY: index * this.height });
  }

  selectOption = (index) => {
    this.setState({ translateY: -this.height * index });

    this.currentIndex = index;
  }

  handleTouchstart = (e) => {
    this.touching = true;
    this.startY = e.touches[0].pageY;
    this.startTranslateY = this.state.translateY;
  }

  handleTouchmove = (e) => {
    this.dy = e.touches[0].pageY - this.startY;
    this.setState({ translateY: this.dy + this.startTranslateY });
  }

  handleTouchend = (e) => {
    this.touching = false;
    this.setOption();
  }

  confirm = () => {
    this.props.onConfirm(this.props.options[this.currentIndex]);
    this.close();
  }

  render() {
    const content = (
      <div className="picker" onClick={ this.close }>
        <div className="content" onClick={ e => e.stopPropagation() }>
          <div className="header">
            <div className="cancel" onClick={ this.close }>取消</div>
            <div className="sure" onClick={ this.confirm }>确定</div>
          </div>
          <div className="main"
            onTouchStart={ this.handleTouchstart }
            onTouchMove={ this.handleTouchmove}
            onTouchEnd={ this.handleTouchend }
          >
            <div className="select"></div>
            <ul
              style={ {
                transform: `translate3d(0, ${this.state.translateY}px, 0)`,
                transition: this.touching ? '' : 'all .4s'
              } }
            >
              <li></li>
              <li></li>
              <li></li>
              {
                this.props.options.map((option, index) => <li
                  onClick={ this.selectOption.bind(this, index) }
                  key={ index }
                  className={ classnames({
                    'current': option === this.props.options[this.currentIndex],
                    'one': Math.abs(index - this.currentIndex) === 1,
                    'two': Math.abs(index - this.currentIndex) === 2,
                    'three': Math.abs(index - this.currentIndex) === 3
                  }) }
                >
                  { option }
                </li>)
              }
            </ul>
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

export default Picker;
