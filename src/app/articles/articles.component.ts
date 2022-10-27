import { ArticleService } from './../core/services/article.service';
import { Article } from './../shared/models/article';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  allArticles!: Article[];

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles(): void {
    this.articleService.getAllArticles().subscribe((articles) => {
      this.allArticles = articles;
    });
  }
}
