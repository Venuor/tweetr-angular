import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tweet } from '../../model/tweet';
import { DomSanitizer, SafeStyle, SafeUrl } from '@angular/platform-browser';
import { ApiSettings } from '../../model/api-settings';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent {
  @Input() tweets: Tweet[];
  @Input() title: string;
  @Input() icon: string;
  @Input() showRemove: string;
  @Output() removeEvent: EventEmitter<string>;

  constructor(private sanitizer: DomSanitizer) {
    this.removeEvent = new EventEmitter();
  }

  getSecureImage(part: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(ApiSettings.API_HOST + part);
  }

  secureBackgroundUrl(part: string): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle('url(' + ApiSettings.API_HOST + part + ')');
  }

  removeTweet(id: string) {
    this.removeEvent.emit(id);
  }
}
