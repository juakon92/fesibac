import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-fecha',
  templateUrl: './fecha.page.html',
  styleUrls: ['./fecha.page.scss'],
})
export class FechaPage implements OnInit {

  selectedDate: string;

  constructor(
    private router: Router,
    private alertController: AlertController
  ) { 
    this.selectedDate = "";
  }

  ngOnInit() {
  }

  onSwipe(event: any) {
    if (event.detail.deltaX > 0) { // Verifica si el desplazamiento fue de izquierda a derecha
      this.router.navigate(['/home']); // Navega de regreso a la página 'home'
    }
  }

  goBack(){
    this.router.navigate(['/home']);
  }

  updateLabel(event:any) {
    // Se obtiene la fecha de la selección y se convierte a un objeto de tipo Date
    const selectedDate = new Date(event.detail.value);

    // Se verifica si la fecha es válida
    if (isNaN(selectedDate.getTime())) {
      console.error('Fecha no válida');
      return;
    }

    // Se extraen los componentes de la fecha (día, mes, año)
    const day = selectedDate.getDate();
    const month = selectedDate.getMonth() + 1; // Se suma 1 porque los meses van de 0 a 11
    const year = selectedDate.getFullYear();

    // Se forma la cadena con el formato deseado (DD/MM/YYYY)
    this.selectedDate = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
  }

  async showAlert(message:string){
    const alert = await this.alertController.create({
      header: 'Resultado',
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            const today = new Date();
            const [day, month, year] = this.selectedDate.split('/').map(Number);
            const birthDate = new Date(year, month - 1, day);
            const diffTime = Math.abs(today.getTime() - birthDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            this.router.navigate(['/entidad'], { state: { edadActual: diffDays } });
          }
        }
      ]
    });
    await alert.present();
  }

  onSubmit(){
    const aniosCotizadosInput = document.getElementById('anios-cotizados') as HTMLInputElement;
    const mesesCotizadosInput = document.getElementById('meses-cotizados') as HTMLInputElement;
    const diasCotizadosInput = document.getElementById('dias-cotizados') as HTMLInputElement;
  
    if (aniosCotizadosInput && mesesCotizadosInput && diasCotizadosInput) {
      const aniosCotizados = parseInt(aniosCotizadosInput.value) || 0;
      const mesesCotizados = parseInt(mesesCotizadosInput.value) || 0;
      const diasCotizados = parseInt(diasCotizadosInput.value) || 0;
  
      const suma = aniosCotizados * 365 + mesesCotizados * 30 + diasCotizados;
      const [day, month, year] = this.selectedDate.split('/').map(Number);
      const birthDate = new Date(year, month - 1, day);
      const edadActual = new Date().getFullYear() - birthDate.getFullYear();
      const diferencia = this.calcularDiferencia(edadActual);
      const edadJubilacion = this.calcularEdadJubilacion(suma, diferencia);
  
      this.showAlert(edadJubilacion);
    } else {
      console.error('Alguno de los elementos de cotización no existe.');
    }
  }

  calcularDiferencia(edadActual: number): number {
    const edadPre = 65;
    const [day, month, year] = this.selectedDate.split('/').map(Number);
    const fechaSeleccionada = new Date(year, month - 1, day);
    const hoy = new Date();
    let diferencia = edadPre - edadActual;

    if (fechaSeleccionada.getMonth() > hoy.getMonth() ||
      (fechaSeleccionada.getMonth() === hoy.getMonth() && fechaSeleccionada.getDate() > hoy.getDate())) {
      diferencia--;
    }

    return diferencia;
  }

  calcularEdadJubilacion(suma: number, diferencia: number): string {
    const aniosCotizacionMinima = 38 * 365; // 38 años
    let edadJubilacion: number;

    if (diferencia === 0 && suma >= aniosCotizacionMinima) {
      edadJubilacion = 65;
    } else if (diferencia === 0) {
      edadJubilacion = 66;
    } else if (diferencia === 1 && suma + (diferencia * 365) >= aniosCotizacionMinima + 365) {
      edadJubilacion = 65;
    } else if (diferencia === 1) {
      edadJubilacion = 66;
    } else if (diferencia === 2 && suma + (diferencia * 365) >= aniosCotizacionMinima + 365) {
      edadJubilacion = 65;
    } else if (diferencia === 2) {
      edadJubilacion = 66;
    } else if (suma + (diferencia * 365) >= aniosCotizacionMinima + (365 * 2)) {
      edadJubilacion = 65;
    } else {
      edadJubilacion = 67;
    }

    const [day, month, year] = this.selectedDate.split('/').map(Number);
    const fechaNacimiento = new Date(year, month - 1, day);
    const fechaJubilacion = new Date(fechaNacimiento);
    fechaJubilacion.setFullYear(fechaJubilacion.getFullYear() + edadJubilacion);

    const dateFormat = new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const fechaJubilacionString = dateFormat.format(fechaJubilacion);

    // Calcula la fecha de jubilación anticipada
    const fechaJubilacionAnticipada = new Date(fechaJubilacion);
    fechaJubilacionAnticipada.setFullYear(fechaJubilacionAnticipada.getFullYear() - 2);
    const fechaJubilacionAnticipadaString = dateFormat.format(fechaJubilacionAnticipada);

    if(edadJubilacion == 67){
      return `Tu edad ordinaria de jubilación es a los ${edadJubilacion} años. \nFecha de jubilación: ${fechaJubilacionString}`;
    }

    return `Tu edad ordinaria de jubilación es a los ${edadJubilacion} años. \nFecha de jubilación: ${fechaJubilacionString}. \nPudiendo anticipar al: ${fechaJubilacionAnticipadaString}`;
  }

  async validar(event:any, max: number){
    let inputValue = event.target.value;
    if (inputValue > max) {
      const alert = await this.alertController.create({
        header: 'Valor inválido',
        message: `No se puede ingresar un número mayor que ${max}.`,
        buttons: ['OK']
    });

    await alert.present();
    }
  }
}
