import { Http } from '@angular/http';
import { Agendamento } from '../../domain/agendamento/agendamento';
import { Injectable } from '@angular/core';
//import { Storage } from '@ionic/storage';
import { AgendamentoDao } from '../../domain/agendamento/agendamento-dao';

@Injectable()
export class AgendamentoService {

    //constructor(private _http: Http, private _storage: Storage) {}
    constructor(private _http: Http, private _dao: AgendamentoDao) {}

    agenda(agendamento: Agendamento) {
        let api = `https://aluracar.herokuapp.com/salvarpedido?carro=${agendamento.carro.nome}&preco=${agendamento.valor}&nome=${agendamento.nome}&endereco=${agendamento.endereco}&email=${agendamento.email}&dataAgendamento=${agendamento.data}`;
        return this._http
            .get(api)
            .toPromise()
            .then(() => agendamento.confirmado = true, err => console.log(err))
            .then(() => this._dao.salva(agendamento))

            //.then(() => {
            //    let key = agendamento.email + agendamento.data.substr(0, 10);
            //    this._storage.set(key, agendamento);
            //})
            .then(() => agendamento.confirmado);
    }
}