import { Component,Input} from '@angular/core';
import {Company} from '../../models/company';


/*
  Represent one company element.
*/

@Component({
  selector: 'company',
  templateUrl: './company.component.html',
  styleUrls: ['../memberComponent/member.component.css']
})
export class CompanyComponent{
    @Input()
    company:Company;



}