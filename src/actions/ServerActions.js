import AppDispatcher from '../AppDispatcher';

const ServerActions = {
  receivePokemon(pokemon) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_POKEMON',
      payload: {pokemon}
    })
  },

  receiveAdoptedPokemon(adoptedPokemon) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_ADOPTED_POKEMON',
      payload: {adoptedPokemon}
    })
  }


}

export default ServerActions;