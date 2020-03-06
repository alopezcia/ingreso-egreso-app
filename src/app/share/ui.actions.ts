import { Action } from '@ngrx/store';

export const ACTIVAR_LOADING = '[UI Loading] Cargando...';
export const DESACTIVAR_LOADING = '[UI Loading] Fin de Carga...';


export class ActivarLoadingAction implements Action {
    readonly type: string = ACTIVAR_LOADING;
}

export class DesactivarLoadingAction implements Action {
    readonly type: string = DESACTIVAR_LOADING;
}

export type acciones = ActivarLoadingAction | DesactivarLoadingAction;
