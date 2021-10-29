import { Component, OnInit } from '@angular/core';
import { Data } from '../models/data.models';
import { ErrorModel } from '../models/error.models';
import { Provincia } from '../models/provincia.models';
import { CovidService } from '../services/covid.service';

@Component({
  selector: 'app-provincias',
  templateUrl: './provincias.page.html',
  styleUrls: ['./provincias.page.scss'],
})
export class ProvinciasPage implements OnInit {
  data!: Data;
  isLoanding: boolean = false;
  errorModel: ErrorModel = {
    isError: false,
    message: ''
  };
  provincias!: Provincia[];

  tiposOrdenacion: string[] = ['Ascendente', 'Descendente'];
  ordnaciones: string[] = ['Confirmados', 'Recuperados', 'Fallecidos'];

  tipoOrdenacion: string = "Ascendente";
  ordenacion: string = "Confirmados";


  
  constructor(private covidService: CovidService) { }

  ngOnInit() {
    this.getCasos();
  }

  private getCasos(): void {
    this.isLoanding = true;
    this.covidService.getCasos().subscribe(c => {
      if(c.success){
        this.data = c.data;
        this.provincias = c.data.covidPorProvincia;
        this.ordenarListaProvincias();
        this.setError(false, '')
      }else{
        this.setError(true, 'Ocurrió  un error')
      }
    }, error => {
        this.setError(true, 'Ocurrió  un error')
    });
  }

  casosActivos(confirm: string, recup: string, falle: string): number{
    const activos = Number(confirm.replace(',','')) - Number(recup.replace(',','')) - Number(falle.replace(',',''));
    return activos;
  }

  ordenarListaProvincias(): void {
    for(let i = 0; i < this.provincias.length; i++)
    {
      for(let j = i + 1; j < this.provincias.length; j++){
        if(this.tipoOrdenacion === 'Ascendente'){
          if(Number(this.provincias[i][this.ordenacion.toLowerCase()]) >
           Number(this.provincias[j][this.ordenacion.toLowerCase()])){
            const aux = this.provincias[i];
            this.provincias[i] = this.provincias[j];
            this.provincias[j] = aux;
          }  
        }else{
          if(Number(this.provincias[i][this.ordenacion.toLowerCase()]) < 
          Number(this.provincias[j][this.ordenacion.toLowerCase()])){
            const aux = this.provincias[i];
            this.provincias[i] = this.provincias[j];
            this.provincias[j] = aux;
          }  
        }
      }     
    }
  }

  

  onChange(event: any): void {
    this.ordenarListaProvincias();
  }

  onInput(event: any): void {
    this.provincias = this.data.covidPorProvincia;
    const searchTerm = event.srcElement.value;
    if(!searchTerm) return;
    this.provincias = this.data.covidPorProvincia.
                      filter(p => p.nombre.toLowerCase().match(searchTerm.toLowerCase()));
  }

  private setError(isError: boolean, message: string): void {
    this.errorModel = {
      isError: isError,
      message: message
    }
    this.isLoanding = false;
  }

  reintentar(): void {
    this.getCasos();
  }


}
