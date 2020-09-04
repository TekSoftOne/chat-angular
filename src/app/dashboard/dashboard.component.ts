import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import {
  Observable,
  Subscriber,
  of,
  throwError,
  Subscription,
  combineLatest,
  forkJoin,
  BehaviorSubject,
} from 'rxjs';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, map, merge, switchMap } from 'rxjs/operators';
import { Message, User } from './interface';
import * as $ from 'jquery';
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarComponent,
} from 'ngx-perfect-scrollbar';

// declare const $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild('chatPanel') chatPanel: ElementRef;
  @ViewChild(PerfectScrollbarComponent, { static: false })
  componentRef: PerfectScrollbarComponent;
  public messages: Observable<any>;
  public message = '';
  public config: PerfectScrollbarConfigInterface = {};

  private readonly COLLECTION_MESSAGE = 'messages';
  private readonly CLIENT_ID = '9245fe4a-d402-451c-b9ed-9c1a04247482';
  private sendMessageSubscription: Subscription;
  private loadMessageSubscription: Subscription;
  public me = '1';
  public currentUser = '2';
  public agentGUID = '6245fe4a-d402-451c-b9ed-9c1a04247482';
  public selectedUser$: BehaviorSubject<string | undefined>;
  private selectedUserId: '';
  public userList$: Observable<User[]>;

  constructor(private db: AngularFirestore) {}

  ngOnInit(): void {
    this.selectedUser$ = new BehaviorSubject<string | undefined>(undefined);

    const activeUsers = this.getActiveUsers();
    const activeUser = combineLatest([activeUsers, this.selectedUser$]).pipe(
      map(([users, selected]) => {
        if (!selected) {
          return undefined;
        }

        return users.find((x) => (x.guid = selected));
      }),
      tap((user) => {
        if (user) {
          this.selectedUserId = user.guid;
        }
      })
    );

    this.userList$ = activeUsers.pipe(
      map((users) =>
        users.map((u) => ({
          guid: u.guid,
          name: 'user',
          image: 'https://via.placeholder.com/150',
        }))
      )
    );

    this.messages = activeUser.pipe(
      switchMap((user) => {
        if (!user) {
          return [];
        }

        const incommingMessages = this.db
          .collection('clients')
          .doc(this.COLLECTION_MESSAGE)
          .collection(this.CLIENT_ID)
          .doc(this.agentGUID)
          .collection(user.guid)
          .valueChanges();

        const outgoingMessages = this.db
          .collection('clients')
          .doc(this.COLLECTION_MESSAGE)
          .collection(this.CLIENT_ID)
          .doc(user.guid)
          .collection(this.agentGUID)
          .valueChanges();

        return combineLatest([incommingMessages, outgoingMessages]).pipe(
          map(([i, o]) => {
            const messages = [...i, ...o] as Message[];
            return messages.sort((m1, m2) => {
              if (m1.at > m2.at) {
                return 1;
              } else if (m1.at < m2.at) {
                return -1;
              }
              return 0;
            });
          }),
          tap(() => {
            setTimeout(() => {
              this.scrollToBottom();
            }, 1);
          })
        );
      })
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

  private getActiveUsers(): Observable<any[]> {
    return this.db
      .collection('clients')
      .doc('activeUsers')
      .collection(this.CLIENT_ID)
      .valueChanges();
  }

  private saveMessage(): Observable<void> {
    const moment = new Date();
    return new Observable<void>((subscriber) => {
      this.db
        .collection('clients')
        .doc(this.COLLECTION_MESSAGE)
        .collection(this.CLIENT_ID)
        .doc(this.agentGUID)
        .collection(this.selectedUserId)
        .add({
          senderId: this.agentGUID,
          content: this.message,
          at: moment,
          attachment: '',
          read: false,
          receiverId: this.selectedUserId,
        } as Message)
        .then(() => {
          subscriber.next();
          subscriber.complete();
        })
        .catch((err) => subscriber.error(err));
    });
  }

  public scrollToBottom(): void {
    if (this.componentRef && this.componentRef.directiveRef) {
      this.componentRef.directiveRef.scrollToBottom();
    }
  }
}
