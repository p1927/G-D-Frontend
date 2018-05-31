import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

list_view: boolean=true;
listdata: any[]=[];
selected: any;

  constructor(private data: DataService) { }


    ngOnInit() {  
 this.getSelected();
    this.getList();
       
  }

 getList(): void {

    this.data.list_service.subscribe(data => {this.listdata = data;
    											this.select(data[0]);
    											});
       
  }

   getSelected(): void {

    this.data.selected_service.subscribe(data => {this.selected = data; });
       
  }

    select(data:any) {
    this.data.updateSelected(data)
  }

}
