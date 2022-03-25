import Action from "https://raw.githubusercontent.com/Tom60chat/Cathedrale3D/main/Programmes/Action.js";

export default class GameLoop {
    //region Variables
    static #onUpdate = new Action();
    static #lastTick = new Date();
    static #deltaTime = new Date();
    //endregion

    //region Methods
    /**
     * @param {Function} action
     */
    static add(action) {
        GameLoop.#onUpdate.add(action);
    }

    static get deltaTime() {
        return GameLoop.#deltaTime / 1000.0;
    }

    static update() {
        GameLoop.#deltaTime = new Date() - GameLoop.#lastTick;

        requestAnimationFrame(GameLoop.update);
        GameLoop.#onUpdate.invoke();

        GameLoop.#lastTick = new Date();
    }
    //endregion
}
