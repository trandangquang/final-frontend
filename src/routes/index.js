import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

export const routes = [
  {
    path: '/',
    page: HomePage,
    isShowHeader: true,
  },
  // {
  //   path: '/order',
  //   page: OrderPage,
  //   isShowHeader: true,
  // },
  // {
  //   path: '/products',
  //   page: ProductPage,
  //   isShowHeader: true,
  // },

  {
    path: '/login',
    page: LoginPage,
    isShowHeader: false,
  },
  {
    path: '/register',
    page: RegisterPage,
    isShowHeader: false,
  },

  // {
  //   path: '*',
  //   page: NotFoundPage,
  //   isShowHeader: false,
  // },
];
