import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../../store/store";

type PostState = {
  id: string;
  title: string;
  content: string;
};

const initialState: PostState[] = [
  {
    id: "1",
    title: "First Post!",
    content: "Hello!",
  },
  {
    id: "2",
    title: "Second Post",
    content: "More text",
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: (state, action) => {
      // createSlice uses immerjs under the hood, so it's safe to mutate the state
      //   Immer simplifies handling immutable data structures
      state.push(action.payload);

      //   otherwise, we would use:
      //   return [...state, action.payload];
    },
  },
});

// this makes it easier to select the posts from the state and the code more maintainable
// if the shape of the state changes, we only need to change it here
export const selectAllPosts = (state: AppState) => state.posts;

export const { postAdded } = postsSlice.actions;

export default postsSlice.reducer;
