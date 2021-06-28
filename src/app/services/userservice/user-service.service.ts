import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL="http://localhost:4000/api"
  // baseURL = "http://b1f960724ed4.ngrok.io/api"
  constructor(
    private http:HttpClient,
  ) { }

  createUser<Observable>(postData:any){
   return this.http.post(this.baseURL+'/user/signup',postData)
  }

  loginUser<Observable>(postData:any)
  {
    return this.http.post(this.baseURL+'/user/login',postData)
  }

  getSlots(payload:any){
    return this.http.post(this.baseURL + "/slot/findSlots", payload);
  }

  addSlots(payload:any){
    return this.http.post(this.baseURL + "/slot/create", payload);
  }

  getPatients(payload:any){
    return this.http.post(this.baseURL + "/slot/slotsByUser", payload);
  }

}
