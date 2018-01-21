import { AfterViewInit, Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getLoggedInUser()
      .then(user => this.user = user)
      .catch(err => err); // fail silently, no user logged in
  }

  signout() {
    this.userService.logout();
  }

}
