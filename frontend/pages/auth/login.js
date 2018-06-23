import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { login } from '../../store/actions/auth';

import Field from '../../components/field/field';
import Navbar from '../../components/navbar/navbar';
import Icon from '../../icon';

import './index.styl';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {
        username: '',
        password: ''
      }
    };
  }

  static propTypes = {
    history: PropTypes.object,
    login: PropTypes.func
  }

  go = () => {
    this.props.history.replace('/signup');
  }

  login = async (e) => {
    try {
      e.preventDefault();

      await this.props.login({
        username: this.username.value,
        password: this.password.value
      });

      this.props.history.push('/');
    } catch (err) {
      this.setState({ errors: err });
    }
  }

  onInputChange = (e) => {
    this.setState({
      errors: Object.assign(this.state.errors, { [e.target.name]: '' })
    });
  }

  render() {
    return (
      <div className="login">
        <Navbar title="登录" />

        <form className="form" onSubmit={ this.login }>
          <Field
            name="username"
            icon="phone"
            placeholder="请输入用户名"
            inputRef={ el => this.username = el }
            errorText={ this.state.errors.username }
            onInputChange={ this.onInputChange }
          />
          <Field
            icon="password"
            type="password"
            placeholder="请输入密码"
            inputRef={ el => this.password = el }
            errorText={ this.state.errors.password }
            onInputChange={ this.onInputChange }
          />
          <div className="link">
            <span onClick={ this.go }>去注册<Icon name="right" /></span>
          </div>
          <button type="submit" className="btn">登录</button>
        </form>
      </div>
    );
  }
}

export default connect(null, { login })(Login);
