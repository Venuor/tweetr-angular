import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../../services/validator.service';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';
import { SettingType } from './setting-type.enum';
import { TweetService } from '../../services/tweet.service';
import { Statistic } from '../../model/statistic';
import { StatisticsService } from '../../services/statistics.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  user: User;
  showPassword: boolean;
  icon: string;
  title: string;
  successMessage: string;

  generalForm: FormGroup;
  fileName: string;
  generalMessage: string;
  generalProcessing: boolean;

  passwordForm: FormGroup;
  passwordProcessing: boolean;

  dangerButton: string;
  dangerIcon: string;
  dangerZoneDisabled: boolean;
  dangerousAction: SettingType;
  SettingType = SettingType;
  dangerProcessing: boolean;

  userStatistic: Statistic;

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private userService: UserService,
    private tweetService: TweetService,
    private statisticService: StatisticsService
  ) { }

  ngOnInit() {
    this.loadUser();
    this.createForms();

    this.showPassword = false;
    this.icon = 'settings';
    this.title = 'General Settings';

    this.generalProcessing = false;
    this.passwordProcessing = false;

    this.dangerZoneDisabled = true;
    this.dangerButton = 'Enable';
    this.dangerIcon = 'unlock';
    this.dangerousAction = null;
    this.dangerProcessing = false;
  }

  updateFileDisplay($event) {
    const file = $event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.generalForm.get('image').setValue(file);
    } else {
      this.fileName =  '';
      this.generalForm.get('image').setValue(null);
    }
  }

  setGeneralFormValues() {
    this.generalForm.setValue({
      displayname: this.user.displayname,
      email: this.user.email,
      description: this.user.description,
      image: null,
      resetImage: false
    });
    this.generalForm.markAsPristine();
    this.fileName = '';
  }

  isGeneralFieldInvalid(name: string): boolean {
    return this.generalForm.get(name).invalid && this.generalForm.get(name).touched;
  }

  isGeneralFormInvalid() {
    return this.generalForm.invalid
      && (
        this.isGeneralFieldInvalid('displayname')
        || this.isGeneralFieldInvalid('email')
        || this.isGeneralFieldInvalid('description')
      );
  }

  submitGeneral() {
    if (this.generalProcessing) {
      return;
    }

    this.generalMessage = null;
    this.generalProcessing = true;

    let image = null;

    if (this.generalForm.get('resetImage').value) {
      image = this.generalForm.get('image').value;
    }

    const data = new FormData();
    data.append('displayname', this.generalForm.get('displayname').value);
    data.append('email',  this.generalForm.get('email').value);
    data.append('description', this.generalForm.get('description').value || '');
    data.append('image', image);
    data.append('default_image', this.generalForm.get('resetImage').value);

    this.userService.changeSettings(this.user.username, data)
      .then(result => this.userService.reloadLoggedInUser())
      .then(user => {
        this.user = user;
        this.setSuccessMessage('Settings changed successfully!');
        this.generalProcessing = false;
        this.generalForm.markAsPristine();
      })
      .catch(error => {
        this.generalMessage = error.message;
        this.generalProcessing = false;
      });
  }

  isPasswordMismatch(): boolean {
    if (this.passwordForm.errors) {
      return 'passwordMatch' in this.passwordForm.errors
        && this.passwordForm.get('password').touched
        && this.passwordForm.get('passwordConfirm').touched;
    } else {
      return false;
    }
  }

  isPasswordFieldInvalid(name: string): boolean {
    return this.passwordForm.get(name).invalid && this.passwordForm.get(name).touched;
  }

  isPasswordFormInvalid() {
    return this.passwordForm.invalid
      && (
        this.isPasswordFieldInvalid('password')
        || this.isPasswordFieldInvalid('passwordConfirm')
        || this.isPasswordMismatch()
      );
  }

  submitPassword() {
    if (this.passwordProcessing) {
      return;
    }

    this.passwordProcessing = true;

    const data = new FormData();
    data.append('password', this.passwordForm.get('password').value);
    data.append('passwordConfirm', this.passwordForm.get('passwordConfirm').value);

    this.userService.changePassword(this.user.username, data)
      .then(result => {
        this.passwordForm.reset();
        this.setSuccessMessage('Password change successful!');
        this.passwordProcessing = false;
      })
      .catch(error => {
        console.log(error);
        this.passwordProcessing = false;
      });
  }

  switchSettings() {
    this.showPassword = !this.showPassword;
    this.generalMessage = '';

    if (this.showPassword) {
      this.icon = 'key';
      this.title = 'Password';
    } else {
      this.icon = 'settings';
      this.title = 'General Settings';
    }
  }

  switchDangerZone() {
    this.dangerZoneDisabled = !this.dangerZoneDisabled;

    if (this.dangerZoneDisabled) {
      this.dangerButton = 'Enable';
      this.dangerIcon = 'unlock';
      this.resetDangerousAction();
    } else {
      this.dangerButton = 'Disable';
      this.dangerIcon = 'lock';
    }
  }

  setDangerousAction(action: SettingType) {
    this.dangerousAction = action;
  }

  resetDangerousAction() {
    this.dangerousAction = null;
  }

  doDangerousAction() {
    if (this.dangerProcessing) {
      return;
    }

    this.dangerProcessing = true;

    switch (this.dangerousAction) {
      case SettingType.deleteTweets:
        this.tweetService.removeAll(this.user.username)
          .then(result => {
            this.setSuccessMessage('All Tweets successfully removed!');
            this.updateStatistic();
            this.resetDangerousAction();
            this.dangerProcessing = false;
          }).catch(error => {
            console.log(error);
            this.dangerProcessing = false;
          });
        break;
    }
  }

  private setSuccessMessage(message: string, displayTime: number = 5000) {
    this.successMessage = message;

    setTimeout(function() {
      this.successMessage = '';
    }.bind(this),
      displayTime);
  }

  private loadUser() {
    this.userService.getLoggedInUser()
      .then(user => {
        this.user = user;
        this.setGeneralFormValues();
        this.updateStatistic();
      })
      .catch(err => console.log(err));
  }

  private createForms() {
    this.generalForm = this.fb.group( {
        displayname: ['', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(40)
        ]],
        email: ['', [
          Validators.required,
          Validators.email,
          this.validatorService.noWhitespaceValidator()
        ]],
        description: ['', [
          Validators.maxLength(140)
        ]],
        image: [''],
        resetImage: ['']
      });

    this.passwordForm = this.fb.group({
        password: ['', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(40),
          this.validatorService.noWhitespaceValidator()
        ]],
        passwordConfirm: ['', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(40),
          this.validatorService.noWhitespaceValidator()
        ]]
      },
      {
        validator: this.validatorService.matchPassword()
      });
  }

  private updateStatistic() {
    if (this.user) {
      this.statisticService.getUserStatistic([this.user.username])
        .then(statistic => {
          const imagePercent = statistic.imageTweets / (statistic.tweets || 1);
          statistic.imageTweets = parseFloat(imagePercent.toFixed(2)) * 100;
          this.userStatistic = statistic;
        }).catch(error => console.log(error));
    }
  }

}
