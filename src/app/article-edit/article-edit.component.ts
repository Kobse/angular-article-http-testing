import { Article } from './../shared/models/article';
import { ArticleService } from './../core/services/article.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss'],
})
export class ArticleEditComponent implements OnInit {
  article!: Article;
  articles: Article[] = [];
  editArticleForm!: FormGroup;
  errorMessage!: string;

  private subscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editArticleForm = this.fb.group({
      title: ['', Validators.required],
      paragraph: ['', Validators.required],
    });

    this.subscription = this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.getArticle(id);
    });
  }

  populateArticle(article: Article): void {
    this.article = article;

    this.editArticleForm.patchValue({
      title: this.article.title,
      paragraph: this.article.paragraph,
    });
  }

  getArticle(id: any): void {
    this.articleService.getArticle(id).subscribe({
      next: (article: Article) => this.populateArticle(article),
    });
  }

  onSaveArticle(): void {
    const articleCopy = { ...this.article, ...this.editArticleForm.value };

    if (this.article) {
      this.articleService.updateArticle(articleCopy).subscribe({
        next: () => this.onSaveComplete(),
      });
    }
  }

  onDeleteArticle(): void {
    if (confirm(`Really delete the article: ${this.article?.title}?`)) {
      this.articleService.deleteArticle(this.article?.id).subscribe({
        next: () => this.onSaveComplete(),
        error: (error) => (this.errorMessage = error),
      });
    }
  }

  onSaveComplete(): void {
    this.editArticleForm.reset();
    this.router.navigate(['/articles']);
  }
}
