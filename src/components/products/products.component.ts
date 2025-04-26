import { Component, inject, OnInit } from "@angular/core";
import { Iproduct } from "../../interfaces/iproduct";
import { ProductsService } from "../../services/products.service";
import { Subscription } from "rxjs";
import { NgFor, NgIf, UpperCasePipe } from "@angular/common";
import { CartService } from "../../services/cart.service";
import { ToastrService } from "ngx-toastr";
import { RouterLink } from "@angular/router";
import {NgxPaginationModule} from 'ngx-pagination'; 

import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-products',
  imports: [UpperCasePipe,RouterLink,NgxPaginationModule,NgFor,NgIf],
  templateUrl:'./products.component.html' ,
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
private readonly _productsService=inject(ProductsService)
 
  private readonly _CartService=inject(CartService)
  private readonly _ToastrService=inject(ToastrService)
 
  productsList:Iproduct[]=[];
  pageSize:number=0;
  getAllProductSub !:Subscription
  currentPage:number=1
  totalPages:number=0
 
 
 

  ngOnInit(): void {
   
 
  

  this.getAllProductSub= this._productsService.getAllProduct().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.productsList=res.data;
        this.pageSize=res.metadata.limit
        this.currentPage=res.metadata.currentPage
        this.totalPages=res.results
        
      },
      error:(err)=>{
        console.log(err)
      }

    })
  }

  


  

 





  addCart(id:string):void{
    this._CartService.addProductToCart(id).subscribe({

      next:(res)=>{
        console.log(res);
        this._ToastrService.info(res.message, 'Trendy Store')
        console.log(this._CartService.cartNumber)
        this._CartService.cartNumber.next(res.numOfCartItems)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }



  onPageChanged(event:any):void{
    this.getAllProductSub= this._productsService.getAllProduct(event).subscribe({
      next:(res)=>{
        console.log(res.data)
        this.productsList=res.data;
        this.pageSize=res.metadata.limit
        this.currentPage=res.metadata.currentPage
        this.totalPages=res.results
        
      },
      error:(err)=>{
        console.log(err)
      }

    })
    console.log(event);

  }




  ngOnDestroy(): void {
    this.getAllProductSub?.unsubscribe()
    
  }
  
}
