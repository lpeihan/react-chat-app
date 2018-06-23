import React from 'react';
import PropTypes from 'prop-types';

import './messages.styl';
import names from '../emojis/emoji-names';

class Messages extends React.Component {
  static propTypes = {
    messages: PropTypes.array.isRequired,
    messagesRef: PropTypes.func
  }

  renderContent(text) {
    return text.replace(/#\(([\u4e00-\u9fa5a-z]+)\)/g, (res, e) => {
      const index = names.indexOf(e);

      if (index > -1) {
        return (
          `<div class="msg-emoji" style="background-position: left ${-30 * index}px"></div>`
        );
      }
      return res;
    });
  }

  render() {
    return (
      <div className="messages" ref={ this.props.messagesRef }>
        { this.props.messages.map((message, index) => {
          return (
            <div key={ index } className="message-item">
              <div className="avatar" />
              <div className="text-wrap">
                <div className="arrow" />
                <p className="nickname">
                  我是梁梅红宝宝呀🍒🍒🍒
                </p>
                <div className="text" dangerouslySetInnerHTML={{ __html: this.renderContent(message) }} />
              </div>
            </div>
          );
        }) }
      </div>
    );
  }
}

export default Messages;
