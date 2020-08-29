import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public messages: Observable<any>;
  constructor(private db: AngularFirestore) {}

  ngOnInit(): void {
    this.messages = this.db
      .collection('messages')
      .doc('1')
      .collection('2020')
      .doc('08')
      .collection('29')
      .valueChanges()
      .pipe
      // map((querySnapshot) => {
      // tslint:disable-next-line: max-line-length
      // return querySnapshot.map((message: DocumentData, index: number) => {
      //   return message;
      // });
      // })
      ();
  }
}
