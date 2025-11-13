import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user'; 

@Component({
  selector: 'app-user-list',
  standalone: true, 
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  newUser: User = { username: '', email: '', password: '' };
  selectedUser: User | null = null; 

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(users => this.users = users);
  }

  createUser() {
    this.userService.createUser(this.newUser).subscribe(() => {
      this.loadUsers();
      this.newUser = { username: '', email: '', password: '' };
    });
  }

  deleteUser(id: number) {
    if (confirm('Bạn có chắc muốn xóa user này?')) {
      this.userService.deleteUser(id).subscribe(() => this.loadUsers());
    }
  }

  selectUserForEdit(user: User) {
    this.selectedUser = { ...user }; 
  }

  cancelEdit() {
    this.selectedUser = null;
  }

  updateUser() {
    if (this.selectedUser && this.selectedUser.id) {
      this.userService.updateUser(this.selectedUser.id, this.selectedUser).subscribe(() => {
        this.loadUsers();
        this.selectedUser = null; // Quay về form tạo mới
      });
    }
  }
}