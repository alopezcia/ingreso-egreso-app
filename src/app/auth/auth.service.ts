import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../share/ui.actions';

import * as firebase from 'firebase';
import { map } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { User } from './user.model';
import { AppState } from '../app.reducer';
import { SetUserAction, UnsetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';
import { UnsetItemsAction } from '../ingreso-egreso/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription: Subscription;
  private usuario: User;
  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private afDB: AngularFirestore,
              private store: Store<AppState>  ) { }

  initAuthListener() {
    this.afAuth.authState.subscribe( (fbUser: firebase.User) =>  {
      if (fbUser ) {
        this.userSubscription =  this.afDB.doc(`${ fbUser.uid }/usuario`).valueChanges()
          .subscribe( (usuarioObj: any)  => {
            this.usuario = new User(usuarioObj);
            const action = new SetUserAction(this.usuario);
            this.store.dispatch(action);
          });
      } else {
        this.usuario = null;
        if ( this.userSubscription ) {
          this.userSubscription.unsubscribe();
        }
      }
    });
  }

  crearUsuario( nombre: string, email: string, password: string ){

    this.store.dispatch( new ActivarLoadingAction() );

    this.afAuth
      .createUserWithEmailAndPassword( email, password )
      .then( resp => {
        const user: User = {
          uid: resp.user.uid,
          nombre: nombre,
          email: resp.user.email
        };
        this.afDB.doc(`${ user.uid }/usuario`)
          .set( user )
          .then( () => {
            this.router.navigate(['/']);
            this.store.dispatch( new DesactivarLoadingAction() );
          });

      })
      .catch( error => {
        Swal.fire('Error en el login', error.message, 'error');
      });
  }

  login( email: string, password: string ){
    this.store.dispatch( new ActivarLoadingAction() );
    this.afAuth
      .signInWithEmailAndPassword( email, password )
      .then( resp => {
        this.router.navigate(['/']);
        this.store.dispatch( new DesactivarLoadingAction() );
      })
      .catch( error => {
        Swal.fire('Error en el login', error.message, 'error');
      });
  }

  logout(){
    this.router.navigate(['/login']);
    this.afAuth.signOut();
    this.store.dispatch( new UnsetUserAction() );
  }

  isAuth(){
    return this.afAuth.authState
      .pipe( map( fbUser => {
        if ( fbUser == null ){
          this.router.navigate(['/login']);
          return false;
        } else {
          return true;
        }
      }));
  }

  getUsuario(){
    return { ...this.usuario };
  }
}
