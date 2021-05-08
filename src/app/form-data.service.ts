import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  private dbPath = '/feedPosts';

  feedPostsRef: AngularFireList<any> = null;

  constructor(private db: AngularFireDatabase) {
    this.feedPostsRef = db.list(this.dbPath);
   }

   createFeedPost(feedPost: any): any {
    this.feedPostsRef.push(feedPost);
  }

  updateFeedPost(key: string, value: any): Promise<any> {
    return this.feedPostsRef.update(key, value);
  }

  deleteFeedPost(key: string): Promise<any> {
    return this.feedPostsRef.remove(key);
  }

  getFeedPostList(): AngularFireList<any> {
    return this.feedPostsRef;
  }

  deleteAllPosts(): Promise<any> {
    return this.feedPostsRef.remove();
  }
}
