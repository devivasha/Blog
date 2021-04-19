import { Component, OnInit } from '@angular/core';
import {PostsService} from '../shared/post.service';
import {Observable} from 'rxjs';
import {Post} from '../shared/interface';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  posts$: Observable<Post[]>;
  constructor(private postsService: PostsService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.posts$ = this.postsService.getAll();
  }

}
