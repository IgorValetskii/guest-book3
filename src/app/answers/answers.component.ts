import {Component, OnInit} from '@angular/core';

import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {AnswersService} from './answers.service';
import {ProfileService} from '../profile/profile.service';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit {
  post: any;
  receivedData: any;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private answersService: AnswersService,
    private profileService: ProfileService,
    private httpService: HttpService
  ) {
  }

  ngOnInit() {
    this.getAnswer();
  }

  getAnswer() {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.httpService.getAnswers(id)
      .subscribe(
        (data: any) => {
          this.receivedData = data.data;
          console.log(this.receivedData);

        },
        error => console.log(error)
      );
    // this.answersService.getPost(id)
    //   .subscribe(post => this.post = post);
  };
}
