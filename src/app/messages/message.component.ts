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

  ngOnInit(): void {}
}
