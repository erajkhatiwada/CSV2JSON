import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  fileReaded;
  constructor() {}

  ngOnInit() {}

  convertFile(csv: any) {

    //this.fileReaded = csv.target.files[0];

    let reader: FileReader = new FileReader();
    this.fileReaded = csv.target.files[0];

    console.log(this.fileReaded);

    // reader.readAsText(this.fileReaded);

    // reader.onload = (e) => {
    //   let csv = reader.result;
    //   console.log(csv);
    // }

    reader.readAsText(this.fileReaded);

    reader.onload = (e) => {
      let csv = reader.result;
      console.log(csv);
      
    } 

  }
}
