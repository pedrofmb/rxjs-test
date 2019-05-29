import { of } from 'rxjs'; 
import { map } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { scan } from 'rxjs/operators';
import { Observable } from 'rxjs';

const source = of('World meca').pipe(
  map(x => `Hello ${x}!`)
);

source.subscribe(x => console.log(x));

let count = 0;

document.addEventListener('click', () => console.log(`Clicked ${++count} times`));

fromEvent(document, 'click')
  .pipe(scan(count => count + 2, 0))
  .subscribe(count => console.log(`Clicked => ${count} times`));


const observable = new Observable(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});
 
console.log('just before subscribe');
observable.subscribe({
  next(x) { console.log('got value ' + x); },
  error(err) { console.error('something wrong occurred: ' + err); },
  complete() { console.log('done'); }
});
console.log('just after subscribe');