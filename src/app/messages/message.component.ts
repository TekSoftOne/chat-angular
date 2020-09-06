import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  constructor() {}

  @Input() content: string;
  @Input() type = 'outcoming'; // incoming
  @Input() senderId: string;
  @Input() receiverId: string;
  @Input() me: string;
  @Input() at: any;
  @Input() showTime: boolean;

  ngOnInit(): void {}
}
