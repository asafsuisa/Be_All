import { Component,OnInit,AfterContentInit,OnDestroy} from '@angular/core';
import {CompanyService} from '../../services/restServices/company-service';
import {Company} from '../../models/company';
import {searchObject} from '../../models/memberSearch';
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import { Subscription }   from 'rxjs/Subscription';
import {SearchService} from "../../services/searchService";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/share';


/*
  Represent a companies list object - containing all the element accodring to a given filter.
*/
@Component({
  selector: 'company-list',
  templateUrl: './companyList.Component.html',
  styleUrls: ['./companyList.Component.css']
})
export class companyListComponent implements OnInit,AfterContentInit,OnDestroy {
  private searchSubject = new Subject<searchObject>();
  current_company_search:searchObject;
  company_list:Company[];
  subscription: Subscription;


  constructor(private companyService:CompanyService,private searchService:SearchService)
  {
      this.current_company_search={name:"",page:"1",page_size:"10"}
      //If new filter value entered in the search field - active new search operation.
      this.subscription = searchService.parentToChildSearch$.subscribe(
          search =>
          {
              this.search(search);
          });
  }

  ngOnInit()
  {
    //Send Rest request to any new input value.
    this.searchSubject.debounceTime(500).distinctUntilChanged(null,search=>search.name)
        .switchMap(search=> this.companyService.getCompaniesDetails(search)).share()
        .subscribe(response=>
          {
            this.company_list = response.results; 
          });
  }

  ngAfterContentInit()
  {
    if (this.searchService.hasPreSearch)
    {
        this.searchService.parentToChild()
    }
    else
    {
        this.searchSubject.next(this.current_company_search);
    }
  }
  //Search new value by using the stream that created on ngOnInit
  search(value:string)
  {
    let search = Object.assign({},this.current_company_search);
    search.name=value;
    this.searchSubject.next(search); 
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }
}
  