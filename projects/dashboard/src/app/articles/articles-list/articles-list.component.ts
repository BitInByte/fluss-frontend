import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from '../../shared/dialog/dialog.service';
// import { LoadingService } from '../../shared/loading/loading.service';
import { ArticlesStore } from '../articles.store';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss'],
  providers: [DialogService],
})
export class ArticlesListComponent implements OnInit {
  constructor(
    public articlesStore: ArticlesStore,
    // public loadingService: LoadingService,
    private dialog: DialogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.articlesStore.getAllArticles();
  }

  onEdit(id: string): void {
    console.log(id);
    this.router.navigate(['articles', 'edit', id]);
  }

  onDelete(id: string): void {
    console.log(id);
    this.dialog.showDialog(null).subscribe((confirm) => {
      if (confirm) {
        this.articlesStore.deleteArticle(id);
      }
    });
  }
}
