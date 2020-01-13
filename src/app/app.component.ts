import {Component} from '@angular/core';
import {DASHBOARD_PATH, HOME_PATH, LOCAL_STORAGE_TOKEN_KEY, LOGIN_PATH} from './service/constant';
import {Router} from '@angular/router';
import {AuthService} from './service/auth.service';
import {UserService} from './service/user.service';
import {noop} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router, private auth: AuthService, private userService: UserService) {
    this.load_token().then(console.log);
  }

  async load_token() {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (token == null) {
      this.router.navigateByUrl(HOME_PATH).then(r => console.log('redirect to home page'));
    } else {
      await this.userService.get_user().pipe(tap((res: any) => {
        this.auth.update_user(res.data.user);
        // this.router.navigateByUrl(DASHBOARD_PATH).then(r => console.log('redirect to dashboard page'));
      })).subscribe(noop, err => {
        console.log(err);
        this.router.navigateByUrl(LOGIN_PATH).then(r => console.log('redirect to dashboard page'));
      });
    }
  }
}
