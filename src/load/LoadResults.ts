/**
 *
 * ▬▬ι═══════ﺤ            -═══════ι▬▬
 *    Created by Chris on 7/11/19.
 * ▬▬ι═══════ﺤ            -═══════ι▬▬
 *
 */

import * as firebase from "firebase";
import { Nullable } from "../types/types";
import Result from "../Result";
import { HasId } from "../HasId";

interface LoadResultsOptions {
    query: firebase.firestore.Query;
    getOptions?: firebase.firestore.GetOptions;
    snapshotOptions?: firebase.firestore.SnapshotOptions;
}

export default class LoadResults<T extends HasId> extends Result<T[]> {
    querySnapshotPromise: Nullable<Promise<firebase.firestore.QuerySnapshot>> = null;

    snapshotOptions: firebase.firestore.SnapshotOptions | undefined;

    constructor(options: LoadResultsOptions) {
        super();
        const { query } = options;
        this.querySnapshotPromise = query.get(options.getOptions);
        this.snapshotOptions = options.snapshotOptions;
    }

    async now(): Promise<T[]> {
        const { querySnapshotPromise } = this;
        if (!querySnapshotPromise) {
            return [];
        }

        const querySnapshot = await querySnapshotPromise;
        const { docs } = querySnapshot;

        return docs.map((documentSnapshot: firebase.firestore.QueryDocumentSnapshot) => {
            const data = documentSnapshot.data(this.snapshotOptions) as T;
            data.id = documentSnapshot.id;
            return data;
        });
    }
}
