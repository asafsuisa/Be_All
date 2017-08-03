import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import {Router,NavigationEnd}       from '@angular/router';
@Injectable()
export class SearchService {
 
  currSearch:string;          //The current value of the input field
  hasPreSearch:boolean=false; //If company clicked and we have to filter our page on initialization with value.

  // Observable string sources - create a listenner to the changes in the einput field.
  private parentToChildSearch = new Subject<string>();

 
  // Observable string streams
  parentToChildSearch$ = this.parentToChildSearch.asObservable();

 
  constructor(public router: Router){
          this.router.events.subscribe(event=>
        {
             if(event instanceof NavigationEnd) {
                 if (!this.hasPreSearch) this.currSearch="";
             }
        });
  }
  // Service message commands
  parentToChild() { 
    this.parentToChildSearch.next(this.currSearch);
    this.hasPreSearch=false;
  }
 
  // Activate when company was clicked by member page.
   companyCilcked(search: string) {
        this.hasPreSearch=true;
        this.currSearch=search;
        this.router.navigate(['/companies']);
  
  }


}