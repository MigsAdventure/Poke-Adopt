import AppDispatcher from '../AppDispatcher';

const ServerActions = {
  receivePokemon(pokemon) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_POKEMON',
      payload: {pokemon}
    })
  },


}

export default ServerActions;