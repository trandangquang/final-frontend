import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import NewProduct from '../pages/NewProduct';
import RegisterPage from '../pages/RegisterPage';

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
  {
    path: '/products',
    page: NewProduct,
    isShowHeader: true,
  },
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
