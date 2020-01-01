import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuardService} from './auth/services/auth-guard.service';
import { AuthService} from './auth/services/auth.service';
import { IndexComponent } from './index/index.component';
import { NavIndexComponent } from './nav-index/nav-index.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NavIndexComponent,
    FourOhFourComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [AuthGuardService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
