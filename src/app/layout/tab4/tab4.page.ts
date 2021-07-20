import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthCookie } from '../../services/auth-cookie-handler';
import { AppUpdatorService } from '../../services/app-updator.service';
import { environment } from '../../../environments/environment';
import { UserService } from 'src/app/services/user.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(private router: Router,
    private apiService: ApiService,
    private authCookie: AuthCookie,
    private appUpdatorService: AppUpdatorService,
    public userService: UserService,
    public toast:NotificationService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
  }

  checkForUpdate = () => {
    // if (environment.production) {
    //   this.appUpdatorService.checkIfUpdateExist();
    // }
    this.router.navigate(['/tabs/tab1']);
  }

  logout = () => {
    this.apiService.logout();
    this.router.navigate(['./login']);
  }

  navigateToUsers = () =>{
    this.toast.error("This page is under construction!");
  }

}
