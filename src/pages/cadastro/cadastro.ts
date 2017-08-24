import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { Carro } from '../../domain/carro/carro';

import { Http } from '@angular/http';


@IonicPage()
@Component({
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  public carro: Carro;
  public precoTotal: number;

  public nome: string;
  public endereco: string;
  public email: string;
  public data: string = new Date().toISOString();
  private _alerta: Alert;

  // só faz sentido HTTP ser usado pelo próprio CadastroPage, por isso o modificador private foi usado
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _http: Http,
    private _alertCtrl: AlertController) {
    this.carro = this.navParams.get('carro');
    this.precoTotal = this.navParams.get('precoTotal');
    this._alerta = this._alertCtrl.create({
      title: 'Aviso',
      buttons: [{ text: 'Ok'}]
    })
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
    let api = `https://aluracar.herokuapp.com/salvarpedido?carro=${this.carro.nome}&preco=${this.precoTotal}&nome=${this.nome}&endereco=${this.endereco}&email=${this.email}&dataAgendamento=${this.data}`;
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
