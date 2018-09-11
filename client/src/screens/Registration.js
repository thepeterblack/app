import React, {Component, Fragment} from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux'
import { Input, TextLink, Button, Loading } from '../components/common';
import * as actions from '../actions';

class Registration extends Component {
  constructor(props){
    console.log("hello reg")
    super(props);
  }

  onPasswordChange = (pwd) => {
    this.props.passwordChanged(pwd);
  };

  onPasswordConfirmationChange = (pwd) => {
    console.log(this.props)
    this.props.passwordConfirmationChanged(pwd);
  };

  onEmailChange = (text) => {
    this.props.emailChanged(text);
  };

  onSignUpPress = () => {
    const { email, password, password_confirmation } = this.props;

    this.props.signUpUser(email, password, password_confirmation);
  };

  renderButton = () => {
    if (this.props.loading) {
      return (
        <Spinner
          size="large"
        />
      );
    }
    return (
      <Button
        text="Sign Up"
        onPress={this.onSignUpPress}
      />
    )
  };

  renderError = () => {
    return (
      <View style={{ backgroundColor: 'white' }}>
        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>
      </View>
    );
  };

  onShowLogin = () => {
    this.props.showLogin(true)
  };

  render() {
    const { email, password, password_confirmation } = this.props;
    const { form, section } = styles;

    return (
      <Fragment>
        <View style={form}>
          <View style={section}>
            <Input
              placeholder="user@email.com"
              label="Email"
              value={email}
              onChangeText={this.onEmailChange}
            />
          </View>

          <View style={section}>
            <Input
              secureTextEntry
              placeholder="password"
              label="Password"
              value={password}
              onChangeText={this.onPasswordChange}
            />
          </View>

          <View style={section}>
            <Input
              secureTextEntry
              placeholder="confirm password"
              label="Confirm Password"
              value={password_confirmation}
              onChangeText={this.onPasswordConfirmationChange}
            />
          </View>

          { this.renderError() }
          { this.renderButton() }
        </View>

        <TextLink onPress={this.onShowLogin}>
          Already have an account? Log in!
        </TextLink>
      </Fragment>
    );
  }
}

const styles = {
  form: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  section: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#ddd',
  },
  errorTextStyle: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red'
  }
};
const mapStateToProps = (state) => {
  const { email, password, password_confirmation, error, loading } = state.auth;
  return {
    email,
    password,
    password_confirmation,
    error,
    loading,
  }
};

export default connect(mapStateToProps, actions)(Registration);