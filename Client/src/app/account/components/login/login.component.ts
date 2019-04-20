import { Component } from '@angular/core';
import { AppConfigService } from '../../../shared/services/app-config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  cdnBasePath: string;

  constructor(private appConfigService: AppConfigService) {
    this.cdnBasePath = this.appConfigService.getConfig().CDN_BASE_PATH;
  }

  loginGoogle() {
    window.location.href = `${this.appConfigService.getConfig().BASE_API_URL}account/login`;
  }
}
