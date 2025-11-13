import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { OrderListComponent } from './components/order-list/order-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'users', component: UserListComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'orders', component: OrderListComponent }
];