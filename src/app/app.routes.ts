import { Routes } from '@angular/router';
import { AuthLayoutComponent } from '../layout/auth-layout/auth-layout.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { BlankLayoutComponent } from '../layout/blank-layout/blank-layout.component';
import { HomeComponent } from '../components/home/home.component';




import { CartComponent } from '../components/cart/cart.component';
import { NotfoundComponent } from '../components/notfound/notfound.component';
import { logedGuard } from '../guard/loged.guard';
import { authGuard } from '../guard/auth.guard';

import { CategoryComponent } from '../components/category/category.component';
import { categoryDetailsComponent } from '../components/categoryDetails/categoryDetails.component';
import { ForgetPasswordComponent } from '../components/forget-password/forget-password.component';
import { AllordersComponent } from '../components/allorders/allorders.component';

import { ProductsComponent } from '../components/products/products.component';
import { DetailsProductComponent } from '../components/detailsProduct/detailsProduct.component';







export const routes: Routes = [
    {path:"",canActivate:[logedGuard],component:AuthLayoutComponent,children:
        [
          {path:"",redirectTo:"login",pathMatch:"full"}, 
          {path:"login",component:LoginComponent,title:"login"},
          {path:"register",component:RegisterComponent,title:"register"},
          {path:"forget",component:ForgetPasswordComponent,title:"forgetPassword"},
         
      
        ]
      },
      
      
      {path:"",canActivate:[authGuard] ,component:BlankLayoutComponent,children:
        [
      
          {path:"",redirectTo:"home",pathMatch:"full"},
          {path:"home", component:HomeComponent,title:"home"},
          
          {path:"products",component:ProductsComponent,title:"products" },
          
          {path:"category",component:CategoryComponent,title:"category" },
          {path:'categoryDetails/:id',component:categoryDetailsComponent,title:"category" },
          {path:"cart",component:CartComponent,title:"cart" },
          {path:"details/:id",component:DetailsProductComponent,title:"details" },
          {path:"allorders",component:AllordersComponent},
         
          
          {path:"**",component:NotfoundComponent,title:"Notfound"},
       
        ]
      },
      
      
      
      {path:"**", component:NotfoundComponent}
];
