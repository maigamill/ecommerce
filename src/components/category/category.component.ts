import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Data, RouterLink } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';
import { Icategory } from '../../interfaces/icategory';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category',
  imports: [RouterLink],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {
  private readonly _CategoriesService = inject(CategoriesService);
  getallCategoriesSub!: Subscription;

  allCategories: Icategory[] = [];
  getAllCategories() {
    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.allCategories = res.data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  ngOnInit(): void {
    this.getAllCategories();
  }
  ngOnDestroy(): void {
    this.getallCategoriesSub?.unsubscribe();
  }
  
}