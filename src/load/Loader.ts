/**
 *
 * ▬▬ι═══════ﺤ            -═══════ι▬▬
 *    Created by Chris on 7/11/19.
 * ▬▬ι═══════ﺤ            -═══════ι▬▬
 *
 */

import * as firebase from "firebase";
import CollectionLoader from "../CollectionLoader";
import { HasId } from "../HasId";
import LoadResult from "./LoadResult";
import LoadResults from "./LoadResults";
import Query from "./Query";

export default class Loader<T extends HasId> extends CollectionLoader {
    id(id: string, options?: firebase.firestore.GetOptions): LoadResult<T> {
        return new LoadResult<T>({
            documentReference: this.collection.doc(id),
            options: options,
        });
    }

    query(): Query<T> {
        return new Query<T>(this.collection);
    }

    list(): LoadResults<T> {
        return this.query().list();
    }
}
