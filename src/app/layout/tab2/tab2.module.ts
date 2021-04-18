import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { AvatarModule } from 'ngx-avatar';

import { Tab2PageRoutingModule } from './tab2-routing.module';

const avatarColors = ["#FFB6C1", "#2c3e50", "#95a5a6", "#f39c12", "#1abc9c"];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AvatarModule.forRoot({ colors: avatarColors }),
    Tab2PageRoutingModule,
  ],
  declarations: [Tab2Page],
  providers: []
})
export class Tab2PageModule { }

