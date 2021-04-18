import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Resolve, Router } from '@angular/router';
import * as moment from 'moment';
import { NotificationService } from '../../services/notification.service';
import { LoadingService } from '../../services/loading.service';
import { ApiService } from '../../services/api.service';
import { observation, UserService } from 'src/app/services/user.service';
import { Observers } from 'src/app/entities/topglove.domain.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  subscription: Subscription;
  private routeSub: Subscription;
  @ViewChild('content')  content: any;

  
  ngOnInit(){
    
  }
  
  today: string = moment().format("DD-MMM-YYYY");
  

  categoryList:Array<string>=Observers.category;
  activityTypeList:Array<string>=Observers.activityType;
  projectList:Array<string>= Observers.projectList;

  filterObject:any={
    fromDate:new Date().toUTCString(),
    toDate:new Date().toUTCString(),
    project:"All",
    category:"All",
    activity:"All"
  }
  minDate:string=new Date().toUTCString();
  maxDate:string=new Date().toUTCString();
  clearFilter(){
    this.filterObject.fromDate=this.minDate;
    this.filterObject.toDate=this.maxDate;
    this.filterObject.category="All";
    this.filterObject.activity="All";
    this.filterObject.project="All";
    this.getBasedOnStatus();
  }
  constructor(private router: Router,
    private toast: NotificationService,
    private loadingService: LoadingService,
    private apiService: ApiService,
    public userService: UserService,
    private route: ActivatedRoute,) {
       this.getAllObservations("");
   
      this.route.queryParams.subscribe(params => {
        this.setObservationList();
       //this.getBasedOnStatus();
      // this.getAllObservations();
        // if (this.router.getCurrentNavigation().extras.state) {
        //  console.log(this.router.getCurrentNavigation().extras.state.user);
        //  this.observationStatus=this.userService.observationData.Status;
        //      this.getBasedOnStatus();
        //      setTimeout(() => {
        //        if(this.router.getCurrentNavigation().extras.state.user)
        //     this.content.scrollToBottom();
        //      }, 1000);
        // }
        // else{
        //   this.getBasedOnStatus();
        // }
      });
  }
  refreshObservationList(event){
    this.getAllObservations(event);
  }
  getAllObservations(event){
    this.loadingService.show();
    this.apiService.GetAllObservations(this.userService.User).subscribe(
      (data: any) => {
        this.loadingService.hide();
        this.userService.observationList=data;
        this.setObservationList();
        if(event){
          event.target.complete();
        }
      },
      (err) => {
        this.loadingService.hide();
        if(event){
          event.target.complete();
        }
      }
    );
  }
  setObservationList(){
    if(this.userService.observationList && this.userService.observationList.length){
      var minDate = this.userService.observationList.reduce(function (a, b) { return (new Date(a.dueDate)) < (new Date(b.dueDate)) ? a : b; });
      var maxDate = this.userService.observationList.reduce(function (a, b) { return (new Date(a.dueDate)) > (new Date(b.dueDate)) ? a : b; });
     
      if(minDate && minDate.dueDate){
        this.filterObject.fromDate=minDate.dueDate;
        this.minDate=minDate.dueDate;
      }
      if(maxDate && maxDate.dueDate){
       this.filterObject.toDate=maxDate.dueDate;
       this.maxDate=maxDate.dueDate;
     }
     this.getBasedOnStatus();
   }
  }
  observationStatus:string="All";
  filteredObservationStatus:any=[];
  getBasedOnStatus(){
    this.filteredObservationStatus = this.userService.observationList.filter((data)=>{
       return ((new Date(data.dueDate) >=new Date(this.filterObject.fromDate)) 
       && (new Date(data.dueDate) <=new Date(this.filterObject.toDate)))&&
       (this.filterObject.activity=='All'?true:data.typeOfActivity==this.filterObject.activity)&&
       (this.filterObject.category=='All'?true:data.category==this.filterObject.category)&&
       (this.filterObject.project=='All'?true:data.projectName==this.filterObject.project)&&
       (this.observationStatus=='All'?true:data.status==this.observationStatus)&&
        (this.userService._user=='admin'?true:data.createdUser==this.userService._user);
    });
    if(this.observationStatus=='All'){
      this.filteredObservationStatus = this.filteredObservationStatus.sort((a, b) => (a.status < b.status) ? 1 : -1)
    }
    return this.filteredObservationStatus;
  }
  viewObservation(item:observation, ev:any){
    ev.stopPropagation();
    this.userService.setObservationData(item);
    this.loadingService.show();
    setTimeout(() => {
      this.loadingService.hide();
      this.router.navigate(['/tabs/tab2']);
    }, 500);
  }
  
  addObservation(){
      this.userService.observationData= new observation();
      this.router.navigate(['/tabs/tab2']);
  }
  segmentChanged(ev: any) {
    this.observationStatus= ev.detail.value;
    this.getBasedOnStatus();
  }
}
