import {PROFILE_DATA} from '../constants';

const initialState = {
  profile: {},
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_DATA:
      return {
        ...state,
        profile: action.payload,
      };
    default:
      return state;
  }
};

export default profileReducer;
