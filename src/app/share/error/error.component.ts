import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  texto = '';
  mostrar = false;
  suscripcion: Subscription;

  constructor(private _imagenServie: ImagenService) {
      this.suscripcion = this._imagenServie.getError().subscribe(data =>{
      this.mostrarMensaje();
      this.texto = data;
    });
   }

  ngOnInit(): void {
  }

  ngOnDestroid(){
    this.suscripcion.unsubscribe();
  }

  mostrarMensaje(){
    this.mostrar = true;
    setTimeout(() => {
      this.mostrar = false;
    }, 2000);
  }

}
