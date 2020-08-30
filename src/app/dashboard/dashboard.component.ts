import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, Subscriber, of, throwError } from 'rxjs';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public messages: Observable<any>;
  public message = '';
  private readonly COLLECTION_NAME = 'messages';
  constructor(private db: AngularFirestore, private httpClient: HttpClient) {}

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

  public sendMessage(): Observable<boolean> {
    if (this.message.length > 0) {
      this.saveMessage()
        .pipe(
          catchError((error) => {
            console.log('send error');
            return throwError(error);
          }),
          tap(() => (this.message = '')),
          tap(() => console.log('send success!'))
        )
        .subscribe();
    }

    return of(false);
  }

  private saveMessage(): Observable<void> {
    const moment = new Date();
    return new Observable<void>((subscriber) => {
      this.db
        .collection(this.COLLECTION_NAME)
        .doc('1')
        .collection(moment.getFullYear().toString())
        .doc((moment.getMonth() + 1).toString())
        .collection(moment.getDate().toString())
        .add({
          content: this.message,
          dateTime: moment,
          senderId: '1',
          read: false,
        })
        .then(() => {
          subscriber.next();
          subscriber.complete();
        })
        .catch((err) => subscriber.error(err));
    });
  }
}
