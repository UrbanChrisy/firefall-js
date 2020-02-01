/**
 *
 * ▬▬ι═══════ﺤ            -═══════ι▬▬
 *    Created by Chris on 7/11/19.
 * ▬▬ι═══════ﺤ            -═══════ι▬▬
 *
 */

import { HasId } from "../HasId";
import CollectionLoader from "../CollectionLoader";
import SaveResult from "./SaveResult";

export default class Saver<T extends HasId> extends CollectionLoader {
    entity(entity: T): SaveResult<T> {
        return new SaveResult<T>({
            id: entity.id,
            collection: this.collection,
            entity: entity,
        });
    }
}
