import {EventEmitter} from 'events';
import AppDispatcher from '../AppDispatcher';

let _allPokemon = [];

class PokemonStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      let {payload, type} = action;
      switch(type) {
        case 'RECEIVE_POKEMON': {
          let pokeList = payload.pokemon.data.results.map((pokemon, i) => {
            let test = 
             {
              name: pokemon.name,
              pokeId: (i+1),
              image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i+1}.png`
            }
            return test;
          })
          _allPokemon = pokeList;
          this.emit('CHANGE')
        }break;

      }//end of switch
    })//end of appDispatcher
  }//end of constructor

  startListening(cb) {
    this.on('CHANGE', cb);
  }

  stopListening(cb) {
    this.removeListener('CHANGE', cb);
  }

  getAll() {
    return _allPokemon;
  }


}



export default new PokemonStore();