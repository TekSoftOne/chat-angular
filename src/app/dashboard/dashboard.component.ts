import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, Subscriber, of, throwError, Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Message } from './interface';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public messages: Observable<any>;
  public message = '';

  private readonly COLLECTION_NAME = 'messages';
  private sendMessageSubscription: Subscription;
  private loadMessageSubscription: Subscription;

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

  ngOnDestroy(): void {
    if (this.sendMessageSubscription) {
      this.sendMessageSubscription.unsubscribe();
    }

    if (this.loadMessageSubscription) {
      this.loadMessageSubscription.unsubscribe();
    }
  }

  public sendMessage(): Observable<boolean> {
    if (this.message.length > 0) {
      this.sendMessageSubscription = this.saveMessage()
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
        .doc('2')
        .collection('1')
        .add({
          content: this.message,
          at: moment,
          attachment: '',
          read: false,
        } as Message)
        .then(() => {
          subscriber.next();
          subscriber.complete();
        })
        .catch((err) => subscriber.error(err));
    });
  }
}
