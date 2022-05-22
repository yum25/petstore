import { combineReducers } from 'redux';
import { ADD_PET } from './types';

const INITIAL_STATE = {
  adopted: [],
  displayed: [
    'Goldfish',
    'German Shepherd',
    'Tabby',
  ],
};

const petsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    
    case ADD_PET:
      // Pulls current and possible out of previous state
      // We do not want to alter state directly in case
      // another action is altering it at the same time
      let {
        adopted: adopted,
        displayed: displayed,
      } = state;
  

      // Pull friend out of friends.possible
      // Note that action.payload === friendIndex
      const addedPet = displayed.filter((pets) => pets == action.payload);
      displayed = displayed.filter((pets) => pets != action.payload);
      
      // And put friend in friends.current
      adopted = [...adopted, ...addedPet]

      // Finally, update the redux state
      const newState = { adopted, displayed };
      
      return newState;

    default:
      return state
  }
};

export default petsReducer;