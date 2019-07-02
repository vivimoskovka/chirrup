import axios from 'axios'
import {Link} from 'react-router-dom';
import React from 'react'
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { InputAdornment, withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { instanceOf } from 'prop-types';
import cookie from 'react-cookies'
import SnackbarContent from '@material-ui/core/SnackbarContent';

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
  button: {
    display: 'block',
    margin: '0 auto'
  },
  textField: {
    width: 300
  },
  root: {
  maxWidth: 600,
  },
  snackbar: {
  margin: theme.spacing(1),
  },
});


class Main extends React.Component {

  constructor(props) {
      super(props);
      this.state = {value: ''};
      this.handleInputMessageChange = this.handleInputMessageChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

    };

  componentWillMount() {
   this.state =  { token: cookie.load('token') }
   let tokenkey = this.state.token
  }

  handleInputMessageChange (e) {
    this.setState({message: e.target.value});
  }

  handleSubmit (e) {
    axios.
          post(
            'http://localhost:3030/messages',
            {
              text: this.state.message,
            },
            {
              headers: {
                Authorization: this.state.token,
              }
            })
          .then(response => {
            console.log(response);
          });

    axios.
          get(
            'http://localhost:3030/messages',
            {
              headers: {
                Authorization: this.state.token,
              }
            })
            .then(response => {

              this.setState({tweets: response.data.data})
              console.log(this.state.tweets);
            });
    e.preventDefault();
  }


deleteMessage () {
  axios.
        get(
          'http://localhost:3030/messages',
          {
            headers: {
              Authorization: this.state.token,
            }
          })
}

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.main}>
      <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
        <div className={classes.message_div}>
          <TextField
            id="outlined-multiline-static"
            label="Message"
            multiline
            rows="4"
            className={classes.textField}
            value={this.state.message}
            onChange={this.handleInputMessageChange}
            margin="normal"
            variant="outlined"
          />
          <Button type='submit' variant="contained" color="primary" className='button'>
            Send
          </Button>
        </div>
        { this.state.tweets.map(tweet => {
          return (
            <SnackbarContent
              className={classes.snackbar}
              message={
                'I love candy. I love cookies. I love cupcakes. \
                I love cheesecake. I love chocolate.'
              }
              action={this.deleteMessage}
            />
          )
        })}
      </form>

      </div>
    )
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

Main = withStyles(styles)(Main);

export default Main;
