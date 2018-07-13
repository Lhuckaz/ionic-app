import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';
import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MovieProvider,
    Camera
  ]
})
export class FeedPage {

  public objeto_feed = {
    titulo: "Charles Franca",
    data: "November 5, 1955",
    descricao: "Estou criando um app incrivel...",
    qntd_likes: 13,
    qntd_comments: 4,
    time_comment: "11h ago teste"
  }
  public lista_filmes = new Array<any>();
  public loader;
  public refresher;
  public infiniteScroll;
  public isRefreshing: boolean = false;
  public page = 1;
  public img;

  constructor(public navCtrl: NavController, public navParams: NavParams, private movieProvider: MovieProvider, public loadingCtrl: LoadingController, private camera: Camera) {
  }

  ionViewDidEnter() {
    this.carregaFiles();
  }

  carregaFiles(newpage: boolean = false) {
    this.presentLoading();
    this.movieProvider.getPopularMovie(this.page)
      .subscribe(data => {
        const response = (data as any);
        if (newpage) {
          this.lista_filmes = this.lista_filmes.concat(response.results);
          this.infiniteScroll.complete();
        } else {
          this.lista_filmes = response.results;
        }
        this.closeLoading();
        if (this.isRefreshing) {
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }, error => {
        console.log(error);
        this.closeLoading();
        if (this.isRefreshing) {
          this.refresher.complete();
          this.isRefreshing = false;
        }
      });
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();
  }

  closeLoading() {
    this.loader.dismiss();
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;
    this.carregaFiles();
  }

  abrirDetalhes(filme) {
    this.navCtrl.push(FilmeDetalhesPage, { id: filme.id });
  }

  doInfinite(infiniteScroll) {
    // console.log('Begin async operation');

    // setTimeout(() => {
    //   for (let i = 0; i < 30; i++) {
    //     this.items.push(this.items.length);
    //   }

    //   console.log('Async operation has ended');
    //   infiniteScroll.complete();
    // }, 500);
    this.page++;
    this.infiniteScroll = infiniteScroll;
    this.carregaFiles(true);
  }

  tirarFoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.img = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
      console.log(err);
    });
  }

}
