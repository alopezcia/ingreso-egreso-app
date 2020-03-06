import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
// import { AppState } from '../../app.reducer';
import * as fromIngresoEgreso from '../ingreso-egreso.reducer';

import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../ingreso-egreso.model';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit, OnDestroy {

  ingresos: number;
  egresos: number;
  cuantoIngresos: number;
  cuantoEgresos: number;
  subscripcion: Subscription = new Subscription();


  public doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: number[] = [];
  public doughnutChartType: string = 'doughnut';

  constructor(private store: Store<fromIngresoEgreso.AppStatIE>) { }

  ngOnInit(): void {
    this.subscripcion = this.store.select('ingresoEgreso')
      .subscribe( ingresoEgreso =>  {
        this.contarIngresoEgreso( ingresoEgreso.items );
      });
  }

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }

  contarIngresoEgreso( items: IngresoEgreso[]){
    this.ingresos = 0;
    this.egresos = 0;
    this.cuantoIngresos = 0;
    this.cuantoEgresos = 0;
    items.forEach(  item =>  {
      if ( item.tipo === 'ingreso' ) {
        this.ingresos += item.monto;
        this.cuantoIngresos++;
      } else {
        this.egresos += item.monto;
        this.cuantoEgresos++;

      }
    });
    this.doughnutChartData = [this.ingresos, this.egresos];

  }
}
