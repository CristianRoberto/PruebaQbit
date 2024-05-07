import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { UserService } from '../../servicios/user.service';
import { PopoverController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-registrarproducto',
  templateUrl: './registrarproducto.component.html',
  styleUrls: ['./registrarproducto.component.scss'],
})
export class RegistrarproductoComponent implements OnInit {

  elementos: any = {
    formato: '',
  };

  public previsualizacion!: string;
  public archivos: any = [];
  public archivoCargado: any;




  constructor(
    private sanitizer: DomSanitizer,
    public toast: ToastController,
    public popover: PopoverController,
    private servicio: UserService

  ) {
   }

  ngOnInit() {}

  async exit() {
    this.popover.dismiss();
  }
  cargaArchivo2(event: any): any {
    this.archivoCargado = event.target.files[0];
    this.archivos.push(this.archivoCargado);
    this.extraerBase64(this.archivoCargado).then((imagen: any) => {
      this.previsualizacion = imagen.base;
      console.log(imagen);
    });
  }
  extraerBase64 = async ($event: any) => new Promise((resolve, reject): any => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  });
  clearImage(): any {
    this.previsualizacion = '';
    this.archivos = [];
  }

  async presentToast(message: any) {
    const toast = await this.toast.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  Guardar(producForm: NgForm) {
    // Verificar si todos los campos están vacíos
    if (!producForm.value.stock || !producForm.value.precio) {
      this.presentToast('Por favor, complete todos los campos');
      return;
    }
    // El resto del código para leer el archivo y enviar los datos al servidor permanece igual
    const archivo = this.archivoCargado;
    const reader = new FileReader();
    console.log(archivo);
    reader.readAsDataURL(archivo);
    reader.onload = () => {
      let archivoByte: any = reader.result;
      archivoByte = archivoByte.toString();
      producForm.value.foto = archivoByte;
      console.log(producForm.value);
      this.servicio.postuser(producForm.value).then(async (re: any) => {
        if (re.false) {
          this.presentToast('Error al guardar el Producto');
        } else {
          this.presentToast('Producto Creado con Éxito');
          await this.popover.dismiss({
            cont: 1
          });
        }
      }).catch((_e) => {
        this.presentToast('Error de conexión Fallido');
      });
    };
  }

}
