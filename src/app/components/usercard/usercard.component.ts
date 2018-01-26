import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiSettings } from '../../model/api-settings';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-usercard',
  templateUrl: './usercard.component.html',
  styleUrls: ['./usercard.component.css']
})
export class UsercardComponent implements OnInit {
  @Input() user: User;
  @Input() showButton: boolean;
  @Input() isFollowing: boolean;
  @Input() linkToUser: boolean;
  @Output() followButtonEvent: EventEmitter<any>;

  constructor(private sanitizer: DomSanitizer, private userService: UserService) {
    this.followButtonEvent = new EventEmitter();
  }

  ngOnInit() {
  }

  secureBackgroundUrl(part: string): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle('url(' + ApiSettings.API_HOST + part + ')');
  }

  buttonAction() {
    if (this.showButton) {
      if (!this.isFollowing) {
        this.userService.subscribe(this.user.username)
          .then(result => this.emitEvent());
      } else {
        this.userService.unsubscribe(this.user.username)
          .then(result => this.emitEvent());
      }
    }
  }

  private emitEvent() {
    this.followButtonEvent.emit();
  }
}
