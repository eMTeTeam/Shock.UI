import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { NotificationService } from '../../services/notification.service';
import { LoadingService } from '../../services/loading.service';
import { ApiService } from '../../services/api.service';
import { UserService } from 'src/app/services/user.service';
import {  Observers } from 'src/app/entities/topglove.domain.model';

import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

 
  from: string = moment().format("YYYY-MM-DD");
  to: string = moment().format("YYYY-MM-DD");

  categoryList:Array<string>=Observers.category;
  activityTypeList:Array<string>=Observers.activityType;
  projectList:Array<string>= Observers.projectList;
  isShowFilter:boolean=false;

public pieChartOptions: ChartOptions = {
  responsive: true,
  };
 
  public pieChartLabels: Label[] = Observers.category;
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  public barChartOptions: ChartOptions = {
    responsive: true,
   
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{
      ticks: {
        beginAtZero : true,
        stepSize:1
      }
    }] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public barChartLabels: Label[] = ["Activity"];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataSets[] = [];



  public stackedBarChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{
      ticks: {
        beginAtZero : true,
        stepSize:1
      }
    }], yAxes: [{
     
    }] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public stackedBarChartLabels: Label[] = Observers.status;
  public stackedBarChartType: ChartType = 'horizontalBar';
  public stackedBarChartLegend = true;

  observationStatus:string="All";

  public stackedarChartData: ChartDataSets[] =
  [ 
    { data: [65, 70, 50], label:"status" },
  ];
  filterObject:any={
    fromDate:new Date().toUTCString(),
    toDate:new Date().toUTCString(),
      category:"All",
      activity:"All",
      project:"All",
  }
  countObject={
    All:0,
    Open:0,
    Inprogress:0,
    Closed:0
  }
  minDate:string=new Date().toUTCString();
  maxDate:string=new Date().toUTCString();
  constructor(private router: Router,
    private toast: NotificationService,
    private loadingService: LoadingService,
    private apiService: ApiService,
    public userService: UserService,
    private route: ActivatedRoute,) {

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
    }
   // this.loadData();
   this.route.queryParams.subscribe(params => {
    this.getAllObservations("");
    //this.setObservationList();
  });
  }

  getAllObservations(event){
    this.loadingService.show();
    this.apiService.GetAllObservations(this.userService.User).subscribe(
      (data: any) => {
        this.loadingService.hide();
        this.userService.observationList=data;
        this.countObject.All=data.length;
        this.countObject.Open=data.filter(a=>a.status=="Open").length;
        this.countObject.Inprogress=data.filter(a=>a.status=="Inprogress").length;
        this.countObject.Closed=data.filter(a=>a.status=="Closed").length;
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
     this.resetChartData();
   }
  }
  clearFilter(){
    this.filterObject.fromDate=this.minDate;
    this.filterObject.toDate=this.maxDate;
    this.filterObject.category="All";
    this.filterObject.activity="All";
    this.filterObject.project="All";
    this.resetChartData();
  }
  statusbarChartData:any=[];
  statusbarChartLabels:any=["Status"];

  segmentChanged(ev: any) {
    //console.log('Segment changed', ev);
    this.observationStatus= ev.detail.value;
    this.resetChartData();
  }
  resetChartDataRefresh(event){
    this.getAllObservations(event);
  }
  resetChartData(){

    var userValidList=this.userService.observationList.filter((data)=>{
      return ((new Date(data.dueDate) >=new Date(this.filterObject.fromDate)) 
      && (new Date(data.dueDate) <=new Date(this.filterObject.toDate)))&&
      (this.filterObject.activity=='All'?true:data.typeOfActivity==this.filterObject.activity)&&
      (this.filterObject.category=='All'?true:data.category==this.filterObject.category)&&
      (this.filterObject.project=='All'?true:data.projectName==this.filterObject.project)&&
      (this.observationStatus=='All'?true:data.status==this.observationStatus)&&
       (this.userService._user.toLowerCase()=='admin'?true:data.createdUser.toLowerCase()==this.userService._user.toLowerCase());
   });
    this.pieChartData=[];

    this.pieChartLabels.forEach((itemlabel)=>{
      var length=userValidList.filter((itemdata)=>{
        return itemlabel==itemdata.category;
      }).length;
      this.pieChartData.push(length);
    })
 

  
var counts = userValidList.reduce((p, c) => {
  var name = c.typeOfActivity;
  if (!p.hasOwnProperty(name)) {
    p[name] = 0;
  }
  p[name]++;
  return p;
}, {});

this.barChartData = Object.keys(counts).map(k => {
  return {label: k, data: [counts[k]]}; });


  var statuscounts = userValidList.reduce((p, c) => {
    var name = c.status;
    if (!p.hasOwnProperty(name)) {
      p[name] = 0;
    }
    p[name]++;
    return p;
  }, {});
  
  this.statusbarChartData = Object.keys(statuscounts).map(k => {
    return {label: k, data: [statuscounts[k]]}; });

  }
  

}
