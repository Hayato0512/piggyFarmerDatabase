import { Component } from '@angular/core';
import { LocationService } from '../location.service';
import { Router } from '@angular/router';
import { PigService } from '../pig.service';
import { ActivatedRoute } from '@angular/router';
import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { HashService } from '../hash.service';

@Component({
  selector: 'app-delete-page',
  templateUrl: './delete-page.component.html',
  styleUrls: ['./delete-page.component.css']
})
export class DeletePageComponent {

chosenPigId:any;  
returnedPig:any;
password:string;
public isHidden = true;
hashedPassword:string;
private correctPassword = "84892b91ef3bf9d216bbc6e88d74a77c";
hashedPasswordObject:any;
  constructor(private pigService:PigService,private hashService:HashService, private locationService:LocationService,private _Activatedroute:ActivatedRoute,private router:Router){
  //  this.chosenPigId = localStorage.getItem("chosenPigId");//local storage is really slow do something else.
  }
 onSubmit(data:any){

    this.password = data.password;
    console.log(`password is ${this.password}`)
   this.hashService.getHashedPassword(this.password).subscribe(data=>{
    this.hashedPassword = data.Digest
    if(this.hashedPassword==this.correctPassword){
      console.log(`password correct, so let's delete`)
      this.onDelete();
    }
    else{
      console.log(`password incorrect, show alert`)
      //get the control over text.
      this.isHidden = false;
    }
   })
 } 

  onDelete() {
    try {
    var theLocationName:string ;
    var statusOfThePig:string = '';
      
  this.pigService.getPigById(this.chosenPigId).subscribe((data)=>{
    theLocationName = data.data.Location.name
    statusOfThePig = data.data.status
    if(statusOfThePig=="Retrieved"){
//if retrieved, do nothing.
console.log("the status of the pig is retrieved")
    }
    else{
   var theLocation; 
  this.locationService.getLocationByName(theLocationName!).subscribe((data)=>{
    console.log(`in more info page, I got this objet back. -> ${JSON.stringify(data)}`)
    theLocation = data;
    theLocation.data.count -=1;
    this.locationService.updateLocation(theLocation);
  })
    }
  })
    this.pigService.deletePig(this.chosenPigId);
    console.log(`deletion successful`)
    // console.log(`the LocationName is ${theLocationName}`)
    //after delete the pig, if the status is not retrieved, then count--. if the status is already retrieved, then do nothnig
    } catch (error) {
     console.log(error) 
    }
    setTimeout(()=>{

    this.router.navigate(['/home'])
    },1000)
  }

  ngOnInit(){
   this.chosenPigId=this._Activatedroute.snapshot.paramMap.get("id");
   console.log(`chosenPigId is ${this.chosenPigId}`)
    // this.returnedPig = JSON.stringify(this.pigService.getPigById(this.chosenPigId!) )
  //  console.log(`returnedObject is ${JSON.stringify(this.returnedPig)}`)
  this.pigService.getPigById(this.chosenPigId!).subscribe((data)=>{
    console.log(`in more info page, I got this objet back. -> ${JSON.stringify(data)}`)
    this.returnedPig = data;
  })

  }
}
