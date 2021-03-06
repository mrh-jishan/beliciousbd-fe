import {AfterContentChecked, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';
import {HOME_PATH} from '../service/constant';
import {User} from '../service/model';
import {SideBarService} from '../service/side-bar.service';
import {debounce} from '../service/debounce';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.scss']
})
export class SecureComponent implements OnInit, AfterContentChecked {

  @ViewChild('sideBar', {static: false}) sideBar;
  @ViewChild('sidebarOpenButton', {static: false}) sidebarOpenButton;

  user: User;
  isOpen = false;

  constructor(private auth: AuthService,
              private router: Router,
              private sideBarService: SideBarService) {
  }

  ngOnInit() {
    this.init_window_size();
  }

  logout() {
    this.router.navigateByUrl(HOME_PATH).then(r => {
      localStorage.clear();
      this.auth.update_user(null);
    });
  }

  ngAfterContentChecked() {
    this.user = this.auth.user;
    this.isOpen = this.sideBarService.isOpen;
  }

  openSidebar() {
    this.sideBarService.update_sidebar(true);
  }


  init_window_size() {
    if (window.innerWidth < 760) {
      this.sideBarService.update_sidebar(false);
    } else {
      this.sideBarService.update_sidebar(true);
    }
  }

  @HostListener('window:resize', ['$event'])
  @debounce()
  onResize(event) {
    this.init_window_size();
  }

  @HostListener('document:click', ['$event.target'])
  onClick(event) {
    if (this.sidebarOpenButton.nativeElement.contains(event)) {
      this.sideBarService.update_sidebar(true);
    } else if (this.sideBar.nativeElement.contains(event)) {
      this.init_window_size();
    } else {
      this.init_window_size();
    }
  }

}
