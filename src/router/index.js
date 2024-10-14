import { createRouter, createWebHistory } from 'vue-router';
import TransactionsView from '../views/TransactionsView.vue';
import ContractsView from '@/views/ContractsView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'transactions',
      component: TransactionsView,
    },
    {
      path: '/contracts',
      name: 'contracts',
      component: ContractsView,
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
});

export default router;
