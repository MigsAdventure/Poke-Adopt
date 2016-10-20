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
    let newFamily = {};
    axios.post('/api/owners', pokePackage)
      .then(res => {
        console.log('API:', res);
         newFamily.owner = res.data;
      })

    axios.post('/api/pokemons', pokePackage.adoptedPokemon)
      .then(res => {
        console.log('API POKEMON: ', res);
        newFamily.pokemon = res.data;
         ServerActions.receiveAdoptedPokemon(newFamily);
      })
  },

  fetchAdoptedPokemon() {
    axios.get('/api/pokemons/adopted')
      .then(res => {
        console.log('Adopted received in API:', res);
          ServerActions.receiveAdoptedPokemon(res)
      })
  },

}
export default API;