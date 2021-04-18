import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { AvatarModule } from 'ngx-avatar';

const avatarColors = ["#16438b"];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    AvatarModule,
    AvatarModule.forRoot({ colors: avatarColors }),
    ReactiveFormsModule
  ],
  declarations: [
    Tab1Page]
})
export class Tab1PageModule { }
