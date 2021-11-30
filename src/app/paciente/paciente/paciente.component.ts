import { Component, OnInit } from '@angular/core';
import {Paciente} from "../../../doamin/paciente";
import {PacienteService} from "../paciente.service";
import {Convenio} from "../../../doamin/convenio";
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {DateAdapter, ErrorStateMatcher, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter
} from "@angular/material-moment-adapter";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class PacienteComponent implements OnInit {

  constructor(
    private pacienteService: PacienteService,
    private fb: FormBuilder,
  ) { }

  pacientes: Paciente[] = [];


  displayedColumns: string[] = ['id', 'nome', 'cpf', 'telefone','acoes'];

  // @ts-ignore
  dataSource;

  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {
    this.pacienteService.listarPaciente().subscribe(dados =>{
      this.pacientes = dados;
      this.dataSource = this.pacientes;
    });
    this.formPaciente = this.fb.group({     // {5}
      id: [this.paciente.id],
      nome: [this.paciente.nome, [Validators.required, Validators.minLength(3)]],
      cpf: [this.paciente.cpf, Validators.required],
      dataNascimento: [this.paciente.dataNascimento]
    });


  }

  // @ts-ignore
  formPaciente: FormGroup;

  convenio: Convenio = {
    id: 1,
    nome: "Unimed Goiania",
    registoAns: "123",
    telefone: "(62)3222-2222"
  };
  // paciente : Paciente = {id: 0, nome: 'Paciente angular', cpf: '10621855014', dataNascimento: new Date(2002,3,3),
  //   email: 'testeangular@teste.com', telefone: '(62) 3222-3333', sexo: 'M', rg: '123ABC', convenio: this.convenio};

  // @ts-ignore
  paciente : Paciente = {id: null, nome: '', cpf: '', dataNascimento: null,
      email: '', telefone: '', sexo: '', rg: '',convenio: this.convenio};


  manterPaciete() : void{
    this.paciente = this.formPaciente.value;
    this.paciente.convenio = this.convenio;
    if(this.paciente.id == null) {
      this.pacienteService.inserirPaciente(this.paciente).subscribe((dados) => {
        this.pacienteService.showMessage('Cliente Salvo com sucesso!', false);
        this.pacientes.push(dados);
        this.dataSource = this.pacientes;
        location.reload();
      });
    }else{
      this.pacienteService.editarPaciente(this.paciente).subscribe((dados) => {
        this.pacienteService.showMessage('Cliente Salvo com sucesso!', false);
        this.pacientes.push(dados);
        this.dataSource = this.pacientes;
        location.reload();
      });
    }
  }

  prepararEdicaoPaciente(paciente: Paciente) : void{
    console.log(paciente);
    this.paciente = paciente;
    this.formPaciente = this.fb.group({     // {5}
      id: [this.paciente.id],
      nome: [this.paciente.nome, [Validators.required, Validators.minLength(6)]],
      cpf: [this.paciente.cpf, Validators.required],
      dataNascimento: [this.paciente.dataNascimento]
    });

  }

  deletarPaciente(paciete: Paciente){
    this.pacienteService.deletarPaciente(paciete.id).subscribe((dados) => {
      this.pacienteService.showMessage('Cliente Salvo com sucesso!', false);
      this.pacientes.push(dados);
      this.dataSource = this.pacientes;
      location.reload();
    });
  }




  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return false;
  }

  get getControl(){
    return this.formPaciente.controls;
  }



}
