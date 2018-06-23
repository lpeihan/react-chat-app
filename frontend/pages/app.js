import React from 'react';
import Icon from '../icon';
import { Button } from 'antd-mobile';
import Emojis from './emojis/emojis';
import Messages from './messages/messages';
import BScroll from 'better-scroll';
import PropTypes from 'prop-types';

import './app.styl';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      input: '',
      messages: []
    };
  }

  static propTypes = {
    history: PropTypes.object
  }

  componentDidMount() {
    this.scroll = new BScroll(this.refs.messagesWrapper, {
      click: true,
      bounce: {
        top: false,
        bottom: false
      }
    });
  }

  open = (e) => {
    e.stopPropagation();

    this.selectionStart = this.refs.input.selectionStart;
    this.setState({ show: true });
  }

  close =() => {
    this.setState({ show: false });
  }

  select = (name) => {
    this.setState({
      input: this.state.input + `#(${name})`
    });
  }

  change = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  send = () => {
    const messages = this.state.messages.slice();
    messages.push(this.state.input);

    this.setState({
      input: '',
      messages
    });

    setTimeout(() => {
      this.scroll.refresh();
      this.scroll.scrollToElement(this.messagesRef.lastChild, 100);
    });
  }

  go = () => {
    this.props.history.push('/my');
  }

  render() {
    return (
      <div className="app" onClick={ this.close }>
        <div className="header">
          <div className="back">
            {/* <Icon name="back" /> */}
          </div>
          <div className="text">We are family</div>
          <div className="user" onClick={ this.go }>
            <Icon name="user" />
          </div>
        </div>

        <div className="messages-wrapper" ref="messagesWrapper">
          <Messages messages={ this.state.messages } messagesRef={ el => { this.messagesRef = el; } } />
        </div>
        <div className="bottom">
          <div className="chat-input">
            <div className="emoji-wrapper" onClick={ this.open }>
              <Icon name="emoji" />
            </div>

            <input
              ref="input"
              className="input"
              name="input"
              onChange={ this.change }
              value={ this.state.input }
            />
            <Button
              disabled={!this.state.input} type="primary" size="small" onClick={ this.send }
            >
              send
            </Button>
          </div>

          { this.state.show && <Emojis select={ this.select } />}
        </div>
      </div>
    );
  }
}

export default App;
