
import { Inject, inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const _Router=inject(Router);
  // check global type of browser here or not


  if(typeof localStorage!=='undefined'){
    if(localStorage.getItem('userToken')!==null){
      return true;
      //browser
    }
  else{
    _Router.navigate(['login'])
    return false;
  }
}else{
  return false;
}
};




