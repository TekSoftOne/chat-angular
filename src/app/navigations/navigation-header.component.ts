import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navigation-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./navigation-header.component.scss'],
})
export class NavigationHeaderComponent implements OnInit {
  constructor() {}

  @Output() sideNavToggle = new EventEmitter<void>();

  ngOnInit(): void {}

  public onToggle(): void {
    this.sideNavToggle.emit();
  }
}
