import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

/* Alphabet filter  values*/
alphabet: string[]=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

/* Alphabet filter selected alphabet */
filter_alphabet:string;

/* Region filter : filter_region: Selected Region, regions: Array of regions in data*/
filter_region:string="Region";
regions: string[]=[];

/* Search filter: search_text: Input text, name_matched,city_matched: boolean variables for comparison and pushing values*/
search_text: string="";
name_matched: boolean=true;
city_matched: boolean=true;

/* Sorted API data from DataURl*/
API_data: any[]=[];

/* Data  values used by array after applying filter*/
filtered_data: any[]=[];

  constructor(private data: DataService) { }

  ngOnInit() {  this.getData()
        
  }

/* Function to get data, sort it into API_data, and set it to list*/
 getData(): void {

    this.data.getdata()
        .subscribe(data => {
         this.API_data = data.sort(this.compare); 
         this.get_Region();
                            this.filter(this.API_data);});
       
  }

/* Function to set data into the list*/
   filter(data: any[]) : void{
    this.data.updateList(data);
  }

/* Function Alphabat filter */
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

/* Function Clear button*/
clear():void {
 this.filter_region="Region";
  this.filter_alphabet="";
  this.filtered_data=[];
  this.filter(this.API_data);
  this.data.updateSelected(undefined);
  this.search_text="";
}

/* Function Search bar on Input*/
search(text:any): void {
 
this.filtered_data=[];
this.filter_alphabet="";
  for (let entry of this.API_data) { 
  this.name_matched=true;
   this.city_matched=true;
   /* Loop for matching country name*/
              for (let index in text) { 
                     if(entry.name.charAt(index).toLowerCase()!=text.charAt(parseInt(index)).toLowerCase()) { 
                                                    this.name_matched=false; break; }
                                        }
                                        /* Loop formatching capital name*/
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

/* Function for comparison, used in sort function to arrange alphabetically*/
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

/* Function to get list of regions in data*/
get_Region():void{
  for (let entry of this.API_data) { 
    if(entry.region!=""&&this.regions.indexOf(entry.region)==-1)
    {this.regions.push(entry.region);}
     }
     }

/* Function filter by region*/
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
