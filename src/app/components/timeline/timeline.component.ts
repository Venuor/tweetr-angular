import { Component, Input } from '@angular/core';
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

  constructor(private sanitizer: DomSanitizer) { }

  isUserHome(): boolean {
    return false;
  }

  getSecureImage(part: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(ApiSettings.API_HOST + part);
  }

  secureBackgroundUrl(part: string): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle('url(' + ApiSettings.API_HOST + part + ')');
  }
}
