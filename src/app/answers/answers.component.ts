import {Component, OnInit} from '@angular/core';

import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {AnswersService} from '../answers.service';
import {ProfileService} from '../profile/profile.service';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit {
  post: any;

  constructor(private route: ActivatedRoute, private location: Location, private answersService: AnswersService, private profileService: ProfileService) {
  }

  ngOnInit() {
    this.getAnswer();
  }

  getAnswer() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.answersService.getPost(id)
      .subscribe(post => this.post = post);
  };
}
