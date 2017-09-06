import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioService } from '../../domain/usuario/usuario-service';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public _service: UsuarioService ) {
  }

  get usuarioLogado() {
    return this._service.obtemUsuarioLogado();
  }

}
