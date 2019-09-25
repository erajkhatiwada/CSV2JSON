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

    let reader: FileReader = new FileReader();

    this.fileReaded = csv.target.files[0];
    console.log(this.fileReaded);

    reader.readAsText(this.fileReaded);

    reader.onload = (e) => {
      let csv = reader.result;
      let arr  = csv.toString().split(/\r|\n|\r/);

      let property = arr[0].split(',');
      console.log(arr,"Main array");
      console.log(property,"Properties");

      let jsonArray = [];

      for(let index in arr){
        if(parseInt(index) != 0){
          if(arr[index] !== ""){
            let obj = arr[index].split(',');
            let jsonObj = {};
            for(let propIndex in property){
              jsonObj[property[propIndex]] = obj[propIndex];
            }
            jsonArray.push(jsonObj);
          }
        }
      }

      console.log(jsonArray, "JSON array");
       
      const a = document.createElement("a");
      a.style.display = "none";
      document.body.appendChild(a);

      let x = new Blob([JSON.stringify(jsonArray)],{type: 'application/json'});
      a.href = URL.createObjectURL(x);

      a.download = 'download.json';
      a.click();
   

    } 

  }
}
