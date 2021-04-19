import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

export type AlertType = 'success' | 'warning' | 'danger';
export interface Alert {
  type: AlertType;
  text: string;
}
@Injectable()
export class AlertService {
  public alert$ = new Subject<Alert>();
  // tslint:disable-next-line:typedef
  success(text: string){
    this.alert$.next({type: 'success', text});

  }
  // tslint:disable-next-line:typedef
  warning(text: string){
    this.alert$.next({type: 'warning', text});
  }
  // tslint:disable-next-line:typedef
  danger(text: string){
    this.alert$.next({type: 'danger', text});
  }

}
