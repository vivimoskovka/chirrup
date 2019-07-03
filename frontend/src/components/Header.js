import React from 'react';
import {makeStyles} from '@material-ui/styles';
import Logo from '../images/logo.png'
require('typeface-sniglet')


const useStyles = makeStyles({
  header: {
    height: 80,
    width: '100%',
    backgroundColor: '#3f51b4',
  },
  header_flex: {
    margin: '0 auto',
    width: '80%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  logo_img: {
    height: 40,
    marginTop: 10
  },
  logo_title: {
    margin: 0,
    color: 'white',
    fontSize: 18,
    fontWeight: 100,
    fontFamily: `Sniglet, cursive;`
  },
  header_aboutus: {
    fontWeight: 100,
    fontSize: 14,
    marginTop: 30,
  },
  header_aboutus_link: {
    textDecoration: 'none',
    color: 'white',
  }
})

const Header = () => {
  const classes = useStyles();
  return(
    <div className={classes.header}>
      <div className={classes.header_flex}>
        <div className={classes.logo}>
          <img src ={Logo} className={classes.logo_img}/>
          <h1 className={classes.logo_title}>Chirrup!</h1>
        </div>
        <h2 className={classes.header_aboutus}><a className={classes.header_aboutus_link}href='#'>About Us</a></h2>
      </div>
    </div>
  )
}

export default Header;
