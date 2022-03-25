import * as THREE from 'three';

//https://github.com/stemkoski/stemkoski.github.com/blob/master/Three.js/Collision-Detection.html
export default class Collision {
    static #collidableMeshList = [];
    static #playGround = new THREE.Vector3(0 , 0, 0);

    /**
     * Add mesh in the collider detection list
     * @param {THREE.Mesh} mesh
     */
    static registerMesh(mesh) {
        Collision.#collidableMeshList.push(mesh);
    }

    static setPlaygroundZone(x, y, z) {
        Collision.#playGround = new THREE.Vector3(x , y, z);
    }

    static isOutOfBound(position){
        return Collision.#outOfBound(Collision.#playGround.x, position.x) || Collision.#outOfBound(Collision.#playGround.y, position.y) || Collision.#outOfBound(Collision.#playGround.z, position.z);
    }

    /**
     * Return the velocity without going inside a collider
     * @param {THREE.Mesh, THREE.Object3D} mesh
     * @param {THREE.Vector3} velocity
     */
    static move(mesh, velocity) {
        let newPosition = new THREE.Vector3(
            mesh.position.x + velocity.x,
            mesh.position.y + velocity.y,
            mesh.position.z + velocity.z);

        newPosition.x = Collision.#applyPlayground(Collision.#playGround.x, newPosition.x);
        newPosition.y = Collision.#applyPlayground(Collision.#playGround.y, newPosition.y);
        newPosition.z = Collision.#applyPlayground(Collision.#playGround.z, newPosition.z);

        console.log(newPosition.x + " " + mesh.position.x);
        let newVelocity = new THREE.Vector3(
            newPosition.x - mesh.position.x,
            newPosition.y - mesh.position.y,
            newPosition.z - mesh.position.z,
        );

        return newVelocity;

        for (let vertexIndex = 0; vertexIndex < mesh.geometry.vertices.length; vertexIndex++) {
            let localVertex = mesh.geometry.vertices[vertexIndex].clone();
            let globalVertex = localVertex.applyMatrix4( mesh.matrix );
            let directionVector = globalVertex.sub( mesh.position );

            let ray = new THREE.Raycaster( mesh.position.clone(), directionVector.clone().normalize() );
            let collisionResults = ray.intersectObjects( Collision.#collidableMeshList );
            if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) {

            }
        }
    }

    /**
     * Fix number to no go out of the play zone
     * @param {number} playGround
     * @param {number} newPosition
     * @returns {number}
     */
    static #applyPlayground(playGround, newPosition) {

        if (newPosition > playGround) // +
            return playGround;
        else if (-playGround >= newPosition) // -
            return -playGround;
        else
            return newPosition;
    }
    static #outOfBound(playGround, axe) {
        return axe > playGround || -playGround > axe;
    }
}