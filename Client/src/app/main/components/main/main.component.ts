import { Component } from '@angular/core';
import { AppConfigService } from '../../../shared/services/app-config.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  cdnBasePath: string;

  constructor(private appConfigService: AppConfigService) {
    this.cdnBasePath = this.appConfigService.getConfig().CDN_BASE_PATH;
  }
}
