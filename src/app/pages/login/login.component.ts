import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  message: string;
  processing: boolean;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.createForm();
    this.processing = false;
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.processing) {
      return;
    }

    this.processing = true;

    this.userService.login(
      this.loginForm.get('username').value,
      this.loginForm.get('password').value
    ).then(success => {
      this.router.navigate(['/user/' + this.loginForm.get('username').value]);
      this.processing = false;
    }).catch(error => {
      this.message = 'Username or password wrong!';
      this.processing = false;
    });
  }

  private createForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  isUsernameInvalid(): boolean {
    return this.loginForm.get('username').invalid && this.loginForm.get('username').touched;
  }

  isPasswordInvalid(): boolean {
    return this.loginForm.get('password').invalid && this.loginForm.get('password').touched;
  }

}
