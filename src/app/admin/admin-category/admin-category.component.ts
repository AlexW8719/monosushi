import { Component, OnInit } from '@angular/core';
import { deleteObject, getDownloadURL, percentage, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ref } from '@firebase/storage';
import { ICategoryResponse } from 'src/app/shared/interfaces/categories/Category.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {

  public adminCategories!: ICategoryResponse[];

  public categoryForm!: FormGroup;

  public editStatus = false;
  public disabled = false;
  public uploadPersent!: number;
  public isUploaded = false;

  private _currentCategoryID!: number;

  constructor(
    private _categoryServise: CategoryService,
    private _fb: FormBuilder,
    private _storage: Storage
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.initCategoryForm()
  }

  initCategoryForm(): void {
    this.categoryForm = this._fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      imagePath: [null, Validators.required],
    })
  }

  getCategories(): void {
    this._categoryServise.getAll().subscribe(data => {
      this.adminCategories = data;
    })
  }

  addCategory(): void {
    if (this.editStatus) {
      this._categoryServise.update(this.categoryForm.value, this._currentCategoryID).subscribe(() => {
        this.getCategories()
      })
      this.disabled = false;
      this.editStatus = false;
      this.isUploaded = false;
      this.uploadPersent = 0;
    } else {

      this._categoryServise.create(this.categoryForm.value).subscribe(() => {
        this.getCategories()
        this.isUploaded = false;
        this.uploadPersent = 0;
      })
    }
    this.categoryForm.reset()
  }



  editCategory(category: ICategoryResponse): void {
    this.disabled = true;
    this.editStatus = true;
    this.isUploaded = true;
    this.categoryForm.patchValue({
      name: category.name,
      path: category.path,
      imagePath: category.imagePath
    })

    this._currentCategoryID = category.id
  }
  // 
  uplod(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('images/caregories', file.name, file)
      .then(data => {
        this.categoryForm.patchValue({
          imagePath: data

        });
        this.isUploaded = true;
      })
      .catch(error => {
        console.log(`Помилка завантаження картинки:`, error)
      })
  }

  // сама загрузка
  async uploadFile(folder: string, fileName: string, file: File | null): Promise<string> {
    // Вказуємо шлях куди грузимо картинку
    const path = `${folder}/${fileName}`;
    let url = ``;
    if (file) {
      // щоб загрузка ішла без проблем і ми бачили, якщо щось відвалюється
      try {
        // storegeRef - ref - ми створ посилання на референс який ми загружаємо
        // з двома параметрами фаєрбейс сторідж та шлях куди буде попадпти картинка(файл)
        const storageRef = ref(this._storage, path)
        // Створюємо прогрес бар для загрузки
        const task = uploadBytesResumable(storageRef, file)
        percentage(task).subscribe(data => {
          this.uploadPersent = data.progress
        });
        await task;
        url = await getDownloadURL(storageRef)

      } catch (error: any) {
        console.log(error);
      }
    } else {
      console.log(`wrong format ..`);
    }
    return Promise.resolve(url)
  }

  deleteCategory(category: ICategoryResponse): void {
    if (confirm(`Are you sure?`)) {
      this._categoryServise.delete(category.id).subscribe(() => {
        this.getCategories()
      })
    }

  }

  deleteImg(): void {
    const task = ref(this._storage, this.valueByControl(`imagePath`));

    deleteObject(task).then(() => {
      console.log(`file deleted`)

      this.isUploaded = false;
      this.uploadPersent = 0;
      this.categoryForm.patchValue({
        imagePath: null,
      })

    })

  }

  valueByControl(control: string): string {
    return this.categoryForm.get(control)?.value;
  }
}
