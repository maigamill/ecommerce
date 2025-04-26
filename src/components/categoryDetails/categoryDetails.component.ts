import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Icategory } from '../../interfaces/icategory';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pro-category',
  imports: [],
  templateUrl: './categoryDetails.component.html',
  styleUrl: './categoryDetails.component.scss'
})
export class categoryDetailsComponent implements OnInit {

  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  categoryId!: string;
  categoryData: Icategory = {} as Icategory;
  GetSpecificCategorySub!: Subscription;
  _ActivatedRouteSub!: Subscription;


  GetSpecificCategory(categoryId: string) {
    this._CategoriesService.getSpecificCategories(categoryId).subscribe({
      next: (res) => {
        this.categoryData = res.data;
      }
    })
  }

  ngOnInit(): void {
    this._ActivatedRouteSub = this._ActivatedRoute.paramMap.subscribe({
      next: (res) => {
        this.categoryId = res.get('id')!;
      }
    })
    this.GetSpecificCategory(this.categoryId);
  }

  ngOnDestroy(): void {
    this.GetSpecificCategorySub?.unsubscribe();
    this._ActivatedRouteSub?.unsubscribe();
  }
  
   

}
