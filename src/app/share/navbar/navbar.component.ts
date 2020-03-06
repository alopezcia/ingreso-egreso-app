import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {

  nombre: string;
  subscripcion: Subscription = new Subscription();

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.subscripcion = this.store.select('auth')
      .subscribe( auth => { 
        if( auth.user !== null ){
          this.nombre = auth.user.nombre;
        }
      });
  }

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }

}
