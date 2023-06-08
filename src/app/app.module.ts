import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MatTabsModule} from '@angular/material/tabs';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EducalModule} from './educal/educal.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {AngularFireStorage, AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {RouterModule} from "@angular/router";
import {NgxPaginationModule} from "ngx-pagination";
import {MasonryPipePipe} from './masonry-pipe.pipe';
import {NgxMasonryModule} from "ngx-masonry";

@NgModule({
  declarations: [
    AppComponent,
    MasonryPipePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // EducalModule,
    BrowserAnimationsModule,
    MatTabsModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    CKEditorModule,
    NgxPaginationModule,
    NgxMasonryModule
  ],
  providers: [],
  exports: [
    MasonryPipePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
