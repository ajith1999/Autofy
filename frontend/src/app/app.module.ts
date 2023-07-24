import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { DocsComponent } from './docs/docs.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { AboutComponent } from './about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatatypeDialogComponent } from './datatype-dialog/datatype-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    DocsComponent,
    FeedbackComponent,
    AboutComponent,
    DatatypeDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
