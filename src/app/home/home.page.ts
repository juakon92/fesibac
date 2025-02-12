import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private router: Router
  ) {}

  onClickFecha(){
    this.router.navigate(['/fecha']);
  }

  onClickAsignacion(){
    this.router.navigate(['/asignacion']);
  }

}
