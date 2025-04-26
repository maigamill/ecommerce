import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';

import { CurrencyPipe } from '@angular/common';
import { Icart } from '../../interfaces/icart';



@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  private readonly _CartService=inject(CartService);
  cartdetails:Icart= {} as Icart;

  ngOnInit(): void {
    
    this._CartService.getProductsCart().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.cartdetails=res.data
        
      },
      error:(err)=>{
        console.log(err)
      }
  
    })
  }

  removeItem(id:string):void{
    this._CartService.deleteSpecificCartItem(id).subscribe({
      next:(res)=>{
        console.log(res.data)
        this.cartdetails=res.data
        this._CartService.cartNumber.next(res.numOfCartItems)
        
      },
      error:(err)=>{
        console.log(err)
      }
  
    })
  }



 updateCount(id:string,count:number):void{
    if(count>0){
      this._CartService.updateProductQuntity(id,count).subscribe({
        next:(res)=>{
          console.log(res.data)
          this.cartdetails=res.data
          
        },
        error:(err)=>{
          console.log(err)
        }
    
      })
    }
   
    }

   clearItems():void{
      
        this._CartService.clearCart().subscribe({
          next:(res)=>{
            console.log(res.data)
            if(res.message=='success'){
              this.cartdetails = { products: [] as any[] } as Icart;

              this._CartService.cartNumber.next(0)

            }
            
            
          },
          error:(err)=>{
            console.log(err)
          }
      
        })
      
     
      } 

}
