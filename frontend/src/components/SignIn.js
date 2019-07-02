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
    width: '80%',
    margin:'0 auto',
    paddingTop: 30,
    display: 'flex',
    flexDiraction: 'space-between'
  },
  signin: {
    paddingTop: 30,
    width: 400,
    height: 400,
    margin: '0 auto',
    border: '1px solid lightgrey',
    borderRadius: 3,
    display: 'block'
  },
  registration: {
    paddingTop: 30,
    width: 400,
    height: 400,
    margin: '0 auto',
    border: '1px solid lightgrey',
    borderRadius: 3,
    display: 'block'
  },
  button: {
    display: 'block',
    margin: '0 auto'
  },
  textField: {
    width: 300
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
      } else {
        console.log('wrong email or password');
      }

    });
  e.preventDefault();
}

render() {
 const { classes } = this.props;

  return(
    <main className={classes.main}>
    <h2 className={classes.main.title}>Don't have an account?</h2>
    <Button className={classes.ballon_btn} color="secondary" size="medium" component={Link} to='registration'>
      Click here
    </Button>
      <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
        <div className={classes.registration_div}>
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
          <Button type='submit' variant="contained" color="primary" className='button'>
            Sign In
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
