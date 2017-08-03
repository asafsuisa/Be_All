import { Component,Input} from '@angular/core';
import {Member} from '../../models/member';
import {SearchService} from "../../services/searchService";

/*
  Represent one member element.
*/


@Component({
  selector: 'member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})

export class MemberComponent{
    @Input()
    member:Member;
    constructor(private searchService:SearchService){}

  companyClicked()
  {
    this.searchService.companyCilcked(this.member.company.name);
  }

}