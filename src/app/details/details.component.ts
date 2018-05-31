import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

country: any={}

  constructor(private data: DataService) { }

  ngOnInit() {
   this.data.selected_service.subscribe(data => { this.country = data;});
  
  }

}
