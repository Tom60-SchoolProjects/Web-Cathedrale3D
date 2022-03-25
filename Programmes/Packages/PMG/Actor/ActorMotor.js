import GameLoop from "../../../GameLoop.js";
import * as THREE from 'three';
import Collision from "../../../Collision.js";

/**
 * Smooth and apply mouvement of the player
 */
export default class ActorMotor {
    //region Constructors
    /**
     @param {THREE.Object3D} transform
     * @param {Boolean} moveForward
     */
    constructor(transform, moveForward) {
        this.Transform = transform;
        this.MoveForward = moveForward;

        GameLoop.add(() => this.#update())
    }
    //endregion

    //region Variables
    /**@type {THREE.Object3D}*/
    Transform;
    /**@type {boolean}*/
    MoveForward;

    #velocity = new THREE.Vector3;
    #rotation = new THREE.Vector3;
    //endregion

    //region Properties
    /**
     * Return the current velocity
     * @returns {THREE.Vector3}
     */
    get velocity() {
        return this.#velocity;
    }

    /**
     * Return the current rotation
     * @returns {THREE.Vector3}
     */
    get rotation() {
        return this.#rotation;
    }

    /**
     * Return if is grounded
     * @returns {boolean}
     */
    isGrounded() {
        return true;
    }
    //endregion

    //region Methods
    /**
     * Gets a movement vectorz
     * @param {THREE.Vector3, THREE.Vector2} velocity
     */
    move(velocity) {
        if (velocity instanceof THREE.Vector2)
            this.#velocity = new THREE.Vector3(velocity.x, this.#velocity.y, velocity.z);
        else if (velocity instanceof THREE.Vector3)
            this.#velocity = velocity;
    }

    /**
     *
     * @param {THREE.Vector3} velocity
     */
    addVelocity(velocity) {
        this.#velocity.addVectors(velocity.x, velocity.y, velocity.z);
    }

    /**
     * Gets a rotational vector
     * @param {THREE.Vector3, THREE.Vector2} rotation
     */
    rotate(rotation) {
        if (rotation instanceof THREE.Vector2)
            this.#rotation = new THREE.Vector3(rotation.x, rotation.y, 0);
        else if (rotation instanceof THREE.Vector3)
            this.#rotation = rotation;
    }

    /**
     * Gets a force vector
     * @param {THREE.Vector3} velocity
     */
    addForce(velocity) {
        //velocity.y += 350;
        //rigidbody.AddForce(_velocity, ForceMode.Acceleration);
    }

    /**
     * Run every physics iteration
     * @param {ActorMotor} base
     */
    #update() {
        this.#performMovement();
        this.#performRotation();
    }

    /**
     * Perform movement based on velocity variable
     */
    #performMovement() {
        let velocity = this.#velocity;

        if (velocity !== THREE.Vector3.zero) {
            velocity.multiplyScalar(GameLoop.deltaTime);
            //velocity = Collision.move(this.Transform, velocity);
            let oldPosition = this.Transform.position.clone();

            if (this.MoveForward) {
                let y = this.Transform.position.y;
                this.Transform.translateX(velocity.x);
                this.Transform.translateZ(-velocity.z);
                this.Transform.translateY(y - this.Transform.position.y);
                this.Transform.position.y = y + velocity.y;
                if (Collision.isOutOfBound(this.Transform.position)){
                    this.Transform.position.set(oldPosition.x, oldPosition.y, oldPosition.z);
                }

            } else {
                this.Transform.position.add(velocity)
                if (Collision.isOutOfBound(this.Transform.position)){
                    this.Transform.position.set(oldPosition.x, oldPosition.y, oldPosition.z);
                }
            }
        }
    }

    /**
     * Perform rotation
     */
    #performRotation() {
        const PI_2 = Math.PI / 2;

        let euler = new THREE.Euler().setFromQuaternion( this.Transform.quaternion, 'YXZ');

        euler.y -= this.#rotation.x  * GameLoop.deltaTime;
        euler.x -= this.#rotation.y * GameLoop.deltaTime;

        euler.x = Math.max( PI_2 - Math.PI, Math.min( PI_2, euler.x ) );

        this.Transform.quaternion.setFromEuler( euler );
    }
    //endregion
}