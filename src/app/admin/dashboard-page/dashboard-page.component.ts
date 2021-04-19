import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../../shared/post.service';
import {Post} from '../../shared/interface';
import {Subscription} from 'rxjs';
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post [] = [];
  pSub: Subscription;
  dSub: Subscription;
  searchStr = '';
  constructor(private  postsService: PostsService,
              private alert: AlertService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.pSub = this.postsService.getAll().subscribe(posts => {
    this.posts = posts;
    });
  }
  // tslint:disable-next-line:typedef
  remove(id: string) {
    this.dSub = this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
      this.alert.danger('Пост был удален');
    });

}
  // tslint:disable-next-line:typedef
  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
    if (this.dSub) {
      this.dSub.unsubscribe();
    }
  }

}
