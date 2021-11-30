import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Paciente} from "../../doamin/paciente";
import {EMPTY, Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private httpClient: HttpClient,
              private snackbar: MatSnackBar) {}

  // pacientes: Paciente[];

  listarPaciente(): Observable<Paciente[]>{
    const url = `${environment.config.URL_API}/pacientes/search/listPacientes`;
    return this.httpClient.get<Paciente[]>(url).pipe(
      map((pacientes) => pacientes)
    );
  }

  inserirPaciente(paciente: Paciente): Observable<Paciente>{
    const url = `${environment.config.URL_API}/pacientes/add`;
    return this.httpClient.post<Paciente>(url, paciente).pipe(
      map(obj => obj),
      catchError( (e) => this.errorHandler(e))
    );
  }

  editarPaciente(paciente: Paciente): Observable<Paciente>{
    const url = `${environment.config.URL_API}/pacientes/edit`;
    return this.httpClient.put<Paciente>(url, paciente).pipe(
      map(obj => obj),
      catchError( (e) => this.errorHandler(e))
    );
  }

  deletarPaciente(id: number): Observable<Paciente>{
    const url = `${environment.config.URL_API}/pacientes/delete/` + id;
    return this.httpClient.delete<Paciente>(url).pipe(
      map(obj => obj),
      catchError( (e) => this.errorHandler(e))
    );
  }


  errorHandler(e: any): Observable<any>{
    this.showMessage('Ocorreu um erro!', true );
    return EMPTY;
  }

  showMessage(msg: string, isError: boolean = false): void{
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    });
  }



}
