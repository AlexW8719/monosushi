import { Component, OnInit } from '@angular/core';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDiscountResponse } from 'src/app/shared/interfaces/Discount.interface';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';

@Component({
  selector: 'app-admin-discount',
  templateUrl: './admin-discount.component.html',
  styleUrls: ['./admin-discount.component.scss']
})
export class AdminDiscountComponent implements OnInit {
  public adminDiscounts!: IDiscountResponse[];

  public discountForm!: FormGroup;

  public editStatus = false;
  public editID!: number;
  public disabled = false;
  public isUploaded = false;

  public uploadPersent!: number;

  private _currentDiscountID!: number;

  constructor(
    private _discountServise: DiscountService,
    private _fb: FormBuilder,
    private _storage: Storage,
  ) { }

  ngOnInit(): void {
    this.getDiscounts();
    this.initDiscountForm();
  }

  initDiscountForm(): void {
    this.discountForm = this._fb.group({
      date: [new Date(), Validators.required],
      name: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      imgPath: [null, Validators.required],
    })
  }

  getDiscounts(): void {
    this._discountServise.getAll().subscribe(data => {
      this.adminDiscounts = data;
    })
  }

  editDiscount(discount: IDiscountResponse): void {
    this.editStatus = true;
    this.disabled = true;
    this.isUploaded = true;

    this.discountForm.patchValue({
      date: new Date(),
      name: discount.name,
      title: discount.title,
      description: discount.description,
      imgPath: discount.imgPath,
    })
    this._currentDiscountID = discount.id;
  }

  addDiscount(): void {
    if (this.editStatus) {
      this._discountServise.update(this.discountForm.value, this._currentDiscountID).subscribe(() => {
        this.getDiscounts()
      })
      this.editStatus = false;
      this.disabled = false;
      this.isUploaded = false;
      this.uploadPersent = 0;
    } else {
      this._discountServise.create(this.discountForm.value).subscribe(() => {
        this.getDiscounts();

      })
      this.isUploaded = false;
      this.uploadPersent = 0;
      this.editStatus = false;
      this.disabled = false;
    }
    this.discountForm.reset();
  }

  deleteDiscount(discount: IDiscountResponse): void {
    if (confirm(`Are you sure?`)) {
      this._discountServise.delete(discount.id).subscribe(() => {
        this.getDiscounts()
      })
    }
  }

  upload(event: any): void {
    const file = event.target.files[0]
    this.uploadFile(`images/discounts`, file.name, file)
      .then(data => {
        this.discountForm.patchValue({
          imgPath: data,
        });
        this.isUploaded = true;
      })
      .catch(error => {
        console.log(`Помилка завантаження картинки:`, error);
      })
  }

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

  deleteImg(): void {
    const task = ref(this._storage, this.valueByControl(`imgPath`));

    deleteObject(task).then(() => {
      console.log(`file deleted`)

      this.isUploaded = false;
      this.uploadPersent = 0;
      this.discountForm.patchValue({
        imagePath: null,
      })

    })
  }

  valueByControl(control: string): string {
    return this.discountForm.get(control)?.value
  }

}
