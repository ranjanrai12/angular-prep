import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectCounterState = (state: AppState) => {
  return state.counter;
};
export const selectCount = createSelector(selectCounterState, (state) => state.count);
