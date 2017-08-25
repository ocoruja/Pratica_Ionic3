import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { Carro } from '../../domain/carro/carro';
import { Agendamento } from '../../domain/agendamento/agendamento';

import { Http } from '@angular/http';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  templateUrl: 'cadastro.html'
})
export class CadastroPage {

  public carro: Carro;
  public precoTotal: number;
  public agendamento: Agendamento;
  private _alerta: Alert;

  // só faz sentido HTTP ser usado pelo próprio CadastroPage, por isso o modificador private foi usado
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _http: Http,
    private _alertCtrl: AlertController) {
    this.carro = this.navParams.get('carro');
    this.precoTotal = this.navParams.get('precoTotal');

    this.agendamento = new Agendamento(this.carro, this.precoTotal);

    this._alerta =  this._alertCtrl.create({
      title: 'Aviso',
      //buttons: [{ text: 'OK', handler: () => this.navCtrl.push(HomePage) }]
      buttons: [{ text: 'OK', handler: () => alert('oi') }]
    });
  }

  /*
  carro: o nome do carro
  preco: o preço total do carro com seus acessórios
  nome: nome de quem agendou
  endereco: endereço de quem agendou
  email: email de quem agendou
  dataAgendamento: a data do agendamento
  */

  agenda() {
    // utilizaremos o método get apenas por orientação do email.txt
    let api = `https://aluracar.herokuapp.com/salvarpedido?carro=${this.agendamento.carro.nome}&preco=${this.agendamento.valor}&nome=${this.agendamento.nome}&endereco=${this.agendamento.endereco}&email=${this.agendamento.email}&dataAgendamento=${this.agendamento.data}`;
    this._http
      .get(api)
      .toPromise()
      .then(() => {
        this._alerta.setSubTitle('Agendamento realizado com sucesso!');
        this._alerta.present();

      })
      .catch(err => {
        console.log(err);
        this._alerta.setSubTitle('Desculpe, não foi possível realizar o agendamento. Tente mais tarde.');
        this._alerta.present();
      });

    //console.log(this.nome);
  }
}
