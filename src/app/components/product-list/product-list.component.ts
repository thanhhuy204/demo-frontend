import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product'; // <-- Import

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  newProduct: Product = { name: '', description: '', price: 0, stock: 0 };
  
  // BIẾN MỚI
  selectedProduct: Product | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe(products => this.products = products);
  }

  createProduct() {
    this.productService.createProduct(this.newProduct).subscribe(() => {
      this.loadProducts();
      this.newProduct = { name: '', description: '', price: 0, stock: 0 };
    });
  }

  deleteProduct(id: number) {
    if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      this.productService.deleteProduct(id).subscribe(() => this.loadProducts());
    }
  }

  // HÀM MỚI
  selectProductForEdit(product: Product) {
    this.selectedProduct = { ...product };
  }

  // HÀM MỚI
  cancelEdit() {
    this.selectedProduct = null;
  }

  // HÀM MỚI
  updateProduct() {
    if (this.selectedProduct && this.selectedProduct.id) {
      this.productService.updateProduct(this.selectedProduct.id, this.selectedProduct).subscribe(() => {
        this.loadProducts();
        this.selectedProduct = null;
      });
    }
  }
}