import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-listar-imagen',
  templateUrl: './listar-imagen.component.html',
  styleUrls: ['./listar-imagen.component.css']
})
export class ListarImagenComponent implements OnInit {
  termino = '';
  suscripcion:Subscription;
  listImagenes: any[] = [];
  loading = false;
  imagenesPorPagina=30;
  paginaActual = 1;
  calcularTotalDePaginas = 0;

  constructor(private _imagenServie: ImagenService) { 
    this.suscripcion = this._imagenServie.getTerminoBusqeud().subscribe(data =>{
      this.termino = data;
      this.paginaActual = 1;
      this.loading = true;
      this.obtenerImagenes();
    })
  }

  ngOnInit(): void {
  }

  obtenerImagenes(){
    this._imagenServie.getimagenes(this.termino, this.imagenesPorPagina, this.paginaActual).subscribe(data => {
      this.loading = false;

      if (data.hits.length === 0) {
        this._imagenServie.setError('Opss... No encontramos ninguna imagen que coincida con lo escrito.');
        return;
      }

      this.calcularTotalDePaginas = Math.ceil(data.totalHits / this.imagenesPorPagina);

      this.listImagenes = data.hits;
    }, error =>{
      this._imagenServie.setError('Opss...El servidor esta caido o la URL es incorrecta');
      this.loading = false;
    })
  }

  paginaAnterior(){
    this.paginaActual --;
    this.loading = true;
    this.listImagenes = [];
    this.obtenerImagenes();
  }

  paginaSiguiente(){
    this.paginaActual ++;
    this.loading = true;
    this.listImagenes = [];
    this.obtenerImagenes();
  }

  paginaAnteriorClaas(){
    if (this.paginaActual === 1) {
      return false;
    }else{
      return true;
    }
  }

  paginaSiguienteClaas(){
    if (this.paginaActual === this.calcularTotalDePaginas) {
      return false;
    }else{
      return true;
    }
  }


}
