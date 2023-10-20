import AdminDashBoardPage from '../pages/AdminDashBoardPage';
import CartPage from '../pages/CartPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import NewProductPage from '../pages/NewProductPage';
import OrderPage from '../pages/OrderPage';
import ProductPage from '../pages/ProductPage';
import RegisterPage from '../pages/RegisterPage';
import EditProductPage from '../pages/EditProductPage';
import CategoryPage from '../pages/CategoryPage'

export const routes = [
  {
    path: '/',
    page: HomePage,
    isShowHeader: true,
  },
  {
    path: '/products',
    page: NewProductPage,
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
  {
    path: '/product/:id',
    page: ProductPage,
    isShowHeader: true,
  },
  {
    path: '/admin',
    page: AdminDashBoardPage,
    isShowHeader: true,
  },
  {
    path: '/cart',
    page: CartPage,
    isShowHeader: true,
  },
  {
    path: '/orders',
    page: OrderPage,
    isShowHeader: true,
  },
  {
    path: '/product/:id/edit',
    page: EditProductPage,
    isShowHeader: true,
  },
  {
    path: '/category/:category',
    page: CategoryPage,
    isShowHeader: true,
  },

  // {
  //   path: '*',
  //   page: NotFoundPage,
  //   isShowHeader: false,
  // },
];
