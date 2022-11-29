import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { LocationService } from '../location.service';
import { LocationData } from '../models/location.model';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  private map:any;
  private locationArray:LocationData[]
  constructor(private locationService:LocationService){

  }

    ngAfterViewInit(): void {
        this.initMap();
    }

  private  initMap() : void{
    this.map = L.map('map').setView([	49.2827, -123.1207], 10);
    const tiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom:70,
      attribution:'&copy: <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy;<a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    });
    //get all the pig and count .
    //get all the location, and get the 
    //wait a second. I think I should have "count" in location model. so that it can just automatically do it. 
    // go through all the pig, and then add markers.
    tiles.addTo(this.map);
    //get the locaiton list. and then  go thorugh them , 
     this.locationService.getLocations().subscribe((data) => {
      // this. = data;
      console.log(data);
      this.locationArray = data
      console.log(this.locationArray);
      this.locationArray.forEach(location=>{
        if(location.data.count!=0){
    const marker1 = L.marker([location.data.lat, location.data.long]).addTo(this.map)
    marker1.bindPopup(`${location.data.count} pig(s) found here`).openPopup()
        }
      })

      //ok, now, we have all the cities. next, show them in the drop down menu. 
      })
    }

}
