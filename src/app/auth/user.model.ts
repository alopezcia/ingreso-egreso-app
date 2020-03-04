import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

export class User {
    public nombre: string;
    public email: string;
    public uid: string;

    constructor(nombre: string, email: string, uid: string){
        this.nombre  = nombre;
        this.email = email;
        this.uid = uid;
    }
}