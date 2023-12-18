import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { first } from 'rxjs';
import { MainServicesService } from 'src/app/services/main-services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
  searchText:string = ""
  loading:Boolean = false
  data:any[]=[]
  constructor( private service :MainServicesService,
    private sanitizer: DomSanitizer
    ){}

  search(){
    if(this.searchText.trim()!== ""){
      this.loading = true
      this.service.search(this.searchText).pipe(first()).subscribe({
        next:(res:any)=>{
          
          console.log(typeof(res));
          
          this.data = res
          this.loading = false
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }


  
}
