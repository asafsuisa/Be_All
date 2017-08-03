import { Component,ViewChild,OnInit,AfterContentInit}       from '@angular/core';
import {SearchService}                                      from "../services/searchService";
import {Router,NavigationEnd }                              from '@angular/router';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/share';


/* Main page component*/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{
  selected;                 //The selected child component-(Member or copmany)
  selectedRoute;            //The type of the current route.
  routes=                 
  [
    {type:'Members',route:''},
    {type:'Members',route:'members'},
    {type:'Companies',route:'companies'}
  ];

  //Maps any route to name(route)-> type
  routesMap:{ [routePath:string]: string } = {};

  constructor(private searchService:SearchService,public router:Router)
  {
      //Build routeMap element
      this.routes.forEach(route => this.routesMap[route.route] = route.type);
  }
  
  ngOnInit()
  { 
      /*Gets any time route change and finish navigation - the current relative url and search
        for the current relevant type in routesMap*/
      this.router.events.filter(event=> event instanceof NavigationEnd)
      .subscribe(event=>
      {
        this.selectedRoute=this.routesMap[event['url'].substring(1)]
      }); 
  }

  //When new component load
  changeComponent(event)
  {
    this.selected = event;
  }

  /*When there is a change in the input field - Its anounced all the live child componenets that new
    search has been activated*/
  annocedSearch()
  {
     this.searchService.parentToChild();
  }
  
  /*Activate new route navigation*/ 
  changeRoute(route)
  {
    this.selectedRoute=route;
    this.router.navigate(['/'+route]);
  
  }

}
  