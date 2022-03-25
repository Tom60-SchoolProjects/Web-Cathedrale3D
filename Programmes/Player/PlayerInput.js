import Action from "https://raw.githubusercontent.com/Tom60chat/Cathedrale3D/main/Programmes/Action.js";
import GameLoop from "https://raw.githubusercontent.com/Tom60chat/Cathedrale3D/main/Programmes/GameLoop.js";
import * as THREE from 'three';

/**
 * Receive input from the player's input device.
 */
export default class PlayerInput {

    //region Constructors
    constructor(index) {
        this.#index = index;

        if (index === 0) {
            document.addEventListener('pointerlockchange', () => this.#mouseActive = document.pointerLockElement !== null, false);
            document.addEventListener('mousemove',
                (event) => this.#looking.set(event.movementX, event.movementY),
                false);

            window.addEventListener("keydown",
                (event) => this.#keys[event.key] = true,
                false);

            window.addEventListener('keyup',
                (event) => this.#keys[event.key] = false,
                false);
        }

        GameLoop.add(() => this.#update());
    }
    //endregion

    //region Variables
    OnMove = new Action()
    OnLook = new Action();
    OnJump = new Action();
    OnSprint = new Action();

    #mouseActive = false;
    #keys = [];
    #index = 0;
    #looking = new THREE.Vector2();
    //endregion

    //region Methods
    #update() {
        let gamepad = navigator.getGamepads()[this.#index];
        this.#updateMove(gamepad);
        this.#updateLook(gamepad);
        this.#updateJump(gamepad);
        this.#updateSprint(gamepad);
    }

    /**
     * @param {Gamepad} gamepad
     */
    #updateMove(gamepad)
    {
        let moveX = 0;
        let moveZ = 0;

        /// Keyboard
        if (this.#keys['z'] || this.#keys['ArrowUp']) // Up
            moveZ = 1;
        if (this.#keys['s'] || this.#keys['ArrowDown']) // Down
            moveZ = -1;
        if (this.#keys['q'] || this.#keys['ArrowLeft']) // Left
            moveX = -1;
        if (this.#keys['d'] || this.#keys['ArrowRight']) // Right
            moveX = 1;

        /// Gamepad
        if (gamepad instanceof Gamepad) {
            let padX = PlayerInput.#setDeadZone(gamepad.axes[0]);  // (LS)
            let padZ = PlayerInput.#setDeadZone(gamepad.axes[1]);  // (LS)

            if (padX !== 0)
                moveX = padX;
            if (padZ !== 0)
                moveZ = -padZ;
        }

        this.OnMove.invoke(new THREE.Vector2(moveX, moveZ));
    }

    /**
     * @param {Gamepad} gamepad
     */
    #updateLook(gamepad)
    {
        let lookX = 0;
        let lookY = 0;

        // Mouse
        if (this.#mouseActive)
        {
            lookX = this.#looking.x;
            lookY = this.#looking.y;
        }
        this.#looking.x = 0;
        this.#looking.y = 0;

        // Gamepad
        if (gamepad instanceof Gamepad) {
            let padX = PlayerInput.#setDeadZone(gamepad.axes[2]);  // (RS)
            let padY = PlayerInput.#setDeadZone(gamepad.axes[3]);  // (RS)

            if (padX !== 0)
                lookX = padX;
            if (padY !== 0)
                lookY = padY;
        }

        this.OnLook.invoke(new THREE.Vector2(lookX, lookY));
    }

    /**
     * @param {Gamepad} gamepad
     */
    #updateJump(gamepad)
    {
        let jump = false;

        if (this.#keys[' ']) // [Space]
            jump = true;
        if (gamepad instanceof Gamepad && gamepad.buttons[0].pressed) // (A)
            jump = true;

        this.OnJump.invoke(jump);
    }

    /**
     * @param {Gamepad} gamepad
     */
    #updateSprint(gamepad)
    {
        let sprint = false;

        if (this.#keys['Shift']) // [Shift]
            sprint = true;
        if (gamepad instanceof Gamepad && gamepad.buttons[10].pressed) // (LS)
            sprint = true;

        this.OnSprint.invoke(sprint);
    }

    // http://www.beej.us/blog/data/javascript-gamepad/
    /**
     * Set a value based on the dead zone
     * @param {number} v
     * @returns {number}
     */
    static #setDeadZone(v) {
        const DEAD_ZONE = 0.2;

        if (Math.abs(v) < DEAD_ZONE)
            v = 0;
        else {
            v = v - Math.sign(v) * DEAD_ZONE;
            v /= (1.0 - DEAD_ZONE);
        }

        return v;
    }
    //endregion
}
