import { QuestionsGetAll } from '../../store/family-fortunes/family-fortunes.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { Navigate } from '@ngxs/router-plugin';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'app-question-page',
    templateUrl: './question-page.component.html',
    styleUrls: ['./question-page.component.scss']
})
export class QuestionPageComponent implements OnInit {
    questions: any[];
    question: any;
    revealAll: boolean;
    questionNum: number;
    reveals: boolean[];
    answersArray = [4, 3, 2, 1, 0];
    seconds = 60;
    interval: any;

    constructor(
        private route: ActivatedRoute,
        private store: Store
    ) { }

    ngOnInit() {
        this.reveals = [false, false, false, false, false];
        this.revealAll = false;

        this.store.dispatch(new QuestionsGetAll());

        this.store.select((state) => state.familyFortunes.questions)
            .subscribe(questions => {
                if (!questions) return;

                this.questions = questions;

                this.route.paramMap.subscribe(params => {
                    if (!params) return;

                    const questionNum = params.get('number');

                    if (!questionNum) return;

                    this.questionNum = parseInt(questionNum);

                    this.question = questions[this.questionNum];
                });
            });
    }

    startTimer() {
        this.interval = setInterval(() => {
            this.seconds--;
            if (this.seconds === 0) {
                clearInterval(this.interval);
            }
        }, 1000);
    }

    revealAnswers() {
        this.revealAll = !this.revealAll;

        this.reveals = [this.revealAll, this.revealAll, this.revealAll, this.revealAll, this.revealAll];
    }

    reveal(idx) {
        this.reveals[idx] = !this.reveals[idx];

        this.revealAll = this.reveals.indexOf(true) > -1;
    }

    next() {
        this.resetAll();
        this.questionNum++;
        this.store.dispatch(new Navigate(['family-fortunes', 'question', this.questionNum]));
    }

    back() {
        this.resetAll();
        this.questionNum--;
        this.store.dispatch(new Navigate(['family-fortunes', 'question', this.questionNum]));
    }

    resetAll() {
        clearInterval(this.interval);
        this.seconds = 60;
        this.reveals = [false, false, false, false, false];
        this.revealAll = false;
    }
}
