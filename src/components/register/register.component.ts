
import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {


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
registerForm:FormGroup=this. _formBuilder.group({
  name:[null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
  email:[null,[Validators.required,Validators.email]],
  phone:[null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
  password:[null,[Validators.required,Validators.pattern(/^\w{6,}$/)]],
  rePassword:[null],



},{validators:[this.checkPassword]})







  registerSubmit():void{
    // console.log(this.registerform.value); لما اعمل 
    // call api
    if(this.registerForm.valid){
      this.isLoading=true;

      this.registerSub=this._AuthService.setRegisterForm(this.registerForm.value).subscribe({
        next:(res)=>{

          console.log(res);
          if(res.message=='success')
            this.msgSuccess=true;
            {setTimeout(()=>{
              // save token
              // decode token
              localStorage.setItem('userToken',res.token)
              // navigate
              this._Router.navigate(['/login'])
             

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
      this.registerForm.setErrors({misMatch:true})
      this.registerForm.markAllAsTouched()

    }



  }


// check pass and repass

  checkPassword(form:AbstractControl){
    if(form.get('password')?.value===form.get('rePassword')?.value)
    {
      return null
    }
    else{
      return{misMatch:true}
  
    }
  }

}
