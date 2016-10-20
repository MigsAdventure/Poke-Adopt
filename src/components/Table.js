import React, {Component} from 'react';
import PokemonActions from '../actions/PokemonActions';
import PokemonStore from '../stores/PokemonStore';
import uuid from 'uuid';

export default class Table extends Component {
  constructor() {
    super();

    this.state = {
      allPokemon: PokemonStore.getAll(),
      currentPokemon: [],
      currentOwner: [],
      ownerSelect: false,
      allOwners: PokemonStore.getAdoptedPokemon()
    }

    this._onChange = this._onChange.bind(this);
    this.choosePokemon = this.choosePokemon.bind(this);
    this.adoptPokemon = this.adoptPokemon.bind(this);
    this.selectedOwner = this.selectedOwner.bind(this);
  }

  componentWillMount() {
    PokemonActions.fetchPokemon();
    PokemonActions.fetchAdoptedPokemon();
    PokemonStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    PokemonStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({
      allPokemon: PokemonStore.getAll(),
      allOwners: PokemonStore.getAdoptedPokemon()
    })
  }

  choosePokemon(pokemon) {
    this.setState({
      currentPokemon: pokemon
    })
  }

  selectedOwner (owner) {
   this.setState({
    currentOwner: owner,
    ownerSelect: true
   })

   console.log('curentOwner: ', owner.ownerName)
   console.log('ownerSelect State: ', this.state.ownerSelect)
  }

  adoptPokemon(pokemon) {
    let {ownerName, ownerPhone, ownerAddress} = this.refs;
    let {currentOwner, ownerSelect} = this.state;
    let pokePackage = {};
    if (ownerSelect === true) {
      console.log('owner selected')
      pokePackage = {
        ownerName: currentOwner.ownerName,
        ownerPhone: currentOwner.ownerPhone,
        ownerAddress: currentOwner.ownerAddress,
        adoptedPokemon: pokemon
      }
    } else {
       pokePackage = {
        ownerName: ownerName.value,
        ownerPhone: ownerPhone.value,
        ownerAddress: ownerAddress.value,
        // ownerId: idTag,
        adoptedPokemon: pokemon
        }
    }  
    // let idTag = uuid();
    // pokemon.idTag = idTag;
    
    ownerName.value = '';
    ownerPhone.value ='';
    ownerAddress.value ='';

    PokemonActions.adoptedPokemon(pokePackage);
    alert(`congrats you adopted ${pokemon.name}!`)
  }

  render() {
    console.log('state: ',this.state.currentPokemon);
    let {allPokemon, currentPokemon, allOwners} = this.state || [];
    console.log('ALLWOENRS: ', allOwners);
    return (
      <div>
        <h1>Choose a Pokemon to Adopt</h1>
          <div className={`modal fade bs-example-modal-md firstLevelModal`} tabIndex='-1' id='myModal' role='dialog' aria-labelledby='mySmallModalLabel'>
                    <div className='modal-dialog modal-md secondLevelModal' role='document'>
                      <div className='modal-content thirdLevelModal'>
                        <div className='modalPicContainer fourthLevelModal' >

                          <div className='pokemonContainer'>
                            <span>#{currentPokemon.pokeId}</span><img src={currentPokemon.image} alt='main pic' className='modalPic' />
                            <h3 className='headings title'><b>{currentPokemon.name}</b></h3>
                          </div>
                          <div className='ownerContainer'>
                            <h3>Existing Owner? Select your name!</h3>
                            <div>  
                            {
                              allOwners.map(owner => {
                                return (
                                  <button className='btn btn-primary' onClick={this.selectedOwner.bind(null, owner)} >{owner.ownerName}</button>
                                  )
                              })
                            }
                            </div>
                            <h2>Adopt {currentPokemon.name} now!</h2>
                            <h3>New Owner? Fill out the form below</h3>
                            <input type="text" ref='ownerName' placeholder='Name'/>
                            <input type="text" ref='ownerPhone' placeholder='Phone'/>
                            <input type="text" ref='ownerAddress' placeholder='Address'/>
                          </div>
                          <button className='adoptBtn btn btn-primary' onClick={this.adoptPokemon.bind(null,currentPokemon)} data-dismiss='modal'>Adopt</button>
                          <button className='delBtn btn btn-danger'  data-dismiss='modal'>UnAdopt</button>
                       </div>
                      </div>
                    </div>
                  </div>
        {
          allPokemon.map((pokemon, i) => {
            return (
            <div key={i} className='col-xs-4' onClick={this.choosePokemon.bind(null, pokemon)} data-target='#myModal' data-toggle='modal'>
              <span>#{pokemon.pokeId}</span>
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