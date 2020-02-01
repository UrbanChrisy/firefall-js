/**
 *
 * ▬▬ι═══════ﺤ            -═══════ι▬▬
 *    Created by Chris on 8/11/19.
 * ▬▬ι═══════ﺤ            -═══════ι▬▬
 *
 */

import * as firebase from "firebase";
import cloneDeep from "lodash/cloneDeep";
import { HasId } from "../HasId";
import { Nullable } from "../types/types";
import Result from "../Result";

export interface SaveResultOptions<T> {
    id: Nullable<string>;
    collection: firebase.firestore.CollectionReference;
    entity: T;
}

export default class SaveResult<T extends HasId> extends Result<T> {
    id: Nullable<string>;

    entity: T;

    promise: Nullable<Promise<void>> = null;

    documentReferencePromise: Nullable<Promise<firebase.firestore.DocumentReference>> = null;

    constructor(options: SaveResultOptions<T>) {
        super();
        this.id = options.id;
        this.entity = options.entity;

        // We dont need to save Id on the document.
        const toSaveEntity = cloneDeep(this.entity);
        delete toSaveEntity.id;

        if (this.id) {
            this.promise = options.collection.doc(this.id).set(toSaveEntity);
        } else {
            this.documentReferencePromise = options.collection.add(toSaveEntity);
        }
    }

    async now(): Promise<T> {
        if (this.id) {
            await this.promise;
            return this.entity;
        }

        const documentReference = await this.documentReferencePromise;
        // @ts-ignore
        this.entity.id = documentReference.id;

        return this.entity;
    }
}
