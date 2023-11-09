import MainLayout from '@layouts/MainLayout';
import FormPage from '@pages/Form';
import NotFound from '@pages/NotFound';

const routes = [
  {
    path: '/',
    name: 'Form',
    protected: false,
    component: FormPage,
    layout: MainLayout,
  },
  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;
