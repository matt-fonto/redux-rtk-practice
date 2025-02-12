# React Toolkit + Typescript

- Redux toolkit (RTK) simplifies state management in Redux by reducing boilerplate and improving developer experience

## Table of contents

- 1. [Store configuration](#store-config)
- 2. [Slices](#slices)
- 3. [Type-safe selectors](#type-safe-selectors)
  - 3.1. useSelector vs useAppSelector
- 4. [Type-safe Dispatch](#type-safe-dispatch)
- 5. [Asynchronous actions](#async-actions)
- 6. [Middleware and custom middleware](#middleware)
- 7. [Redux with React components](#redux-react-components)
- 8. [Dynamic reducers](#dynamic-reducers)
- 9. [Classes for slice management](#classes-for-slice-management)

<a id="store-config"></a>

## 1. Store configuration

- Use `configureStore` to setup rtf store.
- It automatically sets up the Redux DevTOls and includes `redux-thunk` middleware by default
- In RTF, we don't need to manually declare the shape of the store when using `configureStore`. RTF infers the store's state type automatically based on the reducer object

```js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

<a id="slices"></a>

## 2. Slices

- Self-contained piece of redux logic, including actions and reducers

```js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CounterState = {
  value: number,
};

const initialState: CounterState = { value: 0 };

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    incremenet: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
```

- `createSlice`: automatically generates action creators and the reducer
- `PayloadAction<T>`: ensures type safety for action payloads

<a id="type-safe-selectors"></a>

## 3. Type-safe selectors

- Selectors allow components to READ DATA from the Redux store

```js
import { RootState } from "./store";

export const selectCounter = (state: RootState) => state.counter.value;

// === USAGE INSIDE COMPONENT ===
import { useSelector } from "react-redux";
import { selectCounter } from "./counterSlice";

const count = useSelector(selectCounter);
```

### useSelector vs useAppSelector

- Difference revolves around `type-safety`. useAppSelector provides it.

#### useSelector

- Allows components to **select data from the store**. However, it with **no type-safety**

```js
import { useSelector } from "react-redux";

const count = useSelector((state) => state.counter.value); // ❌ No type checking
```

- TS can't infer the state type, it might throw error or require manual typing

#### useAppSelector

- To improve type-safety, it's common to create a custom hook called `useAppSelector`, which **automatically infers the `RootState` type**.

```js
import { TypedUsedSelectorHook, useSelector } from "react-redux";
import { RootState } from "./store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

Usage in a component

```js
const count = useAppSelector((state) => state.counter.value);
```

<a id="type-safe-dispatch"></a>

## 4. Type-safe Dispatch

<a id="async-actions"></a>

## 5. Asynchronous actions

<a id="middleware"></a>

## 6. Middleware and custom middleware

<a id="redux-react-components"></a>

## 7. Redux with React components

<a id="dynamic-reducers"></a>

## 8. Dynamic reducers
