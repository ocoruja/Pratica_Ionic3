import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Usuario } from './usuario'

@Injectable()
export class UsuarioService {
    
    constructor(private _http: Http){}

    public efetuaLogin(email: string, senha: string) {
        let api = `https://aluracar.herokuapp.com/login?email=${email}&senha=${senha}`;
        return this._http.get(api)
        .toPromise()
        .then(res => res.json().usuario)
        .then(dado => new Usuario(
                dado.nome,
                dado.dataNascimento,
                dado.email,
                dado.telefone
            ));
        
    }
}