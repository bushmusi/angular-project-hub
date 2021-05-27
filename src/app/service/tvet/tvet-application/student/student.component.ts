import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  public Students: any;
  
  public Types = [
    { label: "Type1", value: "Type1" },
    { label: "Type2", value: "Type2" }
  ];
  
  constructor() { }

  ngOnInit() {
  }

}
