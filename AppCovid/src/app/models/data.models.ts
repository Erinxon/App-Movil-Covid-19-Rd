import { Provincia } from "./provincia.models";

export interface Data {
    confirmados: string;
    recuperados: string;
    fallecidos: string;
    covidPorProvincia: Provincia[];
    ultimaActualizacion: string;
}