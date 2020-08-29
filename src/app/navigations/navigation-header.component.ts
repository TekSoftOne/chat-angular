import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-navigation-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./navigation-header.component.scss'],
})
export class NavigationHeaderComponent implements OnInit {
  constructor(private authentication: AuthenticationService) {}

  @Output() sideNavToggle = new EventEmitter<void>();

  ngOnInit(): void {}

  public onToggle(): void {
    this.sideNavToggle.emit();
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
