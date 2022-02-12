import SignInPage from '../containers/SignInPage/SignInPage';
import SignUpPage from '../containers/SignUpPage/SignUpPage';
import HomePage from '../containers/HomePage/HomePage';
import AdminPage from '../containers/AdminPage/AdminPage';
import ProfilePage from '../containers/ProfilePage/ProfilePage';
import PlacePage from "../containers/PlacePage/PlacePage";
import CreatePlace from "../containers/CreatePlace/CreatePlace";
import EditPlace from "../containers/EditPlace/EditPlace";
import CategoryPage from "../containers/CategoryPage/CategoryPage";

const routesConfig = [
  {
    path: '/',
    exact: true,
    component: HomePage,
  },
  {
    path: '/signup',
    exact: true,
    component: SignUpPage,
  },
  {
    path: '/signin',
    exact: true,
    component: SignInPage,
  },
  {
    path: '/admin',
    exact: true,
    component: AdminPage,
  },
  {
    path: '/profile',
    exact: true,
    component: ProfilePage,
  },
  {
    path: '/place/:id',
    exact: true,
    component: PlacePage,
  }
  , {
    path: '/add',
    exact: true,
    component: CreatePlace,
  },
  {
    path: '/place/edit/:id',
    exact: true,
    component: EditPlace,
  },
  {
    path: '/categories',
    exact: true,
    component: CategoryPage,
  }
];

export default routesConfig;
