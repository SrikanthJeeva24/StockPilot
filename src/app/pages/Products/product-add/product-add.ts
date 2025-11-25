import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../../shared/services/product';

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

  categories = ['Medicine', 'Wellness', 'Cosmetics', 'Supplements'];

  constructor(
    private fb: FormBuilder,
    private service: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      sku: ['', [Validators.required]],
      stock: [null, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      image: [''],
    });

    if (this.route.snapshot.params['id']) {
      this.productId = this.route.snapshot.params['id'];
      this.editMode = true;
      this.loadProduct();
    }
  }

  loadProduct() {
    // Fetch product from API
    this.service.getById(Number(this.productId)).subscribe((res) => {
      this.productForm.patchValue(res);
      this.productImages = Array.isArray(res?.image) ? res.image : res?.image ? [res.image] : [];
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

    if (this.editMode) {
      this.service.update(Number(this.productId), payload).subscribe();
    } else {
      this.service.create(payload).subscribe();
    }
  }
}
