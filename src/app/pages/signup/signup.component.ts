import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorService } from '../../services/validator.service';
import { SignupService } from '../../services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  message: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private validatorService: ValidatorService,
    private signupService: SignupService
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  isFieldInvalid(name: string): boolean {
    return this.signupForm.get(name).invalid && this.signupForm.get(name).touched;
  }

  isPasswordMismatch(): boolean {
    if (this.signupForm.errors) {
      return 'passwordMatch' in this.signupForm.errors
        && this.signupForm.get('password').touched
        && this.signupForm.get('passwordConfirm').touched;
    } else {
      return false;
    }
  }

  isFormInvalid() {
    return this.signupForm.invalid
      && (
        this.isFieldInvalid('username')
        || this.isFieldInvalid('displayname')
        || this.isFieldInvalid('password')
        || this.isFieldInvalid('passwordConfirm')
        || this.isPasswordMismatch()
        || this.isFieldInvalid('email')
      );
  }

  private createForm() {
    this.signupForm = this.fb.group( {
      username: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
        Validators.pattern(/^[a-z0-9]+$/i),
        this.validatorService.noWhitespaceValidator()
      ]],
      displayname: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(40),
        this.validatorService.trimWhitespaceValidator()
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(40),
        this.validatorService.noWhitespaceValidator()
      ]],
      passwordConfirm: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(40),
        this.validatorService.noWhitespaceValidator()
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        this.validatorService.noWhitespaceValidator()
      ]],
    },
    {
      validator: this.validatorService.matchPassword()
    });
  }

  onSubmit() {
    this.signupService.signup(
      this.signupForm.get('username').value,
      this.signupForm.get('displayname').value,
      this.signupForm.get('password').value,
      this.signupForm.get('passwordConfirm').value,
      this.signupForm.get('email').value,
    ).then(user => {
      this.router.navigate(['login']);
    }).catch(err => {
      this.message = err.error.message;
    });
  }
}
