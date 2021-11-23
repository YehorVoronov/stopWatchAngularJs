import {Component, OnInit} from '@angular/core';
import {interval} from "rxjs";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  public seconds:number=0;
  public minute:number=0;
  public data:number=0
  private obs$: any;
  public isStart:boolean = true;
  public clickTimes:number=0;

  ngOnInit():void {

  }
  startStopIv(){
    if (this.isStart){
      this.obs$ = interval(1000).subscribe(() => {
        this.data++
        if (this.data>59){
          this.data=0
          this.minute++
        }
      })
      this.isStart=false
    }else {
      this.obs$.unsubscribe()
      this.data=0
      this.minute=0
      this.isStart=true
    }
  }
  waitIv(){

      this.isStart=true
      let a=this.data
      let b=this.minute
      this.obs$.unsubscribe()
      this.data=a
      this.minute=b
  }
  resetIv(){
    this.minute=0
    this.data=0
  }

  doubleClick(){
    let pendingClick;
    this.clickTimes++
    if (this.clickTimes>=2){
      this.waitIv()
      clearTimeout(pendingClick)
      this.clickTimes=0
      return;
    }
    clearTimeout(pendingClick)
    pendingClick=setTimeout(()=>{
      this.clickTimes=0
    },500)
  }
}
