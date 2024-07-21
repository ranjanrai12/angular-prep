import { createReducer, on } from '@ngrx/store';
import { decrement, increment, reset } from './counter-action';

export interface CounterState {
  count: number;
}

export const initialCountState: CounterState = {
  count: 0
};

export const counterReducer = createReducer(
  initialCountState,
  on(increment, (state) => {
    return { ...state, count: state.count + 1 };
  }),
  on(decrement, (state) => {
    if (state.count > 0) {
      return { ...state, count: state.count - 1 };
    }
    return { ...state, count: 0 };
  }),
  on(reset, (state) => ({ ...state, count: 0 }))
);
