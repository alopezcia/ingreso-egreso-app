import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';

import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import * as fromIngresoEgreso from './ingreso-egreso.reducer';
// import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../share/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  forma: FormGroup;
  tipo = 'ingreso';
  loadingSubscription: Subscription = new Subscription();
  cargando: boolean;

  constructor(public ingresoEgresoService: IngresoEgresoService, 
              private store: Store<fromIngresoEgreso.AppStatIE>) { }

  ngOnInit(): void {
    this.loadingSubscription = this.store.select('ui')
      .subscribe( ui => this.cargando = ui.isLoading );

    this.forma = new FormGroup({
      'descripcion': new FormControl('', Validators.required),
      'monto': new FormControl(0, Validators.min(0))
    });
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

  crearIngresoEgreso(){
    this.store.dispatch(new ActivarLoadingAction() );
    const ingresoEgreso: IngresoEgreso = new IngresoEgreso({ ...this.forma.value, tipo: this.tipo });
    this.ingresoEgresoService.crearIngresoEgreso( ingresoEgreso )
      .then( () => {
        this.store.dispatch(new DesactivarLoadingAction() );
        Swal.fire('Creado', ingresoEgreso.descripcion, 'success');
        this.forma.reset( { monto: 0 } );
      });


  }
}
