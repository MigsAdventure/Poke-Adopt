import {EventEmitter} from 'events';
import AppDispatcher from '../AppDispatcher';

let _allPokemon = [];
let _adoptedPokemon = [];

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

        case 'RECEIVE_ADOPTED_POKEMON': {
          console.log('WHS', payload.adoptedPokemon.data)
           let poke = payload.adoptedPokemon.data.map((adopted, i) => {
              let adopt = 
               {
                pokeName: adopted.name,
                ownerName: adopted.ownerName,
                image: adopted.image,
                ownerId: adopted.ownerId,
                ownerAddress: adopted.ownerAddress,
                ownerPhone: adopted.ownerPhone
              }
              return adopt;
            })
          _adoptedPokemon = poke;
          this.emit('CHANGE');
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

  getAdoptedPokemon() {
    return _adoptedPokemon;
  }


}

export default new PokemonStore();