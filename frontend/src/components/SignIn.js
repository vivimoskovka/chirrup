import axios from 'axios'
import {Link} from 'react-router-dom';
import React from 'react'
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { InputAdornment, withStyles } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { CookiesProvider } from 'react-cookie';
import backgroundImg from '../images/bg.jpg'

/*eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJ1c2VySWQiOjMsImlhdCI6MTU2MTMyNDY5NSwiZXhwIjoxNTYxNDExMDk1LCJhdWQiOiJodHRwczovL3lvdXJkb21haW4uY29tIiwiaXNzIjoiZmVhdGhlcnMiLCJzdWIiOiJhbm9ueW1vdXMiLCJqdGkiOiIwMTFhYjc5MS0zY2YyLTQwM2ItYmM5ZC1hMTU5MDZiZWNkMjEifQ.v7ZmD4N5FbDrgRmtjTwqRESEFIws2mVPHQV8JOCcLNc*/

const styles = theme => ({
  button: {
  margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 50
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
  main: {
    width: '100%',
    height: 600,
    margin:'0 auto',
    paddingTop: 30,
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: 'cover'
  },
  button: {
    display: 'block',
    margin: '0 auto',
    marginTop: 30,
  },
  textField: {
    width: 300,
    backgroundColor:'white'
  },
  signin_div: {
    paddingTop: 30,
    width: 400,
    height: 400,
    margin: '0 auto',
    borderRadius: 3,
    display: 'block',
    background: 'white'
  },
  main_title: {
    fontWeight: 100,
    marginBottom: 0,
    marginTop: 50
  },
  ballon_btn: {
    marginTop: 10
  }
});


class SignIn extends React.Component {

constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

handleEmailChange(e) {
    this.setState({email: e.target.value});
  }
handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

handleSubmit(e) {
  console.log("EMail: " + this.state.email);
  console.log("Password: " + this.state.password);
  axios.post('http://localhost:3030/authentication', {
    email: this.state.email,
    password: this.state.password,
    strategy: 'local'
  })
    .then(response => {
      console.log(response)
      if (response.status === 201) {
        let token = response.data.accessToken;
        document.cookie = `token = ${token}`;
        let cookie = document.cookie;
        let path = `/main/`;
        this.props.history.push(path);
      }
    })
    .catch(error => {
      alert(`Wrong password or email`);
    })
  e.preventDefault();
}

render() {
 const { classes } = this.props;

  return(
    <main className={classes.main}>
      <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
        <div className={classes.signin_div}>
          <TextField
           id="outlined-email-input"
           label="Email"
           className={classes.textField}
           value={this.state.email}
           onChange={this.handleEmailChange}
           type="email"
           name="email"
           autoComplete="email"
           margin="normal"
           variant="outlined"
          />
          <TextField
           id="outlined-password-input"
           label="Password"
           className={classes.textField}
           value={this.state.password}
           onChange={this.handlePasswordChange}
           type="password"
           autoComplete="current-password"
           margin="normal"
           variant="outlined"
          />
        <Button type='submit' variant="contained" color="primary" className={classes.button}>
            Sign In
          </Button>
          <h2 className={classes.main_title}>Don't have an account?</h2>
          <Button className={classes.ballon_btn} color="secondary" size="medium" component={Link} to='registration'>
            Click here
          </Button>
        </div>
      </form>
    </main>
  )
}
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

SignIn = withStyles(styles)(SignIn);

export default SignIn;
