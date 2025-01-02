import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Todo } from "../../types";

/* 
1. Results get cached, we need to invalidate the cache when we add, update, or delete a todo.
2. We should add the tagsTypes property to the API slice configuration to define the types of data that can be fetched from this API and the tags for invalidation.
3. QUery: to invalidate, we use `providesTags`
4. Mutation: to invalidate, we use `invalidatesTags`
*/

export const apiSlice = createApi({
  reducerPath: "api", // the default path for the API state
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
  tagTypes: ["Todos"], // the types of data that can be fetched from this API and tags for invalidation
  endpoints: (builder) => ({
    // methods to interact with the API
    getTodos: builder.query<Todo[], void>({
      query: () => "/todos",
      providesTags: ["Todos"], // the tags that will be invalidated when this query is executed
    }),
    addTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (body) => ({
        url: "/todos",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Todos"], // the tags that will be invalidated when this mutation is executed
    }),
    updateTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (body) => ({
        url: `/todos/${body.id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Todos"],
    }),
    deleteTodo: builder.mutation<Todo, number>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = apiSlice;
