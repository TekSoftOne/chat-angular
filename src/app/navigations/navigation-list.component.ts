import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navigation-list',
  templateUrl: './navigation-list.component.html',
  styleUrls: ['./navigation-list.component.scss'],
})
export class NavigationListComponent implements OnInit {
  @Output() navClose = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {}

  public onClose(): void {
    this.navClose.emit();
  }
}
