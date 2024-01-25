import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { ClienteModel } from '../models/ClienteModel';

@Injectable({
    providedIn: 'root'
})

export class ClienteService {
    constructor(private httpClient: HttpClient)
    {}

    private readonly baseURL = environment["endPoint"];

    Cadastrar(nome:string,cpf:string,dataNascimento:number,renda:number) {
        return this.httpClient.post<ClienteModel>(`${this.baseURL}/Cliente/Cadastrar?Nome${nome}&cpf=${cpf}&cpf=${dataNascimento}&cpf=${renda}`,
            null)
    }

    Atualizar(id:string,nome:string,cpf:string,dataNascimento:number,renda:number) {
        return this.httpClient.post<ClienteModel>(`${this.baseURL}/Cliente/Atualizar?Id${id}&Nome${nome}&cpf=${cpf}&cpf=${dataNascimento}&cpf=${renda}`,
            null)
    }

    Listar() {
        return this.httpClient.get(`${this.baseURL}/Cliente/Listar`);
    }

    Deletar(id: string) {
        return this.httpClient.delete(`${this.baseURL}/Cliente/Deletar?id=${id}`);
    }
}