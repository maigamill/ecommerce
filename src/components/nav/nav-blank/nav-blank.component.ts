import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-nav-blank',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit {
cartCount:number=0;
 private readonly _AuthService=inject(AuthService);
 private readonly _CartService=inject(CartService);


 ngOnInit(): void {
  //cart products
  this._CartService.getProductsCart().subscribe({
    next:(res)=>{
      console.log('cart items', res)
      this._CartService.cartNumber.next(res.numOfCartItems)
    },
  })
  this._CartService.cartNumber.subscribe({
    next:(data)=>{
      this.cartCount=data;
    },
  })
  
 }








 logOut():void{
  this._AuthService.signOut()
 }
   }


