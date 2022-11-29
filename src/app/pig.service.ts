import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PigData } from './models/pig.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PigService {
  response: any;
  returnedPig:any;
  constructor(private http: HttpClient) {}

  getPigs(): Observable<PigData> {
    return this.http.get<PigData>(
      'https://272.selfip.net/apps/dtwR9wqLcD/collections/unkoCollection/documents/'
    );
    //    this.http.get<PigData>('https://272.selfip.net/apps/dtwR9wqLcD/collections/unkoCollection/documents/').subscribe(data => {
    //     this.response = data;
    // console.log(data)
  }

  deletePig(id: string): void {
    console.log(`came into deletePIg in pigService`);
    try {
      this.http
        .delete(
          `https://272.selfip.net/apps/dtwR9wqLcD/collections/unkoCollection/documents/${id}`
        )
        .subscribe(() => console.log('delete successful'));
    } catch (error) {
      console.log(error);
    }
    //    this.http.get<PigData>('https://272.selfip.net/apps/dtwR9wqLcD/collections/unkoCollection/documents/').subscribe(data => {
    //     this.response = data;
    // console.log(data)
  }

  insertPig(pigData: PigData) {
    //post http request with Json body
    this.http
      .post<any>(
        'https://272.selfip.net/apps/dtwR9wqLcD/collections/unkoCollection/documents/',
        pigData
      )
      .subscribe((data) => {
        console.log(data);
      });
  }
  updatePig(pigData: PigData) {
    //post http request with Json body
    var id = pigData.key
    console.log(`in updatePig, id is ${id}`)
    this.http
      .put<any>(
        `https://272.selfip.net/apps/dtwR9wqLcD/collections/unkoCollection/documents/${id}`,
        pigData
      )
      .subscribe((data) => {
        console.log(data);
      });
  }
  getPigById(id:string):Observable<PigData> {
      return this.http.get<PigData>(
      `https://272.selfip.net/apps/dtwR9wqLcD/collections/unkoCollection/documents/${id}`
    )
    
  }
}
