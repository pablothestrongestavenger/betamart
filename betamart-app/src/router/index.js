import { createRouter, createWebHistory } from 'vue-router';
import ProductView from '@/views/ProductView.vue';
import UserManagementView from '@/views/UserManageView.vue';

const routes = [
  { path: '/', component: ProductView },
  { path: '/manage-users', component: UserManagementView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
