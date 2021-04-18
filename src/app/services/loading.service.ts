import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    loading: HTMLIonLoadingElement;
    interval: any;

    constructor(public loadingController: LoadingController) { }

    show = async () => {
        this.loading = await this.loadingController.create();

        await this.loading.present();
    }

    hide = () => {

        setInterval(() => {
            this.dismiss();
        }, 1000);

        this.dismiss();
    }

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
