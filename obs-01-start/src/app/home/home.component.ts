import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    const customIntervalObservable = new Observable(observer => {
      let count = 0;
      const dieOn = 6;
      const completeOn = 3;

      setInterval(() => {
        observer.next(count);

        if (count === completeOn) {
          observer.complete();
        }

        if (count > dieOn) {
          observer.error(new Error(`Count is greater than ${dieOn}`));
        }

        count++;
      }, 1000);

    });

    customIntervalObservable.pipe(map((data: number) => {
      return `Round: ${data + 1}`;
    }));

    this.firstObsSubscription = customIntervalObservable.pipe(
      filter((data: number) => {
        return data > 0;
      }), map((data: number) => {
        return `Round: ${data}`;
      })).subscribe(data => {
        console.log(data);

      }, (error: Error) => {
        alert(error.message);
      }, () => {
        console.log('Completed with our count!');
      });
  }

  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe();
  }

}
