import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  fileReaded: any;
  bloadLink: any;
  isDownloadReady: boolean = false;
  message: any;
  errorMessage: any;

  constructor() {}

  ngOnInit() {}

  convertFile(csv: any) {

    let reader: FileReader = new FileReader(); //file reader object

    this.fileReaded = csv.target.files[0]; //get file details
    reader.readAsText(this.fileReaded); //reading as text 

    // when the reader is loading
    reader.onload = (e) => {
      this.errorMessage = "";
      this.message = "";
      let csv = reader.result;
      let arr = csv.toString().split(/\r|\n|\r/);

      let property = arr[0].split(',');
      // console.log(arr, "Main array");
      // console.log(property, "Properties");

      let jsonArray = []; // data array

      for (let index in arr) {
        if (parseInt(index) != 0) {
          if (arr[index] !== "") {
            let obj = arr[index].split(',');
            let jsonObj = {};
            for (let propIndex in property) {
              jsonObj[property[propIndex]] = obj[propIndex];
            }
            jsonArray.push(jsonObj);
          }
        }
      }
      //console.log(jsonArray, "JSON array");
      const a = < HTMLLinkElement > document.getElementById("a");
      //console.log(a);
      let x = new Blob([JSON.stringify(jsonArray)], {
        type: 'application/json',
      });

      a.href = URL.createObjectURL(x);
      this.bloadLink = a.href;
    }

    reader.onerror = (e) => {
      console.error(e);
      this.errorMessage = "Something went wrong. Please put a valid csv file.";
      reader.abort();
    }

    reader.onloadend = (e) => {
      this.isDownloadReady = true;
      this.message = 'The file is converted successfully. Click on download button to download .json file.';

      setTimeout(() => {
        this.message = "";
        reader.abort();
      }, 6000);
    }


  }

  /**
   * Method to download the converted json
   */
  download(): void {
    var x = < HTMLLinkElement > document.getElementById("a");
    x.click();
  }

} 
