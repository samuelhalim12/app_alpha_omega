import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ProductService } from './product.service';
import { Routes, RouterModule } from '@angular/router';
import { MovieService } from './movie.service';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Camera } from '@ionic-native/camera/ngx';
import { RegisterComponent } from './register/register.component';
import { RegisterService } from './register.service';
import { EmailService } from './email.service';
import { RefreshComponent } from './refresh/refresh.component';
import { ProfileComponent } from './profile/profile.component';
import { MasterbarangComponent } from './masterbarang/masterbarang.component';
import { MasterpenjualComponent } from './masterpenjual/masterpenjual.component';
import { MastersupplierComponent } from './mastersupplier/mastersupplier.component';
import { AlphaomegaService } from './alphaomega.service';
import { IonicGestureConfig } from './utils/IonicGestureConfig';
import { LongPressModule } from 'ionic-long-press';
import { UpdatemasterbarangComponent } from './updatemasterbarang/updatemasterbarang.component';
import { DetailmasterbarangComponent } from './detailmasterbarang/detailmasterbarang.component';
import { UpdatemasterpenjualComponent } from './updatemasterpenjual/updatemasterpenjual.component';
import { DetailmasterpenjualComponent } from './detailmasterpenjual/detailmasterpenjual.component';
import { UpdatemastersupplierComponent } from './updatemastersupplier/updatemastersupplier.component';
import { OrderComponent } from './order/order.component';
import { InsertnewbarangComponent } from './insertnewbarang/insertnewbarang.component';
import { InsertnewpenjualComponent } from './insertnewpenjual/insertnewpenjual.component';
import { InsertnewsupplierComponent } from './insertnewsupplier/insertnewsupplier.component';
import { DetailordertempComponent } from './detailordertemp/detailordertemp.component';
import { InsertnewordertempComponent } from './insertnewordertemp/insertnewordertemp.component';
import { ModaltemporderitemComponent } from './modaltemporderitem/modaltemporderitem.component';
import { ModalbasketComponent } from './modalbasket/modalbasket.component';
import { CheckoutdraftorderComponent } from './checkoutdraftorder/checkoutdraftorder.component';
import { HistoryComponent } from './history/history.component';
import { ReportComponent } from './report/report.component';
import { HistorybeliComponent } from './historybeli/historybeli.component';
import { HistoryjualComponent } from './historyjual/historyjual.component';
import { DetailhistoryjualComponent } from './detailhistoryjual/detailhistoryjual.component';
import { DetailhistorybeliComponent } from './detailhistorybeli/detailhistorybeli.component';
import { ModalfilterhistorybeliComponent } from './modalfilterhistorybeli/modalfilterhistorybeli.component';
import { ModalfilterhistoryjualComponent } from './modalfilterhistoryjual/modalfilterhistoryjual.component';
import { ModalfilterreportComponent } from './modalfilterreport/modalfilterreport.component';
import { InsertbuyComponent } from './insertbuy/insertbuy.component';
import { CheckoutbuyComponent } from './checkoutbuy/checkoutbuy.component';
import { ModalbasketbuyComponent } from './modalbasketbuy/modalbasketbuy.component';
import { ModaladdamountbuyComponent } from './modaladdamountbuy/modaladdamountbuy.component';
import { DetailreportComponent } from './detailreport/detailreport.component';
import { ModalfilterdetailreportComponent } from './modalfilterdetailreport/modalfilterdetailreport.component';


const appRoutes: Routes = [
  { path: 'login', component: AppComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'refresh', component: RefreshComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'masterbarang', component: MasterbarangComponent },
  { path: 'masterpenjual', component: MasterpenjualComponent },
  { path: 'mastersupplier', component: MastersupplierComponent },
  { path: 'updatemasterbarang/:barang_kode', component: UpdatemasterbarangComponent },
  { path: 'detailmasterbarang/:barang_kode', component: DetailmasterbarangComponent },
  { path: 'updatemasterpenjual/:penjual_id', component: UpdatemasterpenjualComponent },
  { path: 'detailmasterpenjual/:penjual_id', component: DetailmasterpenjualComponent },
  { path: 'updatemastersupplier/:supplier_id', component: UpdatemastersupplierComponent },
  { path: 'order', component: OrderComponent },
  { path: 'insertnewbarang', component: InsertnewbarangComponent },
  { path: 'insertnewpenjual', component: InsertnewpenjualComponent },
  { path: 'insertnewsupplier', component: InsertnewsupplierComponent },
  { path: 'detailordertemp/:hjual_temp_id', component: DetailordertempComponent },
  { path: 'insertnewordertemp', component: InsertnewordertempComponent },
  { path: 'checkoutdraftorder', component: CheckoutdraftorderComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'report', component: ReportComponent },
  { path: 'historybeli', component: HistorybeliComponent },
  { path: 'historyjual', component: HistoryjualComponent },
  { path: 'detailhistoryjual/:hjual_id', component: DetailhistoryjualComponent },
  { path: 'detailhistorybeli/:hbeli_id', component: DetailhistorybeliComponent },
  { path: 'insertbuy', component: InsertbuyComponent },
  { path: 'checkoutbuy', component: CheckoutbuyComponent },
  { path: 'detailreport/:bulan_tahun', component: DetailreportComponent },
];


@NgModule({
  declarations: [AppComponent, RegisterComponent, RefreshComponent, ProfileComponent,
  MasterbarangComponent,MasterpenjualComponent,MastersupplierComponent,UpdatemasterbarangComponent,DetailmasterbarangComponent,
  UpdatemasterpenjualComponent, DetailmasterpenjualComponent,UpdatemastersupplierComponent,OrderComponent,InsertnewbarangComponent,
InsertnewpenjualComponent,InsertnewsupplierComponent,DetailordertempComponent,InsertnewordertempComponent,
ModaltemporderitemComponent,ModalbasketComponent,CheckoutdraftorderComponent,HistoryComponent,ReportComponent,HistorybeliComponent,
HistoryjualComponent,DetailhistoryjualComponent,DetailhistorybeliComponent,ModalfilterhistorybeliComponent,ModalfilterhistoryjualComponent,
ModalfilterreportComponent,InsertbuyComponent,CheckoutbuyComponent,ModalbasketbuyComponent,ModaladdamountbuyComponent,DetailreportComponent,ModalfilterdetailreportComponent
],
  entryComponents: [ModaltemporderitemComponent,ModalbasketComponent,CheckoutdraftorderComponent,ModalfilterhistorybeliComponent,
  ModalfilterhistoryjualComponent,ModalfilterreportComponent,ModalbasketbuyComponent,ModaladdamountbuyComponent,ModalfilterdetailreportComponent],
  imports: [IonicStorageModule.forRoot(), HttpClientModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule,RouterModule.forRoot(appRoutes), LongPressModule],
  providers: [Camera, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, ProductService, MovieService, RegisterService,AlphaomegaService,
    EmailService, IonicGestureConfig, Location],
  bootstrap: [AppComponent],
})
export class AppModule {}
