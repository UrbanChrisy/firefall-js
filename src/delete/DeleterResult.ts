/**
 *
 * ▬▬ι═══════ﺤ            -═══════ι▬▬
 *    Created by Chris on 12/11/19.
 * ▬▬ι═══════ﺤ            -═══════ι▬▬
 *
 */
import { HasId } from "../HasId";
import Result from "../Result";
import { Nullable } from "../types/types";

export default class DeleterResult<T extends HasId> extends Result<void> {
    promise: Promise<void>;

    constructor(documentReference: Nullable<firebase.firestore.DocumentReference>) {
        super();

        if (documentReference) {
            this.promise = documentReference.delete();
        } else {
            this.promise = Promise.resolve();
        }
    }

    async now(): Promise<void> {
        return this.promise;
    }
}
