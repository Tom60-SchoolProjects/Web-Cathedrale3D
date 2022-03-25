import * as THREE from 'three';
import {CharacterMovementStyles} from "https://raw.githubusercontent.com/Tom60chat/Cathedrale3D/main/Programmes/Packages/PMG/Controller/CharacterMovementStyle.js";

/**
 * Transform input into movement
 */
export default class CharacterController {
    //region Constructors
    /**
     * @param {Player} player
     */
    constructor(player) {
        this.#player = player;

        this.#bindInput();
    }
    //endregion

    //region Variables
    MoveSpeed = 5.0;
    RotationSpeed = 2.0;
    JumpHeight = 2;

    /**@type {Player}*/
    #player;

    #movement = new THREE.Vector3();
    #looking = new THREE.Vector2();
    #sprinting = false;
    #jumping = true;
    //endregion

    //region Properties
    /**
     * Move the character to a direction
     * @param {THREE:Vector2, THREE:Vector3} movement
     */
    move(movement) {
        if (movement instanceof THREE.Vector2)
            this.#movement = new THREE.Vector3(movement.x, this.#movement.y, movement.y);
        else if (movement instanceof THREE.Vector3)
            this.#movement = movement
        this.#updateMove();
    }

    /**
     * Rotate the character to a direction
     * @param {THREE:Vector2} looking
     */
    look(looking) {
        this.#looking = looking;
        this.#updateLook();
    }

    /**
     * Make the character jump
     * @param {boolean} jumping
     */
    jump(jumping) {
        this.#jumping = jumping;
        //this.#updateJump();
        //this.#movement.y = 2;
    }

    /**
     * Make the character sprint
     * @param {boolean} sprinting
     */
    sprint(sprinting) {
        this.#sprinting = sprinting;
        this.#updateMove();
    }

    get #input() {
        return this.#player.Input;
    }

    get #motor() {
        return this.#player.Motor;
    }

    get #moveStyle() {
        return this.#player.MoveStyle;
    }
    //endregion

    //region Methods
    #bindInput() {
        this.#input.OnMove.add((movement) => this.move(movement));
        this.#input.OnLook.add((looking) => this.look(looking));
        this.#input.OnJump.add((jumping) => this.jump(jumping));
        this.#input.OnSprint.add((Sprinting) => this.sprint(Sprinting));
    }

    #updateMove() {
        let speed = this.MoveSpeed;
        if (this.#sprinting)
            speed *= 2;

        switch (this.#moveStyle) {
            case CharacterMovementStyles.MoveStyle._3D_1:
                this.#motor.MoveForward = true;
                this.#motor.move(new THREE.Vector3(0, 0, this.#movement.y).multiplyScalar(speed));
                this.#motor.rotate(new THREE.Vector3(0, this.#movement.x, 0).multiplyScalar(this.RotationSpeed));
                break;
            case CharacterMovementStyles.MoveStyle._3D_2:
                this.#motor.MoveForward = true;
                this.#motor.move(new THREE.Vector3(this.#movement.x, 0, this.#movement.z).multiplyScalar(speed));
                break;
            case CharacterMovementStyles.MoveStyle._3D_3:
                break;
            case CharacterMovementStyles.MoveStyle._2D:
                this.#motor.MoveForward = false;
                this.#motor.move(this.#movement.multiplyScalar(speed));
                break;
            case CharacterMovementStyles.MoveStyle.TopDown:
                break;
        }
    }

    #updateLook() {
        if (this.#moveStyle === CharacterMovementStyles.MoveStyle._3D_2)
            this.#motor.rotate(new THREE.Vector3(this.#looking.x, this.#looking.y, 0).multiplyScalar(this.RotationSpeed));
    }

    #updateJump() {
        if (this.#jumping && this.#motor.isGrounded())
            this.#motor.addVelocity(new THREE.Vector3(0, this.JumpHeight, 0));
    }
    //endregion
}
