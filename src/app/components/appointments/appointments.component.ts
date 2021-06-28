import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { UserService } from 'src/app/services';
import { TimepickerComponent } from '../timepicker/timepicker.component';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

  timepickerVisible = false;
  mytime: Date | undefined;
  slotArr: any[] = [];
  
  constructor(
    private _service : UserService,
    private dialog: MatDialog,
  ) {
  }

  selectedDate: Date = new Date;

  fromDate: string | undefined;
  toDate: moment.Moment | undefined;

  date = new Date();

  ngOnInit(): void {
   this.getSlotsData(this.selectedDate);
  }

  getSlotsData(date:any){
    const formattedDate = moment(date).format('DD-MM-YYYY');
    let getData = JSON.parse(localStorage.getItem('userDetails')!);
    let payload = {
      userId:getData?.id.toString(),
      slotDate:formattedDate
    }
    this._service.getSlots(payload).subscribe((res:any) => {
      this.slotArr = res?.data;
    })
  }

  openSlot(period:string){
    const dialogRef = this.dialog.open(TimepickerComponent,
      {
        panelClass: 'custom-timepicker',
        disableClose: true,
        data: {period: period,selectedDate:this.selectedDate}
      });
      dialogRef.afterClosed().subscribe((res:any) => {
        this.getSlotsData(this.selectedDate);
      })
  }

  slotFilter(date:any){
    this.selectedDate = date;
    this.getSlotsData(date);
  }

  onSelect(event:any){

    var dateFormat = 'DD/MM/YYYY';

    this.selectedDate= event;
    this.toDate = event;
    let d = (event.add(7,'day'))
    

    console.log(this.toDate); // 2015-30-01 02:00:00 
  }

  dateSelect(index: number){
   
    this.fromDate= "01/05/2020";

    const dateFormat = 'DD/MM/YYYY';
    
    console.log(this.fromDate);

    let d= moment(this.fromDate, dateFormat).toDate()

    console.log(moment.isMoment(d));
  }


}
