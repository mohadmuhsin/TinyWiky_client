import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MainServicesService } from 'src/app/services/main-services.service';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.css']
})
export class WikiComponent implements OnInit {
  title!:string | null
  htmlContent:any 
  constructor(
     private service :MainServicesService,
     private route :ActivatedRoute,
     private sanitizer: DomSanitizer
     ){}
  
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.title = params.get('title');
    });

    this.service.getWikiData(this.title).subscribe({
      next:(res)=>{
        this.htmlContent = res
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  
  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
 
}
