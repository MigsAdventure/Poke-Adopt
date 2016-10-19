import React, {Component} from 'react';
import InputForm from './InputForm';
import Table from './Table';

export default class MainViewPage extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h1>
          mainViewPage
        </h1>
        <InputForm/>
        <Table/>
      </div>
      ) 
  }
}