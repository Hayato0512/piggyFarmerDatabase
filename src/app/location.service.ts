import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocationData } from './models/location.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  response: any;
  returnedPig:any;
  constructor(private http: HttpClient, ) {}

  getLocations(): Observable<LocationData[]> {
    return this.http.get<LocationData[]>(
      'https://272.selfip.net/apps/dtwR9wqLcD/collections/locationCollection/documents/'
    );
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

  insertLocation(locationData: LocationData) {
    this.http
      .post<any>(
        'https://272.selfip.net/apps/dtwR9wqLcD/collections/locationCollection/documents/',
        locationData
      )
      .subscribe((data) => {
        console.log(data);
      });
  }

  updateLocation(locationData: LocationData) {
    //post http request with Json body
    var name = locationData.key
    console.log(`in updatePig, id is ${name}`)
    this.http
      .put<any>(
        `https://272.selfip.net/apps/dtwR9wqLcD/collections/locationCollection/documents/${name}`,
        locationData
      )
      .subscribe((data) => {
        console.log(data);
      });
  }

  getLocationByName(name:string):Observable<LocationData> {
      return this.http.get<LocationData>(
      `https://272.selfip.net/apps/dtwR9wqLcD/collections/locationCollection/documents/${name}`
    )
    
  }
}
