import { ArticleEditComponent } from './article-edit/article-edit.component';
import { NewArticleComponent } from './new-article/new-article.component';
import { ArticlesComponent } from './articles/articles.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'articles',
    component: ArticlesComponent,
  },
  {
    path: 'new-article',
    component: NewArticleComponent,
  },
  {
    path: 'edit-article/:id',
    component: ArticleEditComponent,
  },
  {
    path: '',
    redirectTo: 'articles',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
