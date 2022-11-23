import { Component, OnInit } from '@angular/core';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
import { ICategoryResponse } from 'src/app/shared/interfaces/categories/Category.interface';
import { IProductsRequest, IProductsResponse } from 'src/app/shared/interfaces/products/Products.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {
  public adminProducts: Array<IProductsResponse> = [];
  public adminCategories: Array<ICategoryResponse> = [];

  public productForm!: FormGroup;

  public editStatus = false;
  public editID!: number;
  public disabled = false;
  public isUploaded = false;

  public uploadPersent!: number;

  private _currentProductID!: number;
  private _currentCategoryID!: number;

  constructor(
    private _ProductService: ProductService,
    private _CategoryService: CategoryService,
    private _fb: FormBuilder,
    private _ImageService: ImageService,
    // private _toastr: ToastrService,

  ) { }

  ngOnInit(): void {
    this.initProductForm();
    this.getProducts();
    this.getCategories();

  }

  initProductForm(): void {
    this.productForm = this._fb.group({
      category: [null, Validators.required],
      title: [null, Validators.required],
      path: [null, Validators.required],
      description: [null, Validators.required],
      productSize: [null, Validators.required],
      price: [null, Validators.required],
      imagePath: [null, Validators.required],
      count: [1]
    })
  }

  getProducts(): void {
    this._ProductService.getAll().subscribe(data => {
      this.adminProducts = data;
    })
  }

  getCategories(): void {
    this._CategoryService.getAll().subscribe(data => {
      this.adminCategories = data;
      // this.productForm.patchValue({
      //   category: this.adminCategories[0].id
      // })
    })
  }

  addProduct(): void {

    if (this.editStatus) {
      this._ProductService.update(this.productForm.value, this._currentProductID).subscribe(() => {
        this.getProducts();
        // this._toastr.success('Product successfully updated!');
        this.disabled = false;
        this.editStatus = false;
        this.isUploaded = false;
        this.uploadPersent = 0;
      })

    } else {

      this._ProductService.create(this.productForm.value).subscribe(() => {
        this.getProducts();
        // this._toastr.success('Product successfully added!');
        this.isUploaded = false;
        this.uploadPersent = 0;

      })
    }
    this.productForm.reset()
  }

  editProduct(product: IProductsResponse): void {
    this.disabled = true;
    this.editStatus = true;
    this.isUploaded = true;
    this.productForm.patchValue({
      category: product.category,
      title: product.title,
      path: product.path,
      description: product.description,
      productSize: product.productSize,
      price: product.price,
      imagePath: product.imagePath,
    })

    this._currentProductID = product.id
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this._ImageService.uploadFile('images/products', file.name, file)
      .then(data => {
        this.productForm.patchValue({
          imagePath: data

        });
        this.isUploaded = true;
      })
      .catch(error => {
        console.log(`Помилка завантаження картинки:`, error)
      })
  }

  deleteImg(): void {
    this._ImageService.deleteUploadFile(this.valueByControl('imagePath'))
      .then(() => {
        this.isUploaded = false;
        this.uploadPersent = 0;
        this.productForm.patchValue({
          imagePath: null,
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  valueByControl(control: string): string {
    return this.productForm.get(control)?.value;
  }



  deleteProduct(product: IProductsResponse): void {
    if (confirm(`Are you sure?`)) {
      this._ProductService.delete(product.id).subscribe(() => {
        this.getProducts();
        // this._toastr.success('Product successfully deleted!');
      })
    }

  }
  select(): void {
    console.log(this.productForm.controls)
  }
}
