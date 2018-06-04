import React from 'react';
import {Authentication} from 'components';
import {connect} from 'react-redux';
import {loginRequest} from 'actions/authentication';
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(id, pw) {
    return this.props.loginRequest(id, pw).then(() => {
      if (this.props.status === 'SUCCESS') {
        // create session date
        const loginData = {
          isLoggedIn: true,
          username: id
        };

        document.cookie = 'key=' + btoa(JSON.stringify(loginData));

        Materialize.toast('Welcome, ' + id + '!', 2000);
        this.props.history.push('/');
        return true;
      } else {
        let $toastContent = $('<span style="color: #FFB4BA">Incorrect username or password</span>');
        Materialize.toast($toastContent, 2000);
        return false;
      }
    })
  }

  render() {
    return (
      <div>
        <Authentication mode={true} onLogin={this.handleLogin} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.authentication.login.status
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: (id, pw) => {
      return dispatch(loginRequest(id, pw));
    }
  };
};

const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhance(Login);