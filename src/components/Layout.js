import {Link} from 'react-router';
import React, {Component} from 'react';

export default class Layout extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
      <div className='navbar navbar-inverse navbar-fixed-left'>
         <ul className = "nav navbar-nav">
           <li><Link to='/'>Home</Link></li>
           <li><Link to='/adopt'>Adopt</Link></li>
           <li><Link to='/clients'>Clients</Link></li>
         </ul>
      </div>
        {this.props.children}
      </div>
      )
  }
}