import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Iproduct } from '../../interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../services/categories.service';
import { Icategory } from '../../interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';

import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule,RouterLink,UpperCasePipe,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit,OnDestroy {
  private readonly _productsService=inject(ProductsService)
  private readonly _CategoriesService=inject(CategoriesService)
  private readonly _CartService=inject(CartService)
  
  private readonly _ToastrService=inject(ToastrService)
 
  productsList:Iproduct[]=[];
  categoriesList:Icategory[]=[];
  getAllProductSub !:Subscription
  filterProducts: Iproduct[] = [];
  searchTerm: string = '';


  ngOnInit(): void {
   
  this._CategoriesService.getAllCategories().subscribe({
    next:(res)=>{
      console.log(res.data)
      this.categoriesList=res.data;
      
     
      
    },
    error:(err)=>{
      console.log(err)
    }

  })
  

  this.getAllProductSub= this._productsService.getAllProduct().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.productsList=res.data;
        this.filterProducts = this.productsList;
        
      },
      error:(err)=>{
        console.log(err)
      }

    })
  }

  filter(): void {
    const term = this.searchTerm.toLowerCase().trim();
    if (term) {
      this.filterProducts = this.productsList.filter(product =>
        product.title.toLowerCase().includes(term) ||
        product.category.name.toLowerCase().includes(term)
      );
    } else {
      this.filterProducts = this.productsList;
    }
  }

  

  ngOnDestroy(): void {
    this.getAllProductSub?.unsubscribe()
    
  }


  customOptionsCate: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay:true,
    autoplayTimeout:1000,
    autoplayHoverPause:true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      500: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
      ,
      1100: {
        items: 4
      }
    },
    nav: true
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
  
}
