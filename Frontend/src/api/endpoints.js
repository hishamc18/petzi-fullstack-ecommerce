export const endPoints = {
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
    LOGOUT: "/logout",
    ME: "/me",
    REFRESH_TOKEN: "user/refresh-token",
  },
  PRODUCTS: {
    GET_ALL: '/products',
    GET_BY_ID: (id) => `/products/${id}`,
    SEARCH: '/products/search',
  },
  WISHLIST: {
    GET_ALL: '/users/wishlist',
    ADD: (productId) => `/users/wishlist/${productId}`,
    REMOVE: (productId) => `/users/wishlist/${productId}`,
    CLEAR: '/users/wishlist',
  },
  CART: {
    GET_ALL: '/users/cart',
    ADD_PRODUCT: (productId) => `/users/cart/${productId}`,
    REMOVE_PRODUCT: (productId) => `/users/cart/${productId}`,
    UPDATE_QUANTITY: (productId, action) => `/users/cart/${productId}/${action}`,
    CLEAR_CART: '/users/cart/clear'
  }
}