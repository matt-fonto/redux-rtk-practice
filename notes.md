- State management library
- It allows global states

[React Redux Toolkit Query Tutorial and RTK Query CRUD Example App](https://www.youtube.com/watch?v=HyZzCHgG3AY&t)

## Concepts

- Redux is the original global-state manager for React
- Redux Toolkit should be the standard way to write Redux
- Redux pattern is to have a single store for the whole application
- store: the global state, which is accessible across any component
  - the store is made up of slices

## Workflow

1. Create the store

```jsx
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
```

2. Create the slice

```jsx
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  // actions in this slice
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
  },
});

// export actions and reducers
export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
```

3. Connect React to the store

```jsx
...
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);

```

4. Dispatch actions in components

```jsx
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "./counterSlice";
import { AppState } from "../../store/store";

export function Counter() {
  const count = useSelector((state: AppState) => state.counter.count);
  const dispatch = useDispatch(); // we pass the actions inside the dispatch

  return (
    <div>
      <p>{count}</p>

      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
      </div>
    </div>
  );
}
```

```jsx
type CounterStore = {
  value: number,
};

type UserStore = {
  isSignedIn: boolean,
};
```

- actions: what it should do to the state
  - an action is composed of TYPE and PAYLOAD

```jsx
const increment = { type: "INCREMENT", payload: 1 };
const decrement = { type: "DECREMENT", payload: 1 }; // Payload: any data we want to send
```

- reducers: take an action and make the updates in the store
  - We aren’t allowed to change the state directly
  - We take the complete previous state, and create a copy of it with the new values
  - Follow the concept of immutability (functional programming)

### Slices vs API → createSlice vs. createApi

- createSlice
  - Manages pieces of states, similar to useState, but globally accessible across the app
  - Defines initial state
  - Creates actions and reducers
  - Manages client-side state
  ```jsx
  const counterSlice = createSlice({
    name: "counter",
    initialState: { value: 0 },
    reducers: {
      increment: (state) => {
        state.value += 1;
      },
      decrement: (state) => {
        state.value -= 1;
      },
    },
  });
  export const { increment, decrement } = counterSlice.actions;
  ```
- createApi

  - Automates fetching, caching, and state management for server-side data
  - Automatically generates hooks for operations

    - Query: retrieves data

      - Automatically caches the response
      - Tracks loading, error and success states
      - Refetches data when needed (e.g., cache is invalidated)

      ```jsx
      endpoints: (builder) => ({
        getUsers: builder.query<User[], void>({
          query: () => "/users", // Defines the endpoint to call
        }),
      }),

      // usage
      const {data, isLoading, error} = useGetUsersQuery();
      ```

    - Mutation: modifies data (create, delete, update)

      ```jsx
      endpoints: (builder) => ({
        createUser: builder.mutation<User, Partial<User>>({
          query: (user) => ({
            url: "/users",
            method: "POST",
            body: user,
          }),
        }),
      }),

      // usage
      const [createUser, {isLoading, error}] = useCreateUserMutation();

      ```

  - Handles state for loading, success, and error cases
  - Caches data and automatically refetches when needed
  - Provides features such as optimistic updates, polling, and invalidation
  - When using createApi, we don’t need to use createAsyncThunk, nor use extraReducers
    - No need to define `createAsyncThunk` or `extraReducers` explicitly.
    - For most API Interactions, `createApi` is preferred over `createAsyncThunk + extraReducers`

### Query caching and Refetching?

### Optimistic Update

### Cache invalidation

## Step by Step

1. Create the store

```jsx
src / state / store.ts;

import { configureStore } from "@reduxjs/toolkit";
// import counterSlice reducer

export const store = configureStore({
  // import the reduce from the slice we created on step 3
  reducer: {
    counter: counterReducer, // connect the slice to the store
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

1. Connect React to the store

```jsx
src / main.jsx;

import { Provider } from "react-redux";
// import store

<Provider store={store}>
  <App />
</Provider>;
```

1. Using the state

```jsx
src/state/counter/counterSlice.ts

import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";

type CounterState = {
	value: number;
}

const initialState: CounterState = {
	value: 0;
}

const counterSlice = createSlice({
	name: "counter",
	initialState,
	// these are our reducers
	reducers: {
		// takes two params: state, action(optional)
		increment: (state, action) => {
		// even though in this code, it seems we're changing the state directly
		// (thus breaking the immutability concept), createSlice from toolkit
		// does the copying of the states behind the scenes
		// so, actually, in this code, we're respecting the immutability principle
		// thanks to createSlice from toolkit
			state.value += 1
		},
		decrement: (state) => {
			state.value -= 1
		},
		incrementByAmount: (state, action: PayloadAction<number>) => {
			state.value += action.payload
		}
	},
	// async reducers
	extraReducers: (builder) => {
		builder
			.addCase(incrementAsync.fulfilled, (state, action:Payload<number>) => {
			state.value += action.payload
		})
			.addCase(incrementAsync.pending, (state) => {
				console.log('incrementAsync.pending', state)
			}
	}
})

/*
createAsyncThunk(
	"name",
	callback
)
*/

// With async functions, we need:
// 1. Give them a name
// 2. Declare the action first, then create the reducers
export const incrementAsync = createAsyncThunk(
	"counter/incrementAsync", // name
	async (amount:number) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		return amount;
	}
)

export const {increment, decrement, incrementByAmount} = counterSlice.actions;

export default counterSlice.reducer;
```

1. Using our actions

```jsx
import {useSelector, useDispatch } from "react-redux"
// import the AppState from the store
// import the actions from the slice

export function Counter(){
	const {count} = useSelector((state:AppState) => state.counter.value)
	const dispatch = useDispatch<AppDispatch>(); // we call the dispatch hook and pass the actions from the slice to it

	return (
		<div>
			<h2>count: {count}</h2>

			<div>
				<button onClick={() => dispatch(increment())}>increment</button>
				<button onClick={() => dispatch(incrementAsync(10))}>increment async</button>
				<button onClick={() => dispatch(decrement())}>decrement</button>
				<button onClick={() => dispatch(incrementByAmount(10)}>increment</button>
			</div>
		</div>

	)
}
```

## Fetching from an API

1. Create the API Slice

```jsx
import {createApi, fetchBaseQuery} ...

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({baseUrl: '/api'}),
	endpoints: (builder) => ({
							//builder.query<Return, Param>
		getUsers: builder.query<User[], void>({
			query: () => "/users",
		})
		createUser: builder.mutation<User, Partial<User>>({
			query: (body) => ({
				url: "/users",
				method: "POST",
				body,
			})
		})
	})
})

// the hooks are generated automatically
// use<nameGiven><operation>
export const {useGetUsersQuery, useCreateUserMutation} = apiSlice
```

1. Add it to the store

```jsx
export const store = configureStore({
  reducer: {
    [apiSlice.reduderPath]: apiSlice.reducer,
  },
  middleware: (getDefault) => getDefault().concat(apiSlice.middleware),
});
```

1. Use hooks

```jsx
function Users() {
  const { data: users, isLoading } = useGetUsersQuery();
  const [createUser] = useCReateUserMutation();
}
```

### Invalidating tags

- For query, we use `providesTags'
- For mutations, we use `invalidatesTags`
