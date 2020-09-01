import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import {
  Observable,
  Subscriber,
  of,
  throwError,
  Subscription,
  combineLatest,
  forkJoin,
} from 'rxjs';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, map, merge } from 'rxjs/operators';
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
  public me = '1';
  public currentUser = '2';
  constructor(private db: AngularFirestore, private httpClient: HttpClient) {}

  ngOnInit(): void {
    const incommingMessages = this.db
      .collection(this.COLLECTION_NAME)
      .doc(this.me)
      .collection(this.currentUser)
      .valueChanges();

    const outgoingMessages = this.db
      .collection(this.COLLECTION_NAME)
      .doc(this.currentUser)
      .collection(this.me)
      .valueChanges();

    this.messages = combineLatest([incommingMessages, outgoingMessages]).pipe(
      map(([i, o]) => [...i, ...o])
    );
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
          senderId: this.me,
          content: this.message,
          at: moment,
          attachment: '',
          read: false,
          receiverId: this.currentUser,
        } as Message)
        .then(() => {
          subscriber.next();
          subscriber.complete();
        })
        .catch((err) => subscriber.error(err));
    });
  }
}
