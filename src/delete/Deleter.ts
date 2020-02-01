/**
 *
 * ▬▬ι═══════ﺤ            -═══════ι▬▬
 *    Created by Chris on 7/11/19.
 * ▬▬ι═══════ﺤ            -═══════ι▬▬
 *
 */
import { HasId } from "../HasId";
import CollectionLoader from "../CollectionLoader";
import DeleterResult from "./DeleterResult";
import { Nullable } from "../types/types";

export default class Deleter<T extends HasId> extends CollectionLoader {
    entity(entity: T): DeleterResult<T> {
        return this.id(entity.id);
    }

    id(id: Nullable<string>): DeleterResult<T> {
        if (!id) {
            return new DeleterResult<T>(null);
        }

        return new DeleterResult<T>(this.collection.doc(id));
    }
}
