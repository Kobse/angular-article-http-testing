import { Router } from '@angular/router';
import { ArticleService } from './../core/services/article.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss'],
})
export class NewArticleComponent implements OnInit {
  articleForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      paragraph: ['', Validators.required],
    });
  }

  onPostArticle() {
    console.log(this.articleForm.value);
    this.articleService
      .postArticle(this.articleForm.value)
      .subscribe((responseData) => {
        console.log(responseData);
        this.onSaveComplete();
      });
  }

  onSaveComplete(): void {
    this.articleForm.reset();
    this.router.navigate(['/articles']);
  }
}
