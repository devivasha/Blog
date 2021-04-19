import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {PostsService} from '../../shared/post.service';
import {switchMap} from 'rxjs/operators';
import {Post} from '../../shared/interface';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit, OnDestroy {
   form: FormGroup;
   post: Post;
   submitted = false;
   uSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private aler: AlertService
  ) { }

  // tslint:disable-next-line:typedef
  ngOnInit(){
    this.route.params
      .pipe(switchMap((params: Params) => {
        return this.postsService.getById(params['id'])
        })
      ).subscribe((post: Post) => {
        this.post = post;
        this.form = new FormGroup({
          title: new FormControl(post.title, Validators.required),
          text: new FormControl(post.text, Validators.required)
        });
    });
  }
  // tslint:disable-next-line:typedef
  submit(){
    if (this.form.invalid){
     return;
    }
    this.submitted = true;
    this.uSub = this.postsService.update({
      ...this.post,
      text: this.form.value.text,
      title: this.form.value.title,
    }).subscribe(() => {
      this.submitted = false;
      this.aler.success('Пост был обновлен');
    });

  }
  // tslint:disable-next-line:typedef
  ngOnDestroy() {
    if (this.uSub){
      this.uSub.unsubscribe();
    }
  }
}
