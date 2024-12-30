import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Todo } from "../../types";

export const apiSlice = createApi({
  reducerPath: "api", // the default path for the API state
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
  endpoints: (builder) => ({
    // methods to interact with the API
    getTodos: builder.query<Todo[], void>({
      query: () => "/todos",
    }),
    addTodos: builder.mutation<Todo, Partial<Todo>>({
      query: (body) => ({
        url: "/todos",
        method: "POST",
        body,
      }),
    }),
    updateTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (body) => ({
        url: `/todos/${body.id}`,
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const { useGetTodosQuery } = apiSlice;
