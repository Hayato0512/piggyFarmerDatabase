import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HashService {

  response: any;
  returnedPig:any;
  constructor(private http: HttpClient, ) {}

  getHashedPassword(password:string): Observable<any> {
    return this.http.get<any>(`https://api.hashify.net/hash/md5/hex?value=${password}`);
    //    this.http.get<PigData>('https://272.selfip.net/apps/dtwR9wqLcD/collections/unkoCollection/documents/').subscribe(data => {
    //     this.response = data;
    // console.log(data)
  }

  // deletePig(id: string): void {
  //   console.log(`came into deletePIg in pigService`);
  //   try {
  //     this.http
  //       .delete(
  //         `https://272.selfip.net/apps/dtwR9wqLcD/collections/unkoCollection/documents/${id}`
  //       )
  //       .subscribe(() => console.log('delete successful'));
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   //    this.http.get<PigData>('https://272.selfip.net/apps/dtwR9wqLcD/collections/unkoCollection/documents/').subscribe(data => {
  //   //     this.response = data;
  //   // console.log(data)
  // }

}
