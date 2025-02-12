import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.page.html',
  styleUrls: ['./asignacion.page.scss'],
})
export class AsignacionPage implements OnInit {

  selectedDate: string;

  constructor(
    private router: Router
  ) { 
    this.selectedDate = "";
  }

  ngOnInit() {
  }

  goBack(){
    this.router.navigate(['/home']);
  }

  onSwipe(event: any) {
    if (event.detail.deltaX > 0) { // Verifica si el desplazamiento fue de izquierda a derecha
      this.router.navigate(['/home']); // Navega de regreso a la página 'home'
    }
  }

  updateLabel(event:any) {
    // Se obtiene la fecha de la selección y se convierte a un objeto de tipo Date
    const selectedDate = new Date(event.detail.value);

    // Se extraen los componentes de la fecha (día, mes, año)
    const day = selectedDate.getDate();
    const month = selectedDate.getMonth() + 1; // Se suma 1 porque los meses van de 0 a 11
    const year = selectedDate.getFullYear();

    // Se forma la cadena con el formato deseado (DD/MM/YYYY)
    this.selectedDate = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
  }

  onSubmit(){
    const today = new Date();
    const birthDate = new Date(this.selectedDate);
    const diffTime = Math.abs(today.getTime() - birthDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    this.router.navigate(['/entidad'], { state: { edadActual: diffDays } });
  }

}
