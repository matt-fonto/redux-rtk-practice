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
```
