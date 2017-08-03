import {Company} from './company';
import {Location} from './location';
import{Skill} from './skill';

export interface Member
{
    first_name?:string
    last_name?:string
    company?:Company;
    location?:Location;
    profile_picture_url?:string;
    skills?:Skill[];
    title?:string; 
    uuid?:string;
}