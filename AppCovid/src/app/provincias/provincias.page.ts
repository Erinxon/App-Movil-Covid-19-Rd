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
        this.setError(false, '')
      }else{
        this.setError(true, 'Ocurrió  un error')
      }
    }, error => {
        this.setError(true, 'Ocurrió  un error')
    });
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

  casosActivos(confirm: string, recup: string, falle: string): number{
    const activos = Number(confirm.replace(',','')) - Number(recup.replace(',','')) - Number(falle.replace(',',''));
    return activos;
  }

  onInput(event: any): void {
    this.provincias = this.data.covidPorProvincia;
    const searchTerm = event.srcElement.value;

    if(!searchTerm) return;

    this.provincias = this.data.covidPorProvincia.
                      filter(p => p.nombre.toLowerCase().match(searchTerm.toLowerCase()));
  }

}
