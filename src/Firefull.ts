/**
 *
 * ▬▬ι═══════ﺤ            -═══════ι▬▬
 *    Created by Chris on 7/11/19.
 * ▬▬ι═══════ﺤ            -═══════ι▬▬
 *
 */

import * as firebase from "firebase";
import Deleter from "./delete/Deleter";
import { HasId } from "./HasId";
import Loader from "./load/Loader";
import Saver from "./save/Saver";

export interface FirefullConfig {
    firestore: firebase.firestore.Firestore;
    collection: string;
}

export default class Firefull<T extends HasId> {

    private readonly loader: Loader<T>;

    private readonly saver: Saver<T>;

    private readonly deleter: Deleter<T>;

    constructor(config: FirefullConfig) {
        const { firestore } = config;
        const collection = firestore.collection(config.collection);

        this.loader = new Loader<T>(firestore, collection);
        this.saver = new Saver<T>(firestore, collection);
        this.deleter = new Deleter<T>(firestore, collection);

    }

    load(): Loader<T> {
        return this.loader;
    }

    save(): Saver<T> {
        return this.saver;
    }

    delete(): Deleter<T> {
        return this.deleter;
    }
}
