import { Component,OnInit,AfterContentInit,OnDestroy} from '@angular/core';
import {MembersService} from '../../services/restServices/members-service';
import {Member} from '../../models/member';
import {searchObject} from '../../models/memberSearch';
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {SearchService} from "../../services/searchService";
import { Subscription }   from 'rxjs/Subscription';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/share';

/*
  Represent a members list object - containing all the element accodring to a given filter.
*/


@Component({
  selector: 'member-list',
  templateUrl: './memberList.component.html',
  styleUrls: ['./memberList.component.css']
})
export class memberListComponent implements OnInit,AfterContentInit,OnDestroy {
  private searchSubject = new Subject<searchObject>();
  current_member_search:searchObject;
  member_list:Member[];
  subscription: Subscription;

  constructor(private memberService:MembersService,private searchService:SearchService)
  {
      this.current_member_search={name:"",page:"1",page_size:"10"}
      //If new filter value entered in the search field - active new search operation.
      this.subscription = searchService.parentToChildSearch$.subscribe(
          search =>
          {
              this.search(search);
          }
      )
  }

  ngOnInit()
  {
    this.searchSubject.debounceTime(500).distinctUntilChanged(null,search=>search.name)
        .switchMap(search=> this.memberService.getMembersDetails(search)).share()
        .subscribe(response=>
          {
            this.member_list = response.results;
          });
  }

  ngAfterContentInit()
  {
     this.searchSubject.next(this.current_member_search);
  }
  //Search new value by using the stream that created on ngOnInit.
  search(value:string)
  {
    let search = Object.assign({},this.current_member_search);
    search.name=value;
    this.searchSubject.next(search); 
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }

}
  