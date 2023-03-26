import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  relayId = new Subject<any>();
  relayedId$ = this.relayId.asObservable();

  receiveId(id: string) {
    this.relayId.next(id);
  }


  constructor() { }
}
