import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { Vibration } from '@ionic-native/vibration'; 
import { DatePicker } from '@ionic-native/date-picker'; 
import { Camera } from '@ionic-native/camera';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { EscolhaPage } from '../pages/escolha/escolha';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { AgendamentoService } from '../domain/agendamento/agendamento-service';
import { Storage } from '@ionic/storage';
import { AgendamentoDao } from '../domain/agendamento/agendamento-dao';
import { AgendamentosPage } from '../pages/agendamentos/agendamentos';
import { LoginPage } from '../pages/login/login';
import { UsuarioService } from '../domain/usuario/usuario-service'
import { PerfilPage } from '../pages/perfil/perfil';

function provideStorage() {
  return new Storage({
    name: 'aluracar',
    storeName: 'agendamentos'
  });
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EscolhaPage,
    CadastroPage,
    AgendamentosPage,
    LoginPage,
    PerfilPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EscolhaPage,
    CadastroPage,
    AgendamentosPage,
    LoginPage,
    PerfilPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}, 
    AgendamentoService,
    { provide: Storage, useFactory: provideStorage},
    AgendamentoDao,
    UsuarioService,
    Vibration,
    DatePicker,
    Camera
  ]
})
export class AppModule {}