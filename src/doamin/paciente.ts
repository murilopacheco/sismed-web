import {Convenio} from "./convenio";

export interface Paciente {
  id: number;
  nome: string;
  cpf: string;
  dataNascimento: Date;
  email: string;
  telefone: string;
  sexo: string;
  rg: string;
  convenio: Convenio;
}
