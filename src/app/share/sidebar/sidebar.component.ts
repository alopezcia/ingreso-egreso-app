import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { filter } from 'rxjs/operators';
import { IngresoEgresoService } from '../../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  nombre: string;
  subscripcion: Subscription = new Subscription();

  constructor(public authService: AuthService, private store: Store<AppState>, public ingresoEgreso: IngresoEgresoService ) { }

  ngOnInit(): void {
    this.subscripcion = this.store.select('auth')
      .pipe(
        filter( auth => auth.user != null )
      )
      .subscribe( auth => this.nombre = auth.user.nombre );
      // .subscribe( auth => { 
      //   if( auth.user !== null ){
      //     this.nombre = auth.user.nombre;
      //   }
      // });
  }

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }


  logout() {
    this.authService.logout();
    this.ingresoEgreso.cancelarSubscriptions();
  }

}
