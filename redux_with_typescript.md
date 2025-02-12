# Redux and Typescript

## Types Reducer

```jsx
state / reducers / bankReducer;
const initialState = 0;

enum ActionType {
    DEPOSIT = 'deposit',
    WITHDRAW = 'withdraw',
    RESET = 'reset'
}

type DepositAction = {
  type: ActionType.DEPOSIT,
  payload: number,
};

type WithdrawAction = {
  type: ActionType.WITHDRAW,
  payload: number,
};

type ResetAction = {
  type: ActionType.RESET
};

type Action = DepositAction | WithdrawAction | ResetAction;

const reducer = (state: number = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.DEPOSIT:
      return state + action.payload;
    case ActionType.WITHDRAW:
      return state - action.payload;
    case ActionType.RESET:
      return 0;
    default:
      return state;
  }
};

export default reducer;

state/reducers/index.ts

import {combineReducers} from 'redux'
import bankReducer from ...

const reducers = combineReducers({
    bank: bankReducer
})

export default reducers

export type AppState = ReturnType<typeof reducers>
```

## Types Actions

```jsx
// actions creators: functions that dispatch actions
state / action - creators / index.ts;
import { Dispatch } from "redux";
// import {Action}...

const depositMoney = (amount: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.DEPOSIT,
      payload: amount,
    });
  };
};

const withdrawMoney = (amount: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.WITHDRAW,
      payload: amount,
    });
  };
};

const resetMoney = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.RESET,
    });
  };
};

state / store;
// import reducers
import thunk from "redux-thunk";

export const store = createStore({
  reducers,
  {}, // initial state
  applyMiddleware(thunk)
});

// src/App.tsx
import {bindActionCreators} from 'redux'
import {actionCreators} from './state'

function App(){
    const dispatch = useDispatch()
    const amount = useSelector((state: AppState) => state.bank)

    const {depositMoney, withdrawMoney, resetMoney} = bindActionCreators(actionCreators, dispatch)

    return (
        <div>
            <h2>{amount}</h2>
            <button
                onClick={() => depositMoney(1000)}
            >Deposit</button>
            <button
                onClick={() => withdrawMoney(1000)}
            >Withdraw</button>
            <button
                onClick={() => resetMoney()}
            >Reset</button>
        </div>
    )
}


```
