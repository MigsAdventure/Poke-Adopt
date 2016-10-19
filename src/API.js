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
}

export default API;