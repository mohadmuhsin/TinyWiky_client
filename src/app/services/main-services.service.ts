import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class MainServicesService {
  cookieValue!: string;
  constructor( private http:HttpClient,
    private cookieService: CookieService,) {
      this.cookieValue = this.cookieService.get('refreshToken');
     }

     
    url : string = "http://localhost:3000"
    
    search(searchTerms:string){
      return this.http.get(`${this.url}/search/${searchTerms}`,{withCredentials:true},)
    }
    
    getWikiData(key:string|null){
      return this.http.get(`${this.url}/read/${key}`,{withCredentials:true})
    }
    
    getHistory(order:string){
      return this.http.get(`${this.url}/history/${order}`,{withCredentials:true})
    }

    getVisitedPages(){
      return this.http.get(`${this.url}/visited/pages`,{withCredentials:true})
    }
    
    login(data:{}){
      return this.http.post(`${this.url}/admin/login`,{data},{withCredentials:true});
    }
    
    logout(){
      return this.http.post(`${this.url}/logout`,{},{withCredentials:true});
    }
    refreshToken(){
     const cookieValue = this.cookieService.get('refreshToken');
    return this.http.get(`${this.url}/refresh/token/${cookieValue}`,{withCredentials:true})
    }
}
