/**
 *
 * ▬▬ι═══════ﺤ            -═══════ι▬▬
 *    Created by Chris on 7/11/19.
 * ▬▬ι═══════ﺤ            -═══════ι▬▬
 *
 */

import * as firebase from "firebase";
import { HasId } from "../HasId";
import { Nullable } from "../types/types";
import Result from "../Result";

export interface LoadResultOptions {
    documentReference?: firebase.firestore.DocumentReference;
    query?: firebase.firestore.Query;
    options?: firebase.firestore.GetOptions;
}

export default class LoadResult<T extends HasId> extends Result<T> {
    documentSnapshotPromise: Nullable<Promise<firebase.firestore.DocumentSnapshot>> = null;

    querySnapshotPromise: Nullable<Promise<firebase.firestore.QuerySnapshot>> = null;

    constructor(loadResultOptions: LoadResultOptions) {
        super();
        const { documentReference, query, options } = loadResultOptions;

        if (documentReference) {
            this.documentSnapshotPromise = documentReference.get(options);
        } else if (query) {
            this.querySnapshotPromise = query.limit(1).get(options);
        }
    }

    async now(): Promise<T> {
        if (this.querySnapshotPromise) {
            const querySnapshot = await this.querySnapshotPromise;
            const { docs } = querySnapshot;
            const firstDoc = docs[0];
            const data = firstDoc.data() as T;
            if (!data) {
                throw new Error("Entity not found");
            }
            data.id = firstDoc.id;
            return data;
        }

        const documentSnapshot = await this.documentSnapshotPromise;
        if (!documentSnapshot) {
            throw new Error("Invalid load promise");
        }

        const data = documentSnapshot.data() as T;
        if (!data) {
            throw new Error("Entity not found");
        }
        data.id = documentSnapshot.id;

        return data;
    }
}
