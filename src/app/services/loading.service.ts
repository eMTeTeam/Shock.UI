import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    loading: HTMLIonLoadingElement;
    interval: any;

    constructor(public loadingController: LoadingController) {

     }

    show =  () => {
        this.loadingController.create({
            message: ''
          }).then((res) => {
            res.present();
          });
    }


    hide= ()=>{
        setTimeout(() => {
            this.loadingController.dismiss().then((res) => {
                // console.log('Loading dismissed!', res);
               }).catch((error) => {
                 console.log('error', error);
                 //this.hide();
                 this.loadingController.dismiss()
               });
        }, 1000);
       
    }

    // hide = () => {

    //     setInterval(() => {
    //         this.dismiss();
    //     }, 1000);

    //     this.dismiss();
    // }

    private dismiss = () => {
        if (this.loading) {
            this.loading.dismiss();
            this.clear();
        }
    }

    clear = () => {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
}
