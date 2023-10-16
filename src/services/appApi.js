import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: '/users/register',
        method: 'POST',
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (user) => ({
        url: '/users/login',
        method: 'POST',
        body: user,
      }),
    }),
    createProduct: builder.mutation({
      query: (product) => ({
        url:'/products',
        body: product,
        method: 'POST'
      })
    })
  }),
});

export const { useRegisterMutation, useLoginMutation, useCreateProductMutation } = appApi;
export default appApi