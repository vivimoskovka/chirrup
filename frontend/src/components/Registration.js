import axios from 'axios'
import React from 'react'
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import backgroundImg from '../images/bg.jpg'


const styles = theme => ({
  button: {
  margin: 5,
  marginTop: 30,
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
    marginLeft: 5,
    marginRight: 5,
  },
  dense: {
    marginTop: 5,
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
  registration_div: {
    paddingTop: 30,
    width: 400,
    height: 400,
    margin: '0 auto',
    borderRadius: 3,
    display: 'block',
    background: 'white'
  },
  button: {
    display: 'block',
    margin: '0 auto',
    marginTop: 30
  },
  textField: {
    width: 300
  }
});

class Registration extends React.Component {

constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleNicknameChange = this.handleNicknameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}


handleEmailChange(e) {
    this.setState({email: e.target.value});
  }
handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

handleNicknameChange(e) {
    this.setState({nickname: e.target.value});
  }

handleSubmit(e) {
  console.log("EMail: " + this.state.email);
  console.log("Password: " + this.state.password);
  axios.post('http://localhost:3030/users', {
    email: this.state.email,
    password: this.state.password,
    nickname: this.state.nickname
  })
    .then(response => {
      console.log(response)
      if (response.status === 201) {
        alert('Congratulations! Wellcome to our community')
        let path = `/`;
        this.props.history.push(path);
      }
    })
  e.preventDefault();
}

render() {
 const { classes } = this.props;

  return(
    <main className={classes.main}>
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
          <TextField
          id="outlined-with-placeholder"
          label="Nickname"
          placeholder="Nickname"
          className={classes.textField}
          value={this.state.nickname}
          onChange={this.handleNicknameChange}
          margin="normal"
          variant="outlined"
          />
        <Button type='submit' variant="contained" color="primary" className={classes.button}>
            Sign Up
          </Button>
        </div>
      </form>
    </main>
  )
}
}

Registration.propTypes = {
  classes: PropTypes.object.isRequired,
};

Registration = withStyles(styles)(Registration);

export default Registration;
