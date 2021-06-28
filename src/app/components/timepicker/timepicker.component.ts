import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { UserService } from 'src/app/services';
import * as moment from 'moment';

@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss']
})
export class TimepickerComponent implements OnInit {
  fromTime: any;
  toTime: any;
  am: boolean = false;
  pm: boolean = false;

  constructor(
    private atp: AmazingTimePickerService,
    private router: Router,
    private dialogRef: MatDialogRef<TimepickerComponent>,
    @Inject(MAT_DIALOG_DATA) public receivedPopupStatus: any,
    private _service: UserService
  ) { }

  ngOnInit(): void {
  }

  open(period: string) {
    if(this.receivedPopupStatus?.period === "Morning"){
      this.am = true;
      this.pm = false;
    }
    else {
      this.am = false;
      this.pm = true;
    }
    const amazingTimePicker = this.atp.open({
      onlyAM:this.am,
      onlyPM:this.pm
    });
    amazingTimePicker.afterClose().subscribe((time:any) => {
      if(period === "from"){
        let dt = moment(time, ["HH:mm"]).format("hh:mm a");
        this.fromTime = dt;
      }
      else {
        let dt = moment(time, ["HH:mm"]).format("hh:mm a");
        this.toTime = dt;
      }
    });
  }

  addSlot(){
    let getData = JSON.parse(localStorage.getItem('userDetails')!);
    if(this.receivedPopupStatus?.period === "Morning"){
      let from = parseInt(this.fromTime);
      console.log(from);
      let to = parseInt(this.toTime);
      console.log(to);
    }
    const formattedDate = moment(this.receivedPopupStatus?.selectedDate).format('DD-MM-YYYY');
    let payload = {
      userId:getData?.id,
      slotDate:formattedDate,
      booked:"false",
      slotFrom:this.fromTime,
      slotTo:this.toTime,
      period:this.receivedPopupStatus?.period
    }
    console.log(payload);
    this._service.addSlots(payload).subscribe((res:any) => {
      console.log(res);
      this.closePopUp();
    })
  }

  closePopUp(){
    this.dialogRef.close('closed');
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

}
