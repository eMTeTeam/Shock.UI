import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';
import { LoadingService } from '../../services/loading.service';
import { UserService, observation } from 'src/app/services/user.service';
import { Observers } from 'src/app/entities/topglove.domain.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  observerForm: FormGroup;
  categoryList:Array<string>=Observers.category.filter(a=>a!="All");
  activityTypeList:Array<string>=Observers.activityType.filter(a=>a!="All");;
  observerStatusList:Array<string>=Observers.status;
  projectList:Array<string> = Observers.projectList.filter(a=>a!="All");;;

  observerData: observation= new observation(); 
  date: Date = new Date();
  settings = {
      bigBanner: true,
      timePicker: false,
      format: 'dd-MM-yyyy',
      defaultOpen: true
  }

  constructor(public modalController: ModalController,
    private router: Router,
    private apiService: ApiService,
    private toast: NotificationService,
    private loadingService: LoadingService,
    public userService: UserService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private alertController:AlertController) {
      this.observerData=this.userService.observationData;
      this.generateLoginForm();
      this.route.queryParams.subscribe(params => {
        this.observerForm.markAsPristine();
        this.observerForm.markAsTouched();
      });
  }
  async presentAlertConfirm() {
    if(this.userService.observationData.id){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Are you sure want to remove this observation <strong>'+ this.userService.observationData.name+'</strong>!!!',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
           this.removeObservation();
          }
        }
      ]
    });

    await alert.present();
  }
  else{
    this.toast.info("Please select valid observation");
  }
  }
  removeObservation() {
    this.loadingService.show();
    this.apiService.removeObservation(this.userService.observationData.id).subscribe(
      (data:any)=>{
        this.loadingService.hide();
         this.toast.success("Observation removed");
         this.router.navigate(['/tabs/tab1']);
      },
      (err)=>{
        this.loadingService.hide();
        this.toast.error("Observation not removed, Please try again later");
      }
    );
  }
  generateLoginForm = () => {
    this.observerForm = this.fb.group({
      observationName:['', Validators.required],
      category: ['', Validators.required],
      activity: ['', Validators.required],
      description: ['', Validators.required],
      agreedAction: ['', Validators.required],
      actionOwner: ['', Validators.required],
      dueDate: ['', Validators.required],
      status: ['', Validators.required],
      projectName:['',Validators.required],
      projectLocation:['',Validators.required],
    });
  }
  addObservation() {
    this.observerForm.markAsDirty();
    this.observerForm.markAllAsTouched();
    var isAdd=true;
    if (this.observerForm.dirty && this.observerForm.valid) {
      if(this.userService.observationData && this.userService.observationData.id){
        this.userService.observationList.forEach(element => {
           if(element.id == this.userService.observationData.id){
             this.loadingService.show();
             element=this.userService.observationData;
             var observationData=this.userService.observationData;
             this.apiService.updateObservation(observationData).subscribe(
               (data:any)=>{
                 this.loadingService.hide();
                  this.toast.success("Observation updated");
                  let navigationExtras: NavigationExtras = {
                   state: {
                     user: isAdd
                   }
                 };
                  this.router.navigate(['/tabs/tab1'], navigationExtras);
               },
               (err)=>{
                 this.loadingService.hide();
                 this.toast.error("Observation not added, Please try again later");
               }
             );
           }
        });
        isAdd=false;
      }
      else{
        isAdd=true;
        this.userService.observationData.createdUser=this.userService._user.toLowerCase();
        this.userService.observationData.id="3fa85f64-5717-4562-b3fc-2c963f66afa6";
        this.loadingService.show();
        var observationData=this.userService.observationData;
        this.apiService.AddObservation(observationData).subscribe(
          (data:any)=>{
            this.loadingService.hide();
             this.userService.addObservationList(data);
             this.userService.setMessage(this.userService.observationList);
             this.toast.success("Observation saved");
             let navigationExtras: NavigationExtras = {
              state: {
                user: isAdd
              }
            };
             this.router.navigate(['/tabs/tab1'], navigationExtras);
          },
          (err)=>{
            this.loadingService.hide();
            this.toast.error("Observation not added, Please try again later");
          }
        );
      }
      
     
    }
    else {
      this.toast.error("Please enter observation details");
    }
  }


}
