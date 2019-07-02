import React from 'react';
import {makeStyles} from '@material-ui/styles';
import Logo from '../images/logo.png'


const useStyles = makeStyles({
logo_img: {
  height: 100
}
})

const Header = () => {
  const classes = useStyles();
  return(
    <div className={classes.header_flex}>
      <div className={classes.logo}>
        <img src ={Logo} className={classes.logo_img}/>
        <h1 className={classes.logo_title}>Chirrup!</h1>
      </div>
    </div>
  )
}

export default Header;
