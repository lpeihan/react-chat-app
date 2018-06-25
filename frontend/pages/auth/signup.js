import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Toast } from 'antd-mobile';

import Field from '../../components/field/field';
import Navbar from '../../components/navbar/navbar';
import Icon from '../../icon';

import { signup } from '../../store/actions/auth';

import './index.styl';

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {
        username: '',
        password: '',
        passwordConfirmation: ''
      }
    };
  }

  static propTypes = {
    history: PropTypes.object,
    signup: PropTypes.func
  }

  go = () => {
    this.props.history.replace('/login');
  }

  signup = async (e) => {
    try {
      e.preventDefault();

      await this.props.signup({
        username: this.username.value,
        password: this.password.value,
        passwordConfirmation: this.passwordConfirmation.value
      });

      Toast.success('注册成功', 2);

      this.props.history.replace('/');
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
      <div className="signup">
        <Navbar title="注册" />

        <form className="form" onSubmit={ this.signup }>
          <Field
            icon="phone"
            name="username"
            placeholder="请输入用户名"
            inputRef={ el => this.username = el }
            errorText={ this.state.errors.username }
            onInputChange={ this.onInputChange }
          />
          <Field
            icon="password"
            type="password"
            name="password"
            placeholder="请输入密码"
            inputRef={ el => this.password = el }
            errorText={ this.state.errors.password }
            onInputChange={ this.onInputChange }
          />
          <Field
            icon="password"
            type="password"
            name="passwordConfirmation"
            placeholder="请确认密码"
            inputRef={ el => this.passwordConfirmation = el }
            errorText={ this.state.errors.passwordConfirmation }
            onInputChange={ this.onInputChange }
          />
          <div className="link">
            <span onClick={ this.go }>去登录<Icon name="right" /></span>
          </div>
          <button type="submit" className="btn">注册</button>
        </form>
      </div>
    );
  }
}

export default connect(null, { signup })(Signup);
