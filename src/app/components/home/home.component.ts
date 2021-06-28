import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  selectedTabName:any;

  constructor(
    private _service: UserService
  ) { }

  date = new Date();

  public tabName = [
    { name:"Queu",value: "0" },
    { name:"Earlier",value: "0" },
    { name:"Wait List",value: "0" },
    { name:"No Show",value: "0" }
  ]

  public patient:any[] = [];

  ngOnInit(): void {
    this.selectedTabName = "Queu";
    const formattedDate = moment(this.date).format('DD-MM-YYYY');
    let getData = JSON.parse(localStorage.getItem('userDetails')!);
    let payload = {
      userId:getData?.id.toString(),
      slotDate:formattedDate,
      booked:true
    }
    this._service.getPatients(payload).subscribe((res:any) => {
      console.log(res);
      this.patient = res?.data;
      this.tabName[0].value = res?.data.length;
    })
  }

  onTabChange(tab:any){
    console.log(tab);
    this.selectedTabName = tab;
    if(tab != "Queu"){
      this.patient = [];
    }
    else {
      this.ngOnInit();
    }
  }

}
