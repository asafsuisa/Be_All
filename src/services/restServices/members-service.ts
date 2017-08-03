import { Injectable } from '@angular/core';
import{ Http,Jsonp, URLSearchParams, Headers,Response } from '@angular/http';
import{Observable} from "rxjs/Observable";
import {Service, ServiceConfig} from "../services";
import {searchObject} from '../../models/memberSearch';

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

/* Service to member object*/
@Injectable()

export class MembersService extends Service
{
    constructor(config:ServiceConfig)
    {
       super(config,"members") 
    }

    getMembersDetails(memberSearch:searchObject): Observable<any>
    {
        let params = new URLSearchParams();
        if(memberSearch.name) params.append("name",memberSearch.name);
        if(memberSearch.page_size) params.append("page_size",memberSearch.page_size);
        if (memberSearch.page) params.append("page",memberSearch.page);
       
        return this.getImpl("directory",params);
    }
} 