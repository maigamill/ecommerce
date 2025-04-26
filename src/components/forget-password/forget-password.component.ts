import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  private readonly _AuthService=inject(AuthService)
  private readonly _router=Inject(Router)

  step:number=1;

  verifyEmail:FormGroup= new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email])
  })

  
  verifyCode:FormGroup= new FormGroup({
    resetCode:new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]{6}$/)])
  })



  ResetPassword:FormGroup= new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    newPassword:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)])

    
  })




  verifyEmailSubmit():void{
   let emailValue= this.verifyEmail.get('email')?.value
   this.ResetPassword.get('email')?.patchValue(emailValue)
    this._AuthService.setEmailVerify(this.verifyEmail.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.statusMsg==='success'){
          this.step=2;

        }
        
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }




  verifyCodeSubmit():void{
    this._AuthService.setCodeVerify(this.verifyCode.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.status==='Success'){
          this.step=3;

        }
        
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }





  resetPasswordSubmit():void{
    this._AuthService.setResetPass(this.ResetPassword.value).subscribe({
      next:(res)=>{
        console.log(res);
        localStorage.setItem('userToken', res.token);
        this._AuthService.saveUserData()
        this._router.navigate(['/home'])

        
        
      },
      error:(err)=>{
        console.log(err)
      }
      
    })

  }

}
