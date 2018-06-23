import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default function (ComposedComponent) {
  class Auth extends React.Component {
    static propTypes = {
      isAuth: PropTypes.bool.isRequired
    }

    static contextTypes = {
      router: PropTypes.object.isRequired
    }

    componentWillMount() {
      if (!this.props.isAuth) {
        this.context.router.history.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuth) {
        nextProps.history.push('/login');
      }
    }

    render() {
      return (
        <ComposedComponent { ...this.props } />
      );
    }
  }

  const mapStateToProps = state => {
    return {
      isAuth: state.auth.isAuth
    };
  };

  return connect(mapStateToProps)(Auth);
}
