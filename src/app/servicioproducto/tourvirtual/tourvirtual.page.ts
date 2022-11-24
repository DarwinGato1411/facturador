import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tourvirtual',
  templateUrl: './tourvirtual.page.html',
  styleUrls: ['./tourvirtual.page.scss'],
})
export class TourvirtualPage implements OnInit {
  url
  constructor(private activatedroute: ActivatedRoute,
    private sanitizer: DomSanitizer) {

   //let valor = this.activatedroute.snapshot.paramMap.get("url");
   

    
   let valor = localStorage.getItem("tourvirtual");
   console.log("URLLL RECUPERADA   ",valor)
   //bypassSecurityTrustResourceUrl
   this.url=this.sanitizer.bypassSecurityTrustResourceUrl(valor);
   
   }

   transform(url) {
    return 
  }

  ngOnInit() {
  }

}
