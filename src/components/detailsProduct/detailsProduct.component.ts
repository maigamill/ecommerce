import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Iproduct } from '../../interfaces/iproduct';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './detailsProduct.component.html',
  styleUrl: './detailsProduct.component.scss'
})
export class DetailsProductComponent implements OnInit {
    private readonly _ToastrService=inject(ToastrService)
   private readonly _CartService=inject(CartService)
  private readonly _ActivatedRoute =inject(ActivatedRoute)
  private readonly _ProductsService=inject(ProductsService)
  detailsProduct:Iproduct|null=null;
  ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(p)=>{
      let idProduct=p.get('id')
      this._ProductsService.getSpecificProduct(idProduct).subscribe({
        next:(res)=>{
              console.log(res.data)
              this.detailsProduct=res.data;
        },
        error:(err)=>{
          console.log(err)
        }
      })

    }
  })
}

addCart(id:string):void{
  this._CartService.addProductToCart(id).subscribe({

    next:(res)=>{
      console.log(res)
      this._ToastrService.info(res.message, 'Trendy Store')
      console.log(this._CartService.cartNumber)
      // cart counter
      this._CartService.cartNumber.next(res.numOfCartItems)
    },
    error:(err)=>{
      console.log(err)
    }
  })
}


}
