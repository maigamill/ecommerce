import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,NgClass,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

   msgSuccess:boolean=false;
    msgError:string="";
    isLoading:boolean=false;
    registerSub !:Subscription
  // service form builder
  private readonly _formBuilder=inject(FormBuilder);
  // we use it to navigate
  private readonly _Router=inject(Router);
  
  // depend on this service
    private readonly _AuthService=inject(AuthService);
  // formvalidators
  loginForm:FormGroup=this. _formBuilder.group({
    email:[null,[Validators.required,Validators.email]],
    password:[null,[Validators.required,Validators.pattern(/^\w{6,}$/)]],
  
  
  
  
  })
  
  
  
  
  
  
  
    loginSubmit():void{
      // console.log(this.loginform.value); لما اعمل 
      // call api
      if(this.loginForm.valid){
        this.isLoading=true;
  
        this._AuthService.setLoginForm(this.loginForm.value).subscribe({
          next:(res)=>{
  
            console.log(res);
            if(res.message=='success')
              this.msgSuccess=true;
              {setTimeout(()=>{
  
                localStorage.setItem('userToken',res.token)
                this._AuthService.saveUserData()
                this._Router.navigate(['/home'])
               
  
            },1000);
  
            }
            this.isLoading=false;
  
        
  
  
           
          },
          error:(err:HttpErrorResponse)=>{
  
            this.msgError=err?.error?.message;
            console.log(err);
  
            this.isLoading=false;
          }
  
              })
  
      }else{
        this.loginForm.setErrors({misMatch:true})
        this.loginForm.markAllAsTouched()
  
      }
  
  
  
    }
  
  
  // check pass and repass
  
   

}
