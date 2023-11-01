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
    registerWithGoogle: builder.mutation({
      query: (user) => ({
        url: '/users/register-with-google',
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

    loginWithGoogle: builder.mutation({
      query: (user) => ({
        url: '/users/login-with-google',
        method: 'POST',
        body: user,
      }),
    }),

    updateUser: builder.mutation({
      query: (user) => ({
        url: `/users/${user.id}`,
        body: user,
        method: 'PATCH',
      }),
    }),
    createProduct: builder.mutation({
      query: (product) => ({
        url: '/products',
        method: 'POST',
        body: product,
      }),
    }),
    deleteProduct: builder.mutation({
      query: ({ product_id, user_id }) => ({
        url: `/products/${product_id}`,
        body: {
          user_id,
        },
        method: 'DELETE',
      }),
    }),
    updateProduct: builder.mutation({
      query: (product) => ({
        url: `/products/${product.id}`,
        body: product,
        method: 'PATCH',
      }),
    }),

    addToCart: builder.mutation({
      query: (cartInfo) => ({
        url: '/products/add-to-cart',
        body: cartInfo,
        method: 'POST',
      }),
    }),

    removeFromCart: builder.mutation({
      query: (body) => ({
        url: '/products/remove-from-cart',
        body,
        method: 'POST',
      }),
    }),

    increaseCartProduct: builder.mutation({
      query: (body) => ({
        url: '/products/increase-cart',
        body,
        method: 'POST',
      }),
    }),

    decreaseCartProduct: builder.mutation({
      query: (body) => ({
        url: '/products/decrease-cart',
        body,
        method: 'POST',
      }),
    }),
    createOrder: builder.mutation({
      query: (body) => ({
        url: '/orders',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useCreateProductMutation,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useIncreaseCartProductMutation,
  useDecreaseCartProductMutation,
  useCreateOrderMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useUpdateUserMutation,
  useLoginWithGoogleMutation,
  useRegisterWithGoogleMutation,
} = appApi;
export default appApi;
