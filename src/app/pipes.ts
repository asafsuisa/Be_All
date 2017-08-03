import { Pipe, PipeTransform } from '@angular/core';

/*Pipe to get full city name.*/

@Pipe({name: 'full_city_name'})
export class FullCityNamePipe implements PipeTransform 
{
  transform(value: string): string 
  {
    switch (value)
    {
        case "TLV":
            return "Tel Aviv";
            
        case "GVT": 
            return "Givatayim"; 

        case "RMG" :
            return "Ramat Gan"
        default:
            return value;
        
    }
  }
}