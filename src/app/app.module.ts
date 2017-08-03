import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppComponent } from './app.component';
import {MemberComponent} from './memberComponent/member.component';
import {CompanyComponent} from './companyComponent/company.component';
import {FullCityNamePipe} from './pipes'; 
import { FormsModule } from '@angular/forms';
import {memberListComponent} from './memberListComponent/memberList.component';
import {companyListComponent} from './companyListComponent/companyList.Component';
import { RouterModule, Routes } from '@angular/router';
import {HashLocationStrategy,LocationStrategy} from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap';
/*Services */
import {Service,ServiceConfig} from '../services/services';
import {MembersService} from '../services/restServices/members-service';
import {CompanyService} from '../services/restServices/company-service';
import {SearchService} from '../services/searchService';

/*Routes */
const appRoutes: Routes = [
  { path: 'members', component: memberListComponent },
  { path: 'companies', component: companyListComponent },
  { path: '',   redirectTo: '/members', pathMatch: 'full' }
]

@NgModule({
  declarations: [ 
    AppComponent,
    MemberComponent,
    FullCityNamePipe,
    memberListComponent,
    CompanyComponent,
    companyListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BsDropdownModule.forRoot()
  ],
  providers: [ServiceConfig,MembersService,CompanyService,SearchService,
              {provide: LocationStrategy, useClass:HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
