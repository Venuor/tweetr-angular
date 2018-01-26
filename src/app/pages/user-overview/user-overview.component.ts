import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.css']
})
export class UserOverviewComponent implements OnInit {
  users: User[];
  loggedInUser: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.updateUsers();
  }

  updateUsers() {
    this.userService.getAll()
      .then(users => this.users = users)
      .catch(error => console.log(error));

    this.userService.reloadLoggedInUser()
      .then(user => this.loggedInUser = user)
      .catch(error => console.log(error));
  }

  isFollowing(user: User) {
    return user.subscribers.includes(this.loggedInUser.username);
  }

}
