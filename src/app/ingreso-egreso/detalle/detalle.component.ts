import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromIngresoEgreso from '../ingreso-egreso.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[];

  subscipcion: Subscription = new Subscription();

  constructor( private store: Store<fromIngresoEgreso.AppStatIE>, public ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.subscipcion = 
      this.store.select('ingresoEgreso')
        .subscribe( ingresoEgreso => {
        this.items = ingresoEgreso.items;
      });
  }

  ngOnDestroy(): void {
    this.subscipcion.unsubscribe();
  }

  borrarItem(item){
    this.ingresoEgresoService.borrarIngresoEgreso( item.uid )
      .then( () => {
        Swal.fire('Eliminado', item.descripcion, 'success' );
      });
  }

}
