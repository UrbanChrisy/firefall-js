/**
 *
 * ▬▬ι═══════ﺤ            -═══════ι▬▬
 *    Created by Chris on 11/01/20.
 * ▬▬ι═══════ﺤ            -═══════ι▬▬
 *
 */

import * as firebase from "firebase";
import Firefull from "../src/Firefull";
import {BasicEntity} from "./utils/BasicEntity";

describe("Set of basic tests to test core functionality", () => {

    const basicAPI = new Firefull<BasicEntity>({
        firestore: firebase.firestore(),
        collection: "Basic",
    });

    test("save entity", () => {
        const basic: BasicEntity = {
            id: null,
            testString: "testString",
        };

        const savedEntityPromise = basicAPI.save().entity(basic).now();

        return savedEntityPromise.then((savedEntity) => {
            expect(savedEntity).toBeTruthy();
        }).catch((err) => {
            console.log("ERRRRR", err)
        })
    })
});