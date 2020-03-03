import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import * as firebase from 'firebase';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router  ) { }

  initAuthListener() {
    this.afAuth.authState.subscribe( (fbUser: firebase.User) =>  {
      console.log(fbUser);
    });
  }

  crearUsuario( nombre: string, email: string, password: string ){
    this.afAuth
      .createUserWithEmailAndPassword( email, password )
      .then( resp => {
        console.log(resp);
        this.router.navigate(['/']);
      })
      .catch( error => {
        Swal.fire('Error en el login', error.message, 'error');
      });
  }

  login( email: string, password: string ){
    this.afAuth
      .signInWithEmailAndPassword( email, password )
      .then( resp => {
        console.log(resp);
        this.router.navigate(['/']);
      })
      .catch( error => {
        Swal.fire('Error en el login', error.message, 'error');
      });
  }

  logout(){
    this.router.navigate(['/login']);
    this.afAuth.signOut();
  }

}
