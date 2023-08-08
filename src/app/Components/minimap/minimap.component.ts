import { Component ,Input, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-minimap',
  templateUrl: './minimap.component.html',
  styleUrls: ['./minimap.component.css']
})
export class MinimapComponent implements AfterViewInit{
  @Input() Posicion : { latitud: number; longitud: number } = { latitud: 0, longitud: 0 };
  @ViewChild('mapa') divMapa!:ElementRef;


  ngAfterViewInit(): void {
    (mapboxgl as any).accessToken = environment.maptoken;
    var mapa = new mapboxgl.Map({
    container: this.divMapa.nativeElement,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [this.Posicion.longitud, this.Posicion.latitud],
    zoom: 15,
      });


      new mapboxgl.Marker()
        .setLngLat([this.Posicion.longitud, this.Posicion.latitud])
        .addTo(mapa)
  }


}
