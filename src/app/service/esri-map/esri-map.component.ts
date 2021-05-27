/*
  Copyright 2018 Esri
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {loadModules} from 'esri-loader';
import esri = __esri;
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.css']
})
export class EsriMapComponent implements OnInit {

  @Output() mapLoaded = new EventEmitter<boolean>();
  @Output() plotSelector = new EventEmitter();
  @ViewChild('mapViewNode') private mapViewEl: ElementRef;


  @Input() _zoom;
  @Input() _center;
  @Input() _basemap;

  constructor() {
  }

  async initializeMap() {
    const options = {
      url: environment.GISURL
    };
    try {
      const [EsriMap, EsriMapView] = await loadModules([
        'esri/Map',
        'esri/views/MapView'
      ], options);

      // Set type of map
      const mapProperties: esri.MapProperties = {
        basemap: this._basemap
      };

      const map: esri.Map = new EsriMap(mapProperties);

      // const map = new EsriMap(mapProperties);

      // Set type of map view
      const mapViewProperties: esri.MapViewProperties = {
        container: this.mapViewEl.nativeElement,
        center: this._center,
        zoom: this._zoom,

        map: map
      };

      const mapView: esri.MapView = new EsriMapView(mapViewProperties);
      // const mapExtentChange = mapView.on('mouse-wheel', this.changeHandler);

      const mapExtentChange = mapView.on('click', (evt) => {
        console.log('event', evt);

        this.plotSelector.emit(evt);
      });
      // All resources in the MapView and the map have loaded.
      // Now execute additional processes
      mapView.when(() => {
        this.mapLoaded.emit(true);
      });
    } catch (error) {
      console.log('We have an error: ' + error);
    }

  }

  ngOnInit() {
    this.initializeMap();
     
  }

  changeHandler(evt) {
    console.log('event', evt);

    this.plotSelector.emit(evt);
    // var extent = evt.extent,
    //   zoomed = evt.levelChange;
    // ... Do something ...

    // in some cases, you may want to disconnect the event listener
    // mapExtentChange.remove();
  }
}
