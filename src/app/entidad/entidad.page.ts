import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-entidad',
  templateUrl: './entidad.page.html',
  styleUrls: ['./entidad.page.scss'],
})
export class EntidadPage implements OnInit {

  selectedOption: string;
  edadActual: number;

  constructor(
    private router: Router
  ) { 
    this.selectedOption = "";
    this.edadActual = 0;
  }

  ngOnInit() {
    // Acceder al estado pasado desde el componente anterior
    const state = this.router.getCurrentNavigation()?.extras?.state ?? {};
    if ((state as any).hasOwnProperty('edadActual')) {
        this.edadActual = (state as any).edadActual;
        console.log('Estado recibido:', this.edadActual);
    }
  }

  onClick(){
    this.router.navigate(['/formulario'], { state: { edadActual: this.edadActual } });
  }

  goBack(){
    this.router.navigate(['/home']);
  }

}
