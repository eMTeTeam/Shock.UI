import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  
  constructor(public userService: UserService, private router: Router, private loadingService: LoadingService) { 

    this.loadingService.hide();
  }

}
