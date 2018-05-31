import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

alphabet: string[]=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

filter_alphabet:string;

filter_region:string="Region";
regions: string[]=[];

search_text: string="";
name_matched: boolean=true;
city_matched: boolean=true;

API_data: any[]=[];
filtered_data: any[]=[];

  constructor(private data: DataService) { }

  ngOnInit() {  this.getData()
        
  }

 getData(): void {

    this.data.getdata()
        .subscribe(data => {
         this.API_data = data.sort(this.compare); 
         this.get_Region();
                            this.filter(this.API_data);});
       
  }

   filter(data: any[]) : void{
    this.data.updateList(data);
  }

text_filter() : void { 
  this.search_text="";
  this.filtered_data=[];
  for (let entry of this.API_data) { 
    if(entry.name.charAt(0)==this.filter_alphabet)
    {  this.filtered_data.push(entry);
    }
  }
  this.filter(this.filtered_data);

}

clear():void {
 this.filter_region="Region";
  this.filter_alphabet="";
  this.filtered_data=[];
  this.filter(this.API_data);
  this.data.updateSelected(undefined);
  this.search_text="";
}

search(text:any): void {
 
this.filtered_data=[];
this.filter_alphabet="";
  for (let entry of this.API_data) { 
  this.name_matched=true;
   this.city_matched=true;
              for (let index in text) { 
                     if(entry.name.charAt(index).toLowerCase()!=text.charAt(parseInt(index)).toLowerCase()) { 
                                                    this.name_matched=false; break; }
                                        }
  if(this.name_matched==false){
              for (let index in text) { 
                     if(entry.capital.charAt(index).toLowerCase()!=text.charAt(parseInt(index)).toLowerCase()) { 
                                                    this.city_matched=false; break; }
                                        }
                              }
             if(this.name_matched==true||this.city_matched==true){this.filtered_data.push(entry);}
}
  
  this.filter(this.filtered_data);


}

compare(a:any, b:any) {
  const A = a.name.toUpperCase();
  const B = b.name.toUpperCase();
  
  let comparison = 0;
  if (A > B) {
    comparison = 1;
  } else if (A < B) {
    comparison = -1;
  }
  return comparison;
}

get_Region():void{
  for (let entry of this.API_data) { 
    if(entry.region!=""&&this.regions.indexOf(entry.region)==-1)
    {this.regions.push(entry.region);}
     }
     }

filterByRegion():void{ 
    this.filtered_data=[];
this.filter_alphabet="";
 this.search_text="";
     for (let entry of this.API_data) {   
    if(this.filter_region!="Region"&& entry.region==this.filter_region)
    {this.filtered_data.push(entry);}
}
 this.filter(this.filtered_data);

}

}
