import React, {Component} from 'react';
import PokemonActions from '../actions/PokemonActions';
import PokemonStore from '../stores/PokemonStore';

export default class Table extends Component {
  constructor() {
    super();

    this.state = {
      allPokemon: PokemonStore.getAll(),
      currentPokemon: []
    }

    this._onChange = this._onChange.bind(this);
    this.choosePokemon = this.choosePokemon.bind(this);
  }

  componentWillMount() {
    PokemonActions.fetchPokemon();
    PokemonStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    PokemonStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({
      allPokemon: PokemonStore.getAll()
    })
  }

  choosePokemon(pokemon) {
    this.setState({
      currentPokemon: pokemon
    })
  }

  render() {
    console.log('state: ',this.state.currentPokemon);
    let {allPokemon, currentPokemon} = this.state || [];
    return (
      <div>
        <h1>Choose a Pokemon to Adopt</h1>
          <div className={`modal fade bs-example-modal-md firstLevelModal`} tabIndex='-1' id='myModal' role='dialog' aria-labelledby='mySmallModalLabel'>
                    <div className='modal-dialog modal-md secondLevelModal' role='document'>
                      <div className='modal-content thirdLevelModal'>
                        <div className='modalPicContainer fourthLevelModal' >

                          <div className='animeInfoContainer'>
                            <img src={currentPokemon.image} alt='main pic' className='modalPic' />
                            <h3 className='headings title'><b>{currentPokemon.name}</b></h3>
                          </div>
                          <button className='delBtn btn btn-danger'  data-dismiss='modal'>UnAdopt</button>
                       </div>
                      </div>
                    </div>
                  </div>
        {
          allPokemon.map((pokemon, i) => {
            return (
            <div key={i} className='col-xs-4' onClick={this.choosePokemon.bind(null, pokemon)} data-target='#myModal' data-toggle='modal'>
              <img src={pokemon.image}/>
              <h3>{pokemon.name}</h3>
            </div>
              )
          })
        }
      </div>
      )
    }
  }