import {PROFILE_DATA} from '../constants';

export function profileData(profile) {
  return {
    type: PROFILE_DATA,
    payload: profile,
  };
}
