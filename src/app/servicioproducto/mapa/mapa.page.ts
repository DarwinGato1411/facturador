import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  map: any;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  origin = { lat: 4.658383846282959, lng: -74.09394073486328 };
  // Parque la 93
  destination = { lat: 0, lng: 0 };

  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;
  infoWindows: any = [];

  markers: any = [];
  constructor(private geolocation: Geolocation) {
    this.latitudRec = parseFloat(localStorage.getItem("latmapa"));
    this.longitudRec = parseFloat(localStorage.getItem("longmapa"));


    this.destination.lat = this.latitudRec
    this.destination.lng = this.longitudRec
    console.log(" longitud destino ", this.longitudRec);
    console.log(" latitud  destino ", this.latitudRec);

    


  }
  latitudRec: number;
  longitudRec: number
  ngOnInit() {

    this.geolocation.getCurrentPosition().then((resp) => {
      console.log("LATTTTT GPS inicio ", resp.coords.latitude)
      console.log("LONNNNNN GPS inicio ", resp.coords.longitude)
      this.origin.lat = resp.coords.latitude
      this.origin.lng = resp.coords.longitude
      this.showMap();
    }).catch((error) => {
      console.log('Error getting location al obtener origen', error);
    });

    
  }



  ionViewDidEnter() {

  
  }

  /* addMarkersToMap(markers) {
     for (let marker of markers) {
       let position = new google.maps.LatLng(marker.latitude, marker.longitude);
       let mapMarker = new google.maps.Marker({
         position: position,
         title: marker.title,
         latitude: marker.latitude,
         longitude: marker.longitude
       });
 
       mapMarker.setMap(this.map);
       this.addInfoWindowToMarker(mapMarker);
      
     }
   }
 
   addInfoWindowToMarker(marker) {
     let infoWindowContent = '<div id="content">' +
                               '<h2 id="firstHeading" class"firstHeading">' + marker.title + '</h2>' +
                               '<p>Latitude: ' + marker.latitude + '</p>' +
                               '<p>Longitude: ' + marker.longitude + '</p>' +
                             '</div>';
 
     let infoWindow = new google.maps.InfoWindow({
       content: infoWindowContent
     });
 
     marker.addListener('click', () => {
       this.closeAllInfoWindows();
       infoWindow.open(this.map, marker);
     });
     this.infoWindows.push(infoWindow);
   
   }
 
   closeAllInfoWindows() {
     for(let window of this.infoWindows) {
       window.close();
     }
   }
 */
  showMap() {

    // const mapEle: HTMLElement = document.getElementById('map');
    const indicatorsEle: HTMLElement = document.getElementById('indicators');
    this.directionsDisplay.setPanel(indicatorsEle);
    const location = new google.maps.LatLng(this.latitudRec, this.longitudRec);
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true
    }

    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.directionsDisplay.setMap(this.map);
    //this.addMarkersToMap(this.markers);

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      this.mapRef.nativeElement.classList.add('show-map');

      //this.destination={lat:this.latitudRec,lng:this.latitudRec}
      // this.destination={lat:this.latitudRec,lng:this.latitudRec}

      this.calculateRoute();
    });

  }

  private calculateRoute() {
    console.log("INICIOOOOOOO ",this.origin)
    console.log("INICIOOOOOOO ",this.destination)
    this.directionsService.route({
      origin: this.origin,
      destination: this.destination,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        console.log("DATOS   ", response)
        this.directionsDisplay.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
  }
}

