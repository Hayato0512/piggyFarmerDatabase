import { Component } from '@angular/core';
import { PigService } from '../pig.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pig-table',
  templateUrl: './pig-table.component.html',
  styleUrls: ['./pig-table.component.css'],
})
export class PigTableComponent {
  constructor(private pigService: PigService, private router: Router) {}
  response: any;

  onClickMoreInfo(evt: Event) {
    var event = evt.target as HTMLButtonElement;
    console.log('clicliclclij');
    console.log(`event is ${event.id}`);
    console.log(`show more info of the pig number ${event.id}`);
    // localStorage.setItem("chosenPigId", event.id)
    this.router.navigate(['/more',`${event.id}`])
    //put data of pig in localStorage. and then fetch it from moreInfoPage
  }

  // moreInfoClicked(){
  //   console.log("ILL navigate you to a new page")
  // }

  onDeleteClicked(evt: Event) {
    var event = evt.target as HTMLButtonElement;
    console.log(`event is ${event.id}`);
    console.log(`delete clicked for pig ${event.id}`);
    // this.pigService.deletePig(event.id);
    this.router.navigate(['/delete',`${event.id}`])
  }

  ngOnInit(): void {
    this.pigService.getPigs().subscribe((data) => {
      this.response = data;
      console.log(`this.response is like this in pig-table.component ${this.response}`);
    });
  }
  locationSortClicked(){
    console.log(`location sort clicked`)
    //sort the response by location
    console.log(`before location sort, ${JSON.stringify(this.response)}`)
    this.response =this.response.sort((a:any,b:any)=>
      b.data.Location.name >a.data.Location.name ? -1:1
    )
    console.log(`after location sort, ${JSON.stringify(this.response)}`)
  }
  reportedBySortClicked(){
    console.log(`reported by sort clicked`)
    this.response =this.response.sort((a:any,b:any)=>
      b.data.personInfo.name >a.data.personInfo.name ? -1:1
    )
  }
  timeSortClicked(){
    console.log(`time sort clicked`)
    this.response =this.response.sort((a:any,b:any)=>
      b.data.timeAndDate >a.data.timeAndDate ? -1:1
    )
  }
  statusSortClicked(){
    console.log(`status sort clicked`)
    this.response =this.response.sort((a:any,b:any)=>
      b.data.status >a.data.status ? -1:1
    )
  }
}
