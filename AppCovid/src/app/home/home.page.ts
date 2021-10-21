import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { ErrorModel } from '../models/error.models';
import { CovidService } from '../services/covid.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  data!: Data;
  isLoanding: boolean = false;
  errorModel: ErrorModel = {
    isError: false,
    message: ''
  };
  constructor(private covidService: CovidService) { }

  ngOnInit() {
    this.getCasos();
  }

  private getCasos(): void {
    this.isLoanding = true;
    this.covidService.getCasos().subscribe(c => {
      if(c.success){
        this.data = c.data;
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



}
