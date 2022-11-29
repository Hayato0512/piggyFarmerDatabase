import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { LocationService } from '../location.service';
import { PigData } from '../models/pig.model';
import { PigService } from '../pig.service';
import { LocationData } from '../models/location.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pig-create-form',
  templateUrl: './pig-create-form.component.html',
  styleUrls: ['./pig-create-form.component.css'],
})
export class PigCreateFormComponent implements OnInit {
  public personName: string = '';
  public personPhone: string = '';
  public pigBreed: string = '';
  public pigId: string = '';
  public location: string = '';
  public extraNote: string = '';
  public status: string = '';
  private locationArray:LocationData[];
  public locationNameArray:string[] = [];
 locationForm:FormGroup;
 statusForm:FormGroup;
 showAdditionalTextFIeld :boolean = false;
 public newLocationEntered = false;

 fakeArray = [1,2,3,4,5]
  constructor(private router:Router,private pigService: PigService, private locationService: LocationService,private fb:FormBuilder) {

  }

  public locationNameDom =document.getElementById("locationName") as HTMLInputElement;
  public locationLat: string = '';
  public locationName: string = '';
  public locationLong: string = '';
  public locationNameId = 'whatUp';
  public isHidden = "hidden";
  public statusArray  = ["Not ready", "Ready For Pick Up","Retrieved"]
  locationLatValue :string= "";

  ngOnInit(){
    //fetch the cities, and then put them in the array.
     this.locationService.getLocations().subscribe((data) => {
      // this. = data;
      console.log(data);
      this.locationArray = data
      console.log(this.locationArray);
      this.locationArray.forEach(location=>{
        this.locationNameArray.push(location.key)
      })

      console.log(`after for each function, locationNameArray is ${this.locationNameArray}`)
      //ok, now, we have all the cities. next, show them in the drop down menu. 
      })

    this.locationForm = this.fb.group({
      unko:[] 
    });
    this.statusForm = this.fb.group({
      status:[] 
    });
  this.statusForm.valueChanges.subscribe(x=>{
  console.log(x.status)
  this.status = x.status;
  })
this.locationForm.valueChanges.subscribe(x => {
  console.log('form value changed')
  console.log(x.unko)
  if(x.unko==99){
    console.log(`user's trying to enter a new city. so show 3 more textfield`)
    this.isHidden ="text"
    this.showAdditionalTextFIeld = true;
    this.newLocationEntered = true;
  }
  else {
    this.isHidden ="hidden"
    this.locationName = x.unko;
    console.log(`now, this.locationName is ${this.locationName}`)
  }
})
  //   //show that in the drop down menu.

  // )
  // response = JSON.parse(response)
  // var response2 = JSON.stringify({response})
      // console.log(`ok, response looks like ${response2}`)
}
  submit() {
    console.log(this.locationForm.value)
  }
  onSubmit(data: any) {
    console.log(data);
    this.personName = data.personName;
    this.personPhone = data.personPhone;
    this.pigBreed = data.pigBreed;
    this.pigId = data.pigId;
    // this.locationName = data.locationName;
    console.log(`this.locationName is ${this.locationName}`)
    this.locationLat = data.locationLat;
    this.locationLong = data.locationLong;
    this.extraNote = data.extraNote;
    // this.status = data.status;
    //if newLocationEntered is true, then first register the location first, and then pass pigDta
    if(this.newLocationEntered){
      console.log(`newLcationentered. so, ${data.locationName}, ${data.locationLat}, ${data.locationLong}`)
      this.locationName = data.locationName;
      this.locationService.insertLocation(
  {
    key:data.locationName,
    data:{
      lat:+this.locationLat,
      long:+this.locationLong,
      count:0
    }
  }
      )
    }
    //if newLocationEntered is false, then just create pigData like this. 
    var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
// today = mm + '/' + dd + '/' + yyyy;
    var jsonObjectToPass: PigData = {
      key: this.pigId,
      data: {
        personInfo: {
          name: this.personName,
          phone: this.personPhone,
        },
        pigInfo: {
          breed: this.pigBreed,
          pid: +this.pigId,
        },
        Location: {
          name: this.locationName,
          // lat: +this.locationLat,
          // long: +this.locationLong,
        },
        extraNotes: this.extraNote,
        timeAndDate:  this.formatDate(new Date()),
        status: this.status,
      },
      //ok, now, we have these values. so , create a Json object with these. and then throw as post
    };
    try {
      this.pigService.insertPig(jsonObjectToPass);
      //after inserting the pig, get the locatin, update the count, and then update
      var theLocation ;
  this.locationService.getLocationByName(this.locationName!).subscribe((data)=>{
    console.log(`in more info page, I got this objet back. -> ${JSON.stringify(data)}`)
    theLocation = data;
    theLocation.data.count +=1;
    this.locationService.updateLocation(theLocation);
  })

      // location.reload();
    setTimeout(()=>{

    this.router.navigate(['/home'])
    },1000)
    } catch (error) {
      console.log(error);
    }
    console.log(`this.personName is ${this.personName}`);
  }
   padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }
  
 calcelClicked(){

    this.router.navigate(['/home'])
 }
   formatDate(date: Date) {
    return (
      [
        date.getFullYear(),
        this.padTo2Digits(date.getMonth() + 1),
        this.padTo2Digits(date.getDate()),
      ].join('-') +
      ' ' +
      [
        this.padTo2Digits(date.getHours()),
        this.padTo2Digits(date.getMinutes()),
        this.padTo2Digits(date.getSeconds()),
      ].join(':')
    );
  }
}
