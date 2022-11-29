import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PigData } from '../models/pig.model';
import { PigService } from '../pig.service';
import { LocationService } from '../location.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { HashService } from '../hash.service';
@Component({
  selector: 'app-more-info-page',
  templateUrl: './more-info-page.component.html',
  styleUrls: ['./more-info-page.component.css']
})
export class MoreInfoPageComponent implements OnInit{
  public personName: string = '';
  public password: string = '';
  public personPhone: string = '';
  public pigBreed: string = '';
  public pigId: string = '';
  public locationName: string = '';
  public locationLat: string = '';
  public locationLong: string = '';
  public extraNote: string = '';
  public status: string = '';
  public originalStatus:string = ''
  public isStateChanged:boolean = false;
  public isHidden:boolean = true;
hashedPassword:string;
private correctPassword = "84892b91ef3bf9d216bbc6e88d74a77c";
chosenPigId:any;  
returnedPig:any;
 statusForm:FormGroup;
  public statusArray  = ["Not ready", "Ready For Pick Up","Retrieved"]
  constructor(private router:Router,private pigService:PigService,private hashService:HashService, private locationService:LocationService,private _Activatedroute:ActivatedRoute,private fb:FormBuilder){
  //  this.chosenPigId = localStorage.getItem("chosenPigId");//local storage is really slow do something else.
  }


  ngOnInit(){
    this.statusForm = this.fb.group({
      status: []
    });


   this.chosenPigId=this._Activatedroute.snapshot.paramMap.get("id");
   console.log(`chosenPigId is ${this.chosenPigId}`)
    // this.returnedPig = JSON.stringify(this.pigService.getPigById(this.chosenPigId!) )
  //  console.log(`returnedObject is ${JSON.stringify(this.returnedPig)}`)
  this.pigService.getPigById(this.chosenPigId!).subscribe((data)=>{
    console.log(`in more info page, I got this objet back. -> ${JSON.stringify(data)}`)
    this.returnedPig = data;
    this.originalStatus = data.data.status;
  })

  this.statusForm.valueChanges.subscribe(x=>{
  this.isStateChanged = true;
  console.log(x.status)
  this.status = x.status;
  })
  }
  submit() {
    console.log("Form Submitted")
    console.log(this.statusForm.value.status)
  }
  
  onSubmit(data: any) {
    this.password = data.password;
   this.hashService.getHashedPassword(this.password).subscribe(response=>{
    this.hashedPassword = response.Digest
    if(this.hashedPassword==this.correctPassword){
      console.log(`password correct, so let's delete`)
      // this.onDelete();
    console.log(data);
    console.log(`data.personName is ${data.personName}`)
    this.personName = data.personName;
    this.personPhone = data.personPhone;
    this.pigBreed = data.pigBreed;
    this.pigId = data.pigId;
    this.locationName = data.locationName;
    // this.locationLat = data.locationLat;
    // this.locationLong = data.locationLat;
    this.extraNote = data.extraNote;
    // this.status = data.status;
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
        timeAndDate: '2022/05/12/13:40',
        status: this.isStateChanged?this.status:this.originalStatus,
      },
      //ok, now, we have these values. so , create a Json object with these. and then throw as post
    };
    try {
      var res = this.pigService.updatePig(jsonObjectToPass);
      if(this.isStateChanged){
        if(this.status=="Retrieved"){
          //count--
   var theLocation; 
  this.locationService.getLocationByName(this.locationName).subscribe((data)=>{
    console.log(`in more info page, I got this objet back. -> ${JSON.stringify(data)}`)
    theLocation = data;
    theLocation.data.count -=1;
    this.locationService.updateLocation(theLocation);
  })
        }
      }
    setTimeout(()=>{

    this.router.navigate(['/home'])
    },1000)
    } catch (error) {
      console.log(error);
    }
    console.log(`this.personName is ${this.personName}`);


    }
    else{
      console.log(`password incorrect, show alert`)
      this.isHidden = false;
    }
   })
  }

}
