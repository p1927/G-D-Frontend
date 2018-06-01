import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

/* Variable to hide/display countries list*/
list_view: boolean=true;

/* Variable for list*/
listdata: any[]=[];

/* Variable for selected country*/
selected: any;

  constructor(private data: DataService) { }


    ngOnInit() {  
 this.getSelected();
    this.getList();
       
  }

/* Get list of data*/
 getList(): void {

    this.data.list_service.subscribe(data => {this.listdata = data;
    											this.select(data[0]);
    											});
       
  }

/* Get selected country*/
   getSelected(): void {

    this.data.selected_service.subscribe(data => {this.selected = data; });
       
  }

/* Set selected country*/
    select(data:any) {
    this.data.updateSelected(data)
  }

}
