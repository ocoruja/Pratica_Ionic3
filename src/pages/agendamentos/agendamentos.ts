import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AgendamentoDao } from '../../domain/agendamento/agendamento-dao';
import { Agendamento } from '../../domain/agendamento/agendamento';

@IonicPage()
@Component({
  templateUrl: 'agendamentos.html',
})
export class AgendamentosPage {


  public agendamentos: Agendamento[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _dao: AgendamentoDao) {

      this._dao
        .listaTodos()
        .then(agendamentos => this.agendamentos = agendamentos);
    }

}
