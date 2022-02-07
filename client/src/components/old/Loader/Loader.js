import React from 'react'
import classes from './load.module.css'


export const Loader = () => {
return(
    <div className={classes.preloader}>
    <div className={classes.preloader__row}>
      <div className={classes.preloader__item}></div>
      <div className={classes.preloader__item}></div>
    </div>
  </div>
)
}
