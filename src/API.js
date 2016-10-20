import ServerActions from './actions/ServerActions';
import axios from 'axios';


const API = {
  fetchPokemon() {
    axios.get('/api/pokemons/list')
       .then(res => {
          ServerActions.receivePokemon(res);
       })
       .catch(err => { 
          console.log(err);
       })
  },

  adoptedPokemon(pokePackage) {
    axios.post('/api/owners', pokePackage)
      .then(res => {
        console.log('API:', res);
        ServerActions.receiveAdoptedPokemon(res);
      })
  },
}

export default API;