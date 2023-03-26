import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToggleSignupService {
  visible: boolean = false;

  toggleVisible() {
    this.visible = !this.visible;
  }
}
