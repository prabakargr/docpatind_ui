import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';  
import { UserService } from 'src/app/services';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  title = 'reactiveforms';  

  signupform!: FormGroup;  
  constructor(  
    private fb: FormBuilder,  
    private router:Router,
    private serviceUser:UserService
  ) {  
  
  
  }  
  

  ngOnInit(): void {
    this.signupform=this.fb.group({
      name:[''],
      age:[''],
      gender:[''],
      contact:[''],
      userType:[''],
      email:[''],
      password:['']
    })
  }

  createUser(){
    console.log(this.signupform.value);
    let payload=this.signupform.value;
    this.serviceUser.createUser(payload).subscribe((responceData:any)=>{
      if(responceData && responceData?.token){
        localStorage.setItem('token',JSON.stringify(responceData.token));
        this.router.navigate(['/home'])
      }
      
    })
    
    
  }

  loginPage(){
    this.router.navigate(["/login"]);
  }

}
