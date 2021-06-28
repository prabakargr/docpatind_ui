import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'doctor';
  routeUrl: string | undefined;
  localData=localStorage.getItem("token") 
  
  constructor(
    private router: Router,
  ){
    router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd ) {
        this.routeUrl = event.url;
        console.log(this.routeUrl);
      }
    });
   }

  ngOnInit(){
  this.routeUrl = this.router.config[0].path;
  console.log(this.routeUrl);
}

appoint(){
  this.router.navigate(["/appointments"]);
}

walkin(){
  this.router.navigate(["/home"]);
}

logout(){
  localStorage.removeItem('userDetails');
  this.router.navigate(["/login"]);
}

}
