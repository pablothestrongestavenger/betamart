import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue' // Import the RegisterView component
import ProductsView from '../views/ProductsView.vue'
import AddProduct from '../components/AddProduct.vue'
import EditProduct from '../components/EditProduct.vue'
import DeleteProduct from '../components/DeleteProduct.vue'
import ViewProduct from '../components/ViewProduct.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register', 
    component: RegisterView 
  },
  {
    path: '/products',
    name: 'products',
    component: ProductsView
  },
  {
    path: '/products/add',
    name: 'add-product',
    component: AddProduct
  },
  {
    path: '/products/edit/:id',
    name: 'edit-product',
    component: EditProduct
  },
  {
    path: '/products/delete/:id',
    name: 'delete-product',
    component: DeleteProduct
  },
  {
    path: '/products/:id',
    name: 'view-product',
    component: ViewProduct
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
