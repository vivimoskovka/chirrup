import React from 'react'
import axios from 'axios'
import cookie from 'react-cookies'

import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import {withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import SnackbarContent from '@material-ui/core/SnackbarContent';


const styles = theme => ({
  message_div:{
    display: 'block'
  },
  button: {
  margin: theme.spacing(1),
},
  input: {
    display: 'none',
  },
  main:{
    width: '60%',
    margin: '0 auto'
  },
  container: {
    width: '100%',
    margin: '0 auto',
    display: 'block',
    margin: 0,
    marginTop: 30
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
    display: 'block',
  },
  tweets:{
    clear: 'both',
    boxSizing: 'border-box'
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  button: {
    display: 'block',
    margin: '0 auto',
    marginTop: 15,
    float: 'right',
  },
  button_delete:{
    margin: 0,
    marginTop: 10,
    marginBottom: 30,
    height: 30,
    float: 'right'
  },
  textField: {
    width: '100%',
    margin: 0
  },
  root: {
  maxWidth: 600,
  },
  snackbar: {
  margin: theme.spacing(1),
  backgroundColor: '#f3f3f3',
  color: '#292d34',
  width: '100%',
  boxSizing: 'border-box',
  margin: 0,

  },
  messages: {
    marginTop: 100
  },
  createdby:{
    float: 'left',
    color: 'grey',
    fontSize: 12
  },
  createdtime: {
    fontSize: 10,
    color: 'lightgrey',
    fontStyle: 'italic'
  },
  margin: {
    marginTop: 10,
    marginBottom:10,
    float: 'right'
  }
});


class Main extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
        value: '',
        tweets: [],
        token: cookie.load('token')
      };
      this.handleInputMessageChange = this.handleInputMessageChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.refreshPage = this.refreshPage.bind(this);
      this.logOut = this.logOut.bind(this);


    };

  componentWillMount() {
      console.log(this.state.token);
   axios.get(
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
  }

  handleInputMessageChange (e) {
    this.setState({message: e.target.value});
  }

  handleSubmit (e) {
    axios.post(
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
      this.refreshPage();
    e.preventDefault();
  }

getDate (created) {
  created =typeof created==="string" ?created.slice(' ', 10):""
  return created;
}

deleteMessage (id) {
  axios.delete(
    (`http://localhost:3030/messages/`+id),
    {
    headers: {
       Authorization: this.state.token,
    }
  })
   .then(response => {
     console.log(response);
     alert('Message deleted');
   });
}

refreshPage () {
  axios.get(
    'http://localhost:3030/messages',
    {
    headers: {
       Authorization: this.state.token,
    }
  })
  .then(response => {
     this.setState({tweets: response.data.data})
  })
}

logOut() {
  cookie.remove('token');
  let path = `/`;
  this.props.history.push(path);
}

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.main}>
        <Button size="small" className={classes.margin} onClick={this.logOut}>
          Log out
        </Button>
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
          <Button type='submit' variant="contained" color="primary" className={classes.button}>
              Send
            </Button>
          </div>
        </form>
        <div className={classes.messages}>
          { this.state.tweets.map(tweet => {
            return (
              <div className={classes.tweets}>
                <SnackbarContent
                  key={tweet.id}
                  className={classes.snackbar}
                  message={tweet.text}
                />
              <p className={classes.createdby}>Created by: {tweet.user.nickname} <span className={classes.createdtime}>{this.getDate(tweet.createdAt)}</span></p>
              <Button color="secondary" className={classes.button_delete} onClick={()=> this.deleteMessage(tweet.id)}>
                Delete
              </Button>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

Main = withStyles(styles)(Main);

export default Main;
