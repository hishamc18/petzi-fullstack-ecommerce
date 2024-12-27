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
      }
}