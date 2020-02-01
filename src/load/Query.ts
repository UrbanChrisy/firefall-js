/**
 *
 * ▬▬ι═══════ﺤ            -═══════ι▬▬
 *    Created by Chris on 8/11/19.
 * ▬▬ι═══════ﺤ            -═══════ι▬▬
 *
 */

import * as firebase from "firebase";
import { HasId } from "../HasId";
import LoadResults from "./LoadResults";

export default class Query<T extends HasId> {
    query: firebase.firestore.Query;

    constructor(query: firebase.firestore.Query) {
        this.query = query;
    }

    list(options?: firebase.firestore.GetOptions): LoadResults<T> {
        return new LoadResults<T>({
            query: this.query,
            getOptions: options,
        });
    }

    filter(
        fieldPath: string | firebase.firestore.FieldPath,
        opStr: firebase.firestore.WhereFilterOp,
        value: any,
    ): Query<T> {
        const query = this.query.where(fieldPath, opStr, value);
        return new Query<T>(query);
    }
}
