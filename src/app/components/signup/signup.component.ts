import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SignupService } from '../../services/signup.service';
import { ValidatorService } from '../../services/validator.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @Output() submitEvent: EventEmitter<any>;

  signupForm: FormGroup;
  message: string;

  constructor(
    private validatorService: ValidatorService,
    private signupService: SignupService,
    private fb: FormBuilder
  ) {
    this.submitEvent = new EventEmitter();
  }

  ngOnInit() {
    this.createForm();
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
          Validators.pattern(/^[a-z0-9]+$/i)
        ]],
        displayname: ['', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(40)
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
          Validators.email
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
      this.signupForm.reset();
      this.submitEvent.emit();
    }).catch(err => {
      console.log(err);
      this.message = err.error.message;
    });
  }
}
