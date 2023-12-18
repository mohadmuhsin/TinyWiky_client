import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainServicesService } from 'src/app/services/main-services.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit{
  formData!:FormGroup
  validate!:string
  constructor(
    private service:MainServicesService,
    private formBuilder:FormBuilder,
    private router:Router
  ){}

  ngOnInit(): void {
    this.formData = this.formBuilder.group({
      email:["",[Validators.required, Validators.email]],
      password:["",[Validators.required, Validators.minLength(6)]]
    })
  }

  login(){
    if(this.formData.valid){
      let authData = this.formData.getRawValue()
      
      this.service.login(authData).subscribe({
        next:(res:any)=>{
          localStorage.setItem("tok",res.access)
          
          // localStorage.setItem("ret",res.retok)
          this.router.navigate(['/charts'])
        }, error: (err) => {
          this.validate = err.error.message;
        }
      })
    }
    
  }
}
