import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('../pages/Auth/LoginPage.vue'),
  },
  {
    path: '/',
    component: () => import('../common/layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('../pages/Dashboard/DashboardPage.vue'), meta: { requiresAuth: true } },
      { path: 'users', component: () => import('../pages/Users/UsersPage.vue'), meta: { requiresAuth: true } },
      { path: 'publishers', component: () => import('../pages/Publishers/PublishersPage.vue'), meta: { requiresAuth: true } },
      { path: 'books', component: () => import('../pages/Books/BooksPage.vue'), meta: { requiresAuth: true } },
      { path: 'renters', component: () => import('../pages/Renters/RentersPage.vue'), meta: { requiresAuth: true } },
      { path: 'rents', component: () => import('../pages/Rents/RentsPage.vue'), meta: { requiresAuth: true } },
    ],
  },
];

export default routes;
