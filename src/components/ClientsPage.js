import React, {Component} from 'react';
import PokemonStore from '../stores/PokemonStore';
import PokemonActions from '../actions/PokemonActions';
import uuid from 'uuid';

export default class ClientsPage extends Component {
  constructor() {
    super();
    this.state = {
      adoptedPokemon: PokemonStore.getAdoptedPokemon()
    }

    this._onChange = this._onChange.bind(this);
  }

  componentWillMount(cb) {
    PokemonActions.fetchAdoptedPokemon();
    PokemonStore.startListening(this._onChange, cb);
  }

  componentWillUnmount(cb) {
    PokemonStore.stopListening(this._onChange, cb);
  }

  _onChange() {
    this.setState({
      adoptedPokemon: PokemonStore.getAdoptedPokemon()
    })
  }

  render() {
      let {adoptedPokemon} = this.state;
      console.log('THISL ', adoptedPokemon)
    return (
      <div>
        <h1>Clients Page</h1>
        {
          adoptedPokemon.map(adopted => {
            return (
                <div key={uuid()} className='col-xs-4'>
                  <img src={adopted.image} alt=""/>
                  <h2>{adopted.pokeName}</h2>
                  <h4>Owner: {adopted.ownerName}</h4>
                </div>
              )
          })
        }
        
      </div>
      )
  }
}