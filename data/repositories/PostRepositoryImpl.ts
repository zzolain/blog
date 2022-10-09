import { PostRepository } from "../../domain/post/repositories/PostRepository";
import { firestore } from "../firebaseAdapter";
import { Post } from "../../domain/post/entities/post";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "@firebase/firestore";

const COLLECTION_NAME = "posts";

export class PostFirebaseRepositoryImpl implements PostRepository {
  async get(id: string): Promise<Post> {
    const snapshot = await getDoc(doc(firestore, COLLECTION_NAME, id));
    const document = snapshot.data();
    if (!document) throw new Error("게시물이 존재하지 않습니다.");
    return new Post(
      snapshot.id,
      document.title,
      document.createdAt.toDate().toString(),
      document.description,
      document.body,
      document.tags
    );
  }

  lastDocument: DocumentData | null = null;
  private setLastDoc(doc: DocumentData) {
    this.lastDocument = doc;
  }
  async getList(): Promise<Post[]> {
    const SIZE = 25;
    const docQuery = (() => {
      if (!this.lastDocument) {
        return query(
          collection(firestore, COLLECTION_NAME),
          orderBy("createdAt", "desc"),
          limit(SIZE)
        );
      } else {
        return query(
          collection(firestore, COLLECTION_NAME),
          orderBy("createdAt", "desc"),
          startAfter(this.lastDocument),
          limit(SIZE)
        );
      }
    })();
    const snapshots = await getDocs(docQuery);
    this.setLastDoc(snapshots.docs[snapshots.docs.length - 1]);
    return snapshots.docs.map((doc) => {
      const document = doc.data();
      return new Post(
        doc.id,
        document.title,
        document.createdAt.toDate(),
        document.description,
        document.body,
        document.tags
      );
    });
  }
}
