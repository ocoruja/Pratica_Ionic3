import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { Carro } from '../../domain/carro/carro';
import { Agendamento } from '../../domain/agendamento/agendamento';
import { AgendamentoService } from '../../domain/agendamento/agendamento-service';
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
    private _service: AgendamentoService,
    private _alertCtrl: AlertController) {
    this.carro = this.navParams.get('carro');
    this.precoTotal = this.navParams.get('precoTotal');

    this.agendamento = new Agendamento(this.carro, this.precoTotal);

    this._alerta =  this._alertCtrl.create({
      title: 'Aviso',
      buttons: [{ text: 'OK', handler: () => {this.navCtrl.setRoot(HomePage)} }]
      //buttons: [{ text: 'OK', handler: () => alert('oi') }]
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
    if(!this.agendamento.nome || !this.agendamento.email || !this.agendamento.endereco) {
      this._alertCtrl.create({
        title: 'Preenchimento obrigatório!',
        subTitle: 'Você deve preencher todas as informações',
        buttons: [{ text: 'OK '}]
      }).present();

      return; // esse return impede que o código anterior seja executado em caso de nao preenchimento

    }
    // utilizaremos o método get apenas por orientação do email.txt
    this._service
      .agenda(this.agendamento)

      .then(confirmado => {
        confirmado ?
          this._alerta.setSubTitle('Agendamento realizado com sucesso!'):
          this._alerta.setSubTitle('Desculpe, não foi possível realizar o agendamento. Tente mais tarde.');
        this._alerta.present();
      });

    //console.log(this.nome);
  }
}