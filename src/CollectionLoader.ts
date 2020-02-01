/**
 *
 * ▬▬ι═══════ﺤ            -═══════ι▬▬
 *    Created by Chris on 7/11/19.
 * ▬▬ι═══════ﺤ            -═══════ι▬▬
 *
 */

import * as firebase from "firebase";

export default class CollectionLoader {
    readonly firestore: firebase.firestore.Firestore;

    readonly collection: firebase.firestore.CollectionReference;

    constructor(
        firestore: firebase.firestore.Firestore,
        collection: firebase.firestore.CollectionReference,
    ) {
        this.firestore = firestore;
        this.collection = collection;
    }
}
