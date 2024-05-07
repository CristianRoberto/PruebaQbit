import { Component, OnInit } from '@angular/core';
import {UserService} from '../servicios/user.service';
import { PopoverController } from '@ionic/angular';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RegistrarproductoComponent } from '../components/registrarproducto/registrarproducto.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  products: any = [];
  auxproducts = [];

  constructor(
    public popover: PopoverController,
    public toast: ToastController,
    public loadingController: LoadingController,
    private servicio: UserService,
    private router: Router
    ) {}

    ngOnInit(): void {
    }

    verProducto(id: any) {
      this.router.navigate(['/producto', id]);
    }
    ionViewDidEnter() {
      this.search();
    }

    //realiza la busqueda en la base de datos llama al servicio
    async search(): Promise<void> {
      const loading = await this.loadingController.create({ message: 'Cargando...' });
      await loading.present();
      this.servicio.getProductos().then(async (re: any) => {
        this.products = [];
        this.auxproducts = [];
        this.products = re;
        this.auxproducts = this.products;
        await loading.dismiss();
        this.presentToast('Bienvenido, Conectado Con el Servidor');
      }).catch(async (e) => {
        await loading.dismiss();
        this.presentToast('Error de conexion con el Servidor');
      });
    }
  presentToast(arg0: string) {
    throw new Error('Method not implemented.');
  }

  handleRefresh(event: any) {
    this.search();
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  };

  // eslint-disable-next-line @typescript-eslint/naming-convention
  async CreateProducto(): Promise<void> {
    const alert = await this.popover.create({
      component: RegistrarproductoComponent,
      mode: 'ios',
      cssClass: 'pop-over-style1',
    });
    return await alert.present();

  }
}
