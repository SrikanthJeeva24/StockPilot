import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../../shared/services/product';
import { CategoryService } from '../../../shared/services/category';
import { ICategory } from '../../../shared/interfaces/ICategory';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-add',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './product-add.html',
  styleUrl: './product-add.css',
})
export class ProductAdd implements OnInit {
  productForm!: FormGroup;
  productImages: any[] = [];
  editMode = false;
  productId: string = '';
  categories: ICategory[] = [];

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly service: ProductService,
    private readonly categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      sku: ['', [Validators.required]],
      price: ['', [Validators.required]],
      stock: [null, [Validators.required, Validators.min(0)]],
      categoryid: ['', Validators.required],
      image: [''],
    });
    this.getAllCategoryOptions();
    if (this.route.snapshot.params['id']) {
      this.productId = this.route.snapshot.params['id'];
      this.editMode = true;
      this.loadProduct();
    }
  }

  loadProduct() {
    // Fetch product from API
    this.service.getById(this.productId).subscribe((res: any) => {
      if (res['success']) {
        let data = res['data'];
        this.productForm.patchValue(data);
        let images: any[] = [];
        if (Array.isArray(data?.image)) {
          images = data.image;
        } else if (data?.image) {
          images = [data.image];
        }
        this.productImages = images;
      }
    });
  }

  getAllCategoryOptions() {
    this.categoryService.getAllCategories().subscribe({
      next: (res: any) => {
        if (res['success']) {
          this.categories = res['data'];
        } else {
          this.categories = [];
        }
      },
    });
  }

  onImageSelect(event: any) {
    const files = event.target.files;
    if (!files) return;

    for (let file of files) {
      const reader = new FileReader();
      reader.onload = () => {
        this.productImages.push(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(index: number) {
    this.productImages.splice(index, 1);
  }

  submit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const payload = {
      ...this.productForm.value,
      images: this.productImages,
    };
    console.log('--Payload:--', payload);
    if (this.editMode) {
      this.service.update(this.productId, payload).subscribe({
        next: (res: any) => {
          if (res['success']) {
            this.productForm.reset();
            this.router.navigateByUrl('/products/list');
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: res?.message,
            });
          }
        },
        error: (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error?.error?.message,
          });
        },
      });
    } else {
      this.service.create(payload).subscribe({
        next: (res: any) => {
          if (res['success']) {
            this.productForm.reset();
            this.router.navigateByUrl('/products/list');
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: res?.message,
            });
          }
        },
        error: (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error?.error?.message,
          });
        },
      });
    }
  }
}
