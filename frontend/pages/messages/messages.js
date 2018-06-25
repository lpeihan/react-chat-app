import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './messages.styl';
import names from '../emojis/emoji-names';

class Messages extends React.Component {
  static propTypes = {
    messages: PropTypes.array.isRequired,
    messagesRef: PropTypes.func,
    user: PropTypes.object
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
            <div key={ index }
              className={ classnames('message-item', { 'self': message.user === this.props.user.id }) }>
              <div className="avatar" style={ { backgroundImage: `url(${message.user_avatar})` }} />
              <div className="text-wrap">
                <div className="arrow" />
                <p className="nickname">
                  { message.username }
                </p>
                <div className="text" dangerouslySetInnerHTML={{ __html: this.renderContent(message.content) }} />
              </div>
            </div>
          );
        }) }
      </div>
    );
  }
}

export default Messages;
