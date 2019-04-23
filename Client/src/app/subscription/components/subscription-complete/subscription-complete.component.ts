import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subscription-complete',
  templateUrl: './subscription-complete.component.html',
  styleUrls: ['./subscription-complete.component.scss'],
})
export class SubscriptionCompleteComponent implements OnInit {
  subscriptionId: string;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.subscriptionId = this.activatedRoute.snapshot.params['subscriptionId'];
  }
}
