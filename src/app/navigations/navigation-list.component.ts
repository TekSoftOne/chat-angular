import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-navigation-list',
  templateUrl: './navigation-list.component.html',
  styleUrls: ['./navigation-list.component.scss'],
})
export class NavigationListComponent implements OnInit {
  @Output() navClose = new EventEmitter<void>();
  constructor(private authentication: AuthenticationService) {}

  ngOnInit(): void {}

  public onClose(): void {
    this.navClose.emit();
  }

  public logout(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.authentication.logout();
  }

  public isIn(): boolean {
    return this.authentication.isTokenValid();
  }
}
