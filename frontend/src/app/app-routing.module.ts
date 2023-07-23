import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { MainComponent } from './main/main.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { DocsComponent } from './docs/docs.component';

const routes: Routes = [
  {
    component: AboutComponent,
    path: 'about',
  },
  {
    component: MainComponent,
    path: 'main',
  },
  {
    component: FeedbackComponent,
    path: 'feedback',
  },
  {
    component: DocsComponent,
    path: 'docs',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
