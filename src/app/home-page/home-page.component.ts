import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  constructor(private router:Router){
    
  }
  moreInfoClicked(){
    console.log("ILL navigate you to a new page")
    this.router.navigate(['/more'])
  }
  
  createPigClicked(){
    this.router.navigate(['/create'])
  }
}
