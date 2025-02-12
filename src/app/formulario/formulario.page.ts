import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit{

  formulario: FormGroup;
  edadActual: number;

  constructor(
    private router: Router,
    private alertController: AlertController
  ) { 
    this.edadActual = 0;
    this.formulario = new FormGroup({
      salario: new FormControl(null, [
        Validators.required
      ]),
      triAntiguedad: new FormControl(null, [
        Validators.required
      ]),
      triTecnicos: new FormControl(),
      complPersDestino: new FormControl(),
      cptoPersDestino: new FormControl(),
      compFiestasSupr: new FormControl(),
      plusPoliFunc: new FormControl(),
      difArticulo: new FormControl(),
      partBenefi: new FormControl(null, [
        Validators.required
      ]),
      plusTRA: new FormControl(),
      difSueldoCatSup: new FormControl(),
      sobresueldoCompGest: new FormControl(),
      compJorEspecial: new FormControl(),
      complPuestoTrab: new FormControl(),
      complFuncTrans: new FormControl(),
      sobresueldoEspecial: new FormControl(),
      complPersonal: new FormControl(),
      complVolunPersonal: new FormControl(),
      complVoluntario: new FormControl(),
      complVolunPuesto: new FormControl(),
      complRemunEspecial: new FormControl(),
      complMA: new FormControl()
    });
  }

  ngOnInit() {
    // Acceder al estado pasado desde el componente anterior
    const state = this.router.getCurrentNavigation()?.extras?.state ?? {};
    if ((state as any).hasOwnProperty('edadActual')) {
        this.edadActual = (state as any).edadActual;
        console.log('Estado recibido:', this.edadActual);
    }
  }

  checkError(control: string, error: string){
    const formControl = this.formulario.get(control);
  
    // Verificar si el control existe y ha sido tocado
    if (formControl && formControl.touched) {
      // Verificar si el campo tiene el error especificado
      return formControl.hasError(error);
    }

    return false;
  }

  goBack(){
    this.router.navigate(['/entidad']);
  }

  onSubmit($event: any){
    console.log(this.formulario.value);
  }

  onClick(){
    this.calcularYMostrarResultado(this.edadActual);
  }

  calcularYMostrarResultado(edadActual: number){
    edadActual = Math.floor(edadActual/365);

    const salario: number = parseFloat(this.formulario.get('salario')?.value) || 0.0;
    const triAntiguedad: number = parseFloat(this.formulario.get('triAntiguedad')?.value) || 0.0;
    const triTecnicos: number = parseFloat(this.formulario.get('triTecnicos')?.value) || 0.0;
    const complPersDestino: number = parseFloat(this.formulario.get('complPersDestino')?.value) || 0.0;
    const difSueldoCatSup: number = parseFloat(this.formulario.get('difSueldoCatSup')?.value) || 0.0;
    const sobreSueldoCompGest: number = parseFloat(this.formulario.get('sobresueldoCompGest')?.value) || 0.0;
    const complPuestoTrab: number = parseFloat(this.formulario.get('complPuestoTrab')?.value) || 0.0;
    const sobreSueldoEspecial: number = parseFloat(this.formulario.get('sobresueldoEspecial')?.value) || 0.0;
    const complPersonal: number = parseFloat(this.formulario.get('complPersonal')?.value) || 0.0;
    const complVolunPersonal: number = parseFloat(this.formulario.get('complVolunPersonal')?.value) || 0.0;
    const complVoluntario: number = parseFloat(this.formulario.get('complVoluntario')?.value) || 0.0;
    const complVolunPuesto: number = parseFloat(this.formulario.get('complVolunPuesto')?.value) || 0.0;
    const complRemunEspecial: number = parseFloat(this.formulario.get('complRemunEspecial')?.value) || 0.0;
    const complMA: number = parseFloat(this.formulario.get('complMA')?.value) || 0.0;
    const cptoPersDestino: number = parseFloat(this.formulario.get('cptoPersDestino')?.value) || 0.0;
    const plusPoliFunc: number = parseFloat(this.formulario.get('plusPoliFunc')?.value) || 0.0;
    const difArticulo: number = parseFloat(this.formulario.get('difArticulo')?.value) || 0.0;
    const partBenefi: number = parseFloat(this.formulario.get('partBenefi')?.value) || 0.0;
    const plusTRA: number = parseFloat(this.formulario.get('plusTRA')?.value) || 0.0;
    const complFuncTrans: number = parseFloat(this.formulario.get('complFuncTrans')?.value) || 0.0;
    const compJorEspecial: number = parseFloat(this.formulario.get('compJorEspecial')?.value) || 0.0;
    const compFiestasSupr: number = parseFloat(this.formulario.get('compFiestasSupr')?.value) || 0.0;

    const FACTOR_14 = 14;
    const FACTOR_12 = 12;

    const a_b: number =
      (salario * FACTOR_14) + (triAntiguedad * FACTOR_14) + (triTecnicos * FACTOR_14) + (complPersDestino * FACTOR_14) + (difSueldoCatSup * FACTOR_14) +
      (sobreSueldoCompGest * FACTOR_14) + (complPuestoTrab * FACTOR_14) + (sobreSueldoEspecial * FACTOR_14) + (cptoPersDestino * FACTOR_12) + (plusPoliFunc * FACTOR_12) + (difArticulo * FACTOR_12) + (partBenefi * FACTOR_12) +
      (plusTRA * FACTOR_12) + (complFuncTrans * FACTOR_12) + (compFiestasSupr * 2) + (compJorEspecial);

    const c: number = 
    (complPersonal * FACTOR_14) +
    (complVolunPersonal * FACTOR_14) + (complVoluntario * FACTOR_14) + (complVolunPuesto * FACTOR_14) + (complRemunEspecial * FACTOR_14) +
    (complMA * FACTOR_14);

    let resultado: number;
    let resultado_ab: number;
    let resultado_c: number;

    if(edadActual >= 55 && edadActual <= 57){
      resultado = Math.max(a_b * 0.74, c > 0 ? (a_b * 0.67) + (c * 0.54) : 0);
      resultado_ab = a_b * 0.74;
      resultado_c = (a_b * 0.67) + (c * 0.54);
    } else if (edadActual >= 58 && edadActual <= 61) {
      resultado = Math.max(a_b * 0.76, c > 0 ? (a_b * 0.70) + (c * 0.56) : 0);
      resultado_ab = a_b * 0.76;
      resultado_c = (a_b * 0.70) + (c * 0.56);
  } else {
      resultado = a_b + c;
  }

    this.mostrarResultado(resultado, edadActual);
  }

  mostrarResultado(resultado: number, edadActual: number) {

    let mensaje: string;

    if (edadActual < 55) {
      this.mostrarMensajeEdadMinima();
      return;
    }

    const resultadoDividido = resultado / 12.0;
    const resultadoFormateado = resultadoDividido.toFixed(2);

    mensaje = `La asignación concertada sería: ${resultadoFormateado} € brutos/mes`;

    const dialog = this.alertController.create({
        header: 'Resultado',
        message: mensaje,
        buttons: [
            {
                text: 'Aceptar',
                handler: () => {
                    this.limpiarCajasDeTexto();
                }
            }
        ]
    });

    dialog.then(alert => {
        alert.present();
    });
  }

  mostrarMensajeEdadMinima() {
      const mensaje = 'Las prejubilaciones son a partir de 55 años';
      const dialog = this.alertController.create({
          header: 'Alerta',
          message: mensaje,
          buttons: ['Aceptar']
      });

      dialog.then(alert => {
          alert.present();
      });
  }

  limpiarCajasDeTexto() {
    const cajasDeTexto = [
        'salario', 'triAntiguedad', 'triTecnicos', 'complPersDestino', 'difSueldoCatSup',
        'sobreSueldoCompGest', 'complPuestoTrab', 'sobreSueldoEspecial', 'complPersonal',
        'complVolunPersonal', 'complVoluntario', 'complVolunPuesto', 'complRemunEspecial',
        'complMA', 'cptoPersDestino', 'plusPoliFunc', 'difArticulo', 'partBenefi', 'plusTRA',
        'complFuncTrans', 'compJorEspecial', 'compFiestasSupr'
    ];

    cajasDeTexto.forEach(control => {
        this.formulario.get(control)?.reset();
    });
  }
  
}
