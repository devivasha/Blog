import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AlertService} from '../../services/alert.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() delay = 5000;
  public  text: string;
  public type = 'success';
  alertSub = Subscription;
  constructor(private alertService: AlertService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    // @ts-ignore
    this.alertSub = this.alertService.alert$.subscribe(alert => {
        this.text = alert.text;
        this.type = alert.type;
        const timeout = setTimeout(() => {
          clearTimeout(timeout);
          this.text = '';
        }, this.delay);
    });
  }
  // tslint:disable-next-line:typedef
  ngOnDestroy() {
    if (this.alertSub){
      // @ts-ignore
      this.alertSub.unsubscribe();
    }
  }

}
