import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';
import { Observers } from 'src/app/entities/topglove.domain.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  public _user: string = null;
  public _isSuperUser: boolean = false;
  public observationData:  observation = new observation();
  public observationList:Array<observation>= Observers.observationInitialList;

  public refreshDataSource = new Subject<any>();

  setMessage(value: any) {
    this.refreshDataSource.next(this.observationList); //it is publishing this value to all the subscribers that have already subscribed to this message
  }

  setObservationData(data:observation){
    return this.observationData=data;
  }
  addObservationList(data:observation){
    this.observationList.push(data);
  }
  constructor() {
    this.load();
  }

  load = () => {
    if (this.isValid()) {
      const user = localStorage.getItem("userId");

      if (user) {
        this._user = user;
      }
    }
  }

  isValid = () => {
    const user = localStorage.getItem("userId");

    if (!user) {
      return false;
    }

    return true;
  }

  get User(): string {
    return this._user;
  }

  set User(user: string) {
    localStorage.setItem("userId", user);
    this._user = user;
  }

  get IsSuperUser(): boolean {
    return this._isSuperUser;
  }

  set IsSuperUser(flag: boolean) {
    localStorage.setItem("isSuperUser", flag + '');
    this._isSuperUser = flag;
  }
}

export class observation{
  id:string="";
  refNo:number=0;
  name: string="";
  description: string="";
  status: string="";
  dueDate:string=new Date().toISOString();
  category: string="";
  typeOfActivity: string="";
  agreedAction: string="";
  actionOwner: string="";
  evidence:string="NA";
  createdUser:string="";
  dateCreated:string=new Date().toISOString();
  dateModified:string=new Date().toISOString();
  projectName:string="";
  projectLocation:string="";
  isExpand:boolean=false;
}