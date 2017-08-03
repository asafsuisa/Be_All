import { Injectable } from '@angular/core';
import{ Http,Jsonp, URLSearchParams, Headers,Response } from '@angular/http';
import{Observable} from "rxjs/Observable";
import {Service, ServiceConfig} from "../services";
import {searchObject} from '../../models/memberSearch';

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

/* Service to company object*/
@Injectable()

export class CompanyService extends Service
{
    constructor(config:ServiceConfig)
    {
       super(config,"companies") 
    }

    getCompaniesDetails(companySearch:searchObject): Observable<any>
    {
        let params = new URLSearchParams();
        if(companySearch.name) params.append("name",companySearch.name);
        if(companySearch.page_size) params.append("page_size",companySearch.page_size);
        if (companySearch.page) params.append("page",companySearch.page);
       
        return this.getImpl("directory",params);
    }
}  