import { Injectable } from '@angular/core';
import{ Http, URLSearchParams, Headers,Response } from '@angular/http';
import {environment} from "../environments/environment";
import{Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";


/* Generic methods to service*/ 

@Injectable()
export class ServiceConfig
{
    constructor(public http:Http){}
}


export abstract class Service
{
  protected http:Http;
  protected headers :Headers = new Headers();
  protected absoluteURL; 
  constructor(protected config: ServiceConfig,protected name:string) 
  { 
    this.http=config.http;
    this.headers.append('Authorization','JWT '+ environment.token);
    this.absoluteURL= name? environment.apiEndpoint+this.name+'/' : environment.apiEndpoint;
  }

  protected getImpl<T>(ext: string = null,params?:URLSearchParams) :Observable<T[]>
  {
    let url = ext? this.absoluteURL+ext : this.absoluteURL
    return this.http.get(url,{search : params, headers:this.headers})
                 .map((res: Response) => res.json())
 
                     
  }
} 