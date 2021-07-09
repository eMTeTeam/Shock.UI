import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoadingService } from '../../services/loading.service';
import { UserService } from 'src/app/services/user.service';
import { ApiService } from '../../services/api.service';
import { Users } from 'src/app/entities/topglove.domain.model';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  users: Array<string> = Users.data;
  password : string =Users.password;

  constructor(private router: Router,
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private userService: UserService,
    private toast: NotificationService, private apiService:ApiService) {
    this.generateLoginForm();
    localStorage.setItem("isClearCache",'true');
  }

  ngOnInit() {
  }

  generateLoginForm = () => {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  doLogin = () => {
    if (this.loginForm.dirty && this.loginForm.valid) {
      localStorage.setItem("isClearCache",'true');
      const user: string = this.loginForm.value.userName.toLowerCase();
      const password: string =this.loginForm.value.password.toLowerCase();
      if (this.users.includes(user) && this.password === password) {
        this.loadingService.show();
        this.userService.User = this.loginForm.value.userName.toLowerCase();

        if (user === 'test') {
          this.userService.IsSuperUser = true;
        }
        this.toast.success("Login success");
        this.loadingService.hide();
        this.router.navigate(['/tabs'], { replaceUrl: true });
     
      
      } else {
        this.toast.error("Please enter valid user name and password");
      }
    }
    else {
      this.toast.error("Please enter valid user name and password");
    }
  }
}
