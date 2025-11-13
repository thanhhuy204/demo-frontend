import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { UserService } from '../../services/user.service';
import { ProductService } from '../../services/product.service';
import { Order } from '../../models/order'; // <-- Import
import { User } from '../../models/user'; // <-- Import
import { Product } from '../../models/product'; // <-- Import

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  users: User[] = [];
  products: Product[] = [];
  newOrder: Order = { userId: 0, product: '', price: 0 };
  selectedProductId: number = 0;

  // BIẾN MỚI
  selectedOrder: Order | null = null;

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.loadOrders();
    this.loadUsers();
    this.loadProducts();
  }

  loadOrders() {
    this.orderService.getAllOrders().subscribe(orders => this.orders = orders);
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(users => this.users = users);
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe(products => this.products = products);
  }

  onProductChange() {
    const product = this.products.find(p => p.id === Number(this.selectedProductId));
    if (product) {
      this.newOrder.product = product.name;
      this.newOrder.price = product.price;
    }
  }

  createOrder() {
    this.orderService.createOrder(this.newOrder).subscribe(() => {
      this.loadOrders();
      this.newOrder = { userId: 0, product: '', price: 0 };
      this.selectedProductId = 0;
    });
  }

  deleteOrder(id: number) {
    if (confirm('Bạn có chắc muốn xóa đơn hàng này?')) {
      this.orderService.deleteOrder(id).subscribe(() => this.loadOrders());
    }
  }

  // HÀM MỚI
  selectOrderForEdit(order: Order) {
    this.selectedOrder = { ...order };
  }

  // HÀM MỚI
  cancelEdit() {
    this.selectedOrder = null;
  }

  // HÀM MỚI
  updateOrder() {
    if (this.selectedOrder && this.selectedOrder.id) {
      this.orderService.updateOrder(this.selectedOrder.id, this.selectedOrder).subscribe(() => {
        this.loadOrders();
        this.selectedOrder = null;
      });
    }
  }
}