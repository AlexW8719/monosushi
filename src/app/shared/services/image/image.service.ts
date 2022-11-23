import { Injectable } from '@angular/core';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  public uploadPersent: number = 0;

  constructor(
    private _storage: Storage,
  ) { }

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

  deleteUploadFile(imagePath: string): Promise<void> {
    const task = ref(this._storage, imagePath);

    return deleteObject(task)
  }
}
