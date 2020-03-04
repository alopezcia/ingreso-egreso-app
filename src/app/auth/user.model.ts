import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


interface DataObj {
    uid: string;
    email: string;
    nombre: string;
}

export class User {
    public nombre: string;
    public email: string;
    public uid: string;

    constructor(obj: DataObj ){
            // condicional: si existe obj entonces obtiene obj.nombre, sino pone null
        this.nombre  = obj && obj.nombre || null;
        this.email = obj && obj.email || null;
        this.uid = obj && obj.uid || null;
    }


}

