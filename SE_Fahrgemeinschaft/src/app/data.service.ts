import { Injectable } from '@angular/core';
import {AngularFireObject} from "@angular/fire/database";
import {AngularFireStorage, AngularFireUploadTask} from "angularfire2/storage";
import {AngularFireDatabase} from "angularfire2/database";
import {map} from "angularfire2";
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private db:AngularFireDatabase, private afStorage: AngularFireStorage) {

  }
  getFiles() //Files anzeigen
  {
    let ref = this.db.list('files');

    return ref.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  // "!!!

  uploadToStorage(information) : AngularFireUploadTask
  {

  }

  storeInfoToDB(metaInfo)
  {

  }

  deleteFile(file)
  {

  }
}
