import {OBJLoader} from "https://raw.githubusercontent.com/Tom60chat/Cathedrale3D/main/Libs/OBJLoader.js";
import * as THREE from 'three';
import GameLoop from "https://raw.githubusercontent.com/Tom60chat/Cathedrale3D/main/GameLoop.js";

export default class Scene {
    /**
     *
     * @param {THREE.Scene} scene
     */
    static load(scene) {
        Scene.#loadCathedral(scene);
        //Scene.#loadTestCube(scene);
        Scene.#loadLights(scene);
        Scene.#loadHints(scene);
    }

    /**
     *
     * @param {THREE.Scene} scene
     */
    static #loadCathedral(scene) {
        let manager = new THREE.LoadingManager();
        manager.onProgress = function (item, loaded, total) {
            console.log(item, loaded, total);
        };

        let texture = new THREE.Texture();

        let tempo = new THREE.ImageLoader(manager);
        tempo.load("https://raw.githubusercontent.com/Tom60chat/Cathedrale3D/main/TranseptSud/TranseptTexture4096.jpg', function (image) {
            texture.image = image;
            texture.needsUpdate = true;
        });

        // Chargement du modèle
        tempo = new OBJLoader(manager);
        tempo.load('https://raw.githubusercontent.com/Tom60chat/Cathedrale3D/main/TranseptSud/transeptSudBox.obj',
            /**@param {THREE.Object3D} object*/
            function (object) {
                object.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        child.material.map = texture;
                    }
                });
                object.rotation.x = -Math.PI / 2;
                object.position.y = 21.5;

                scene.add(object);
            });
    }

    /**
     *
     * @param {THREE.Scene} scene
     */
    static #loadTestCube(scene) {
        // Cubes
        // Cube X
        let cubeGeometry = new THREE.BoxBufferGeometry(1, 0.5, 0.5);
        let cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Green
        let cubeModel = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cubeModel.position.set(1, 0, 0);
        scene.add(cubeModel);

        // Cube -X
        cubeGeometry = new THREE.BoxBufferGeometry(1, 0.5, 0.5);
        cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff }); // Blue
        cubeModel = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cubeModel.position.set(-1, 0, 0);
        scene.add(cubeModel);

        // Cube Z
        cubeGeometry = new THREE.BoxBufferGeometry(0.5, 0.5, 1);
        cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x0ff0000 }); // Red
        cubeModel = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cubeModel.position.set(0, 0, 1);
        scene.add(cubeModel);

        // Cube Y
        cubeGeometry = new THREE.BoxBufferGeometry(0.5, 1, 0.5);
        cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x0ffffff }); // Red
        cubeModel = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cubeModel.position.set(0, 1, 0);
        scene.add(cubeModel);
    }

    /**
     *
     * @param {THREE.Scene} scene
     */
    static #loadLights(scene) {
        let ambientLB = new THREE.PointLight(0xFFFF00, 1, 12);
        ambientLB.position.set(5, 10, 10);
        scene.add(ambientLB);
        let ambientRB = new THREE.PointLight(0xFFFF00, 1, 12);
        ambientRB.position.set(-5, 10, 10);
        scene.add(ambientRB);
        let ambientLF = new THREE.PointLight(0xFFFF00, 1, 12);
        ambientLF.position.set(5, 10, -10);
        scene.add(ambientLF);
        let ambientRF = new THREE.PointLight(0xFFFF00, 1, 12);
        ambientRF.position.set(-5, 10, -10);
        scene.add(ambientRF);
    }

    /**
     *
     * @param {THREE.Scene} scene
     */
    static #loadHints(scene) {
        let manager = new THREE.LoadingManager();
        manager.onProgress = function (item, loaded, total) {
            console.log(item, loaded, total);
        };
        let tempo = new THREE.ImageLoader(manager);

        // Indice 1
        let hint1Texture = new THREE.Texture();
        let hint1 = new THREE.Object3D();
        hint1.name = "Hint 1";

        let hint1CubeGeometry = new THREE.BoxGeometry(1, 1, 1);
        let hint1CubeMaterial = new THREE.MeshPhongMaterial({
            color: 0x7E551E, // Marron
            transparent: true,
        }); // Green
        let hint1CubeModel = new THREE.Mesh(hint1CubeGeometry, hint1CubeMaterial);
        hint1CubeModel.position.set(0, 0, -5);
        hint1.add(hint1CubeModel);

        tempo.load("https://raw.githubusercontent.com/Tom60chat/Cathedrale3D/main/Assets/Indice1.png', function (image) {
            hint1Texture.magFilter = THREE.NearestFilter;
            hint1Texture.minFilter = THREE.NearestMipmapNearestFilter;
            hint1Texture.anisotropy = 0;
            hint1Texture.image = image;
            hint1Texture.needsUpdate = true;
        });
        let hint1PlaneGeometry = new THREE.PlaneGeometry(1, 1, 1);
        let hint1PlaneMaterial = new THREE.MeshPhongMaterial({
            map: hint1Texture,
            color: 0xFFFFFF,
            transparent: true
        });
        let hint1Plane = new THREE.Mesh(hint1PlaneGeometry, hint1PlaneMaterial);
        hint1Plane.position.set(0, 1, -5);
        hint1.add(hint1Plane);

        scene.add(hint1);

        //GameLoop.add(() => { Scene.#indiceVisible(scene, 1, 1.1); } )
        
        // Indice 2
        let hint2Texture = new THREE.Texture();
        let hint2 = new THREE.Object3D();
        hint2.name = "Hint 2";

        let hint2CubeGeometry = new THREE.BoxGeometry(1, 1, 1);
        let hint2CubeMaterial = new THREE.MeshPhongMaterial({
            color: 0x00ff00, // Green
            transparent: true,
            opacity: .4
        });
        let hint2CubeModel = new THREE.Mesh(hint2CubeGeometry, hint2CubeMaterial);
        hint2CubeModel.position.set(5, 0, 10);
        hint2.add(hint2CubeModel);

        tempo.load('../Assets/Indice2.png', function (image) {
            hint2Texture.magFilter = THREE.NearestFilter;
            hint2Texture.minFilter = THREE.NearestMipmapNearestFilter;
            hint2Texture.anisotropy = 0;
            hint2Texture.image = image;
            hint2Texture.needsUpdate = true;
        });
        let hint2PlaneGeometry = new THREE.PlaneGeometry(1, 1, 1);
        let hint2PlaneMaterial = new THREE.MeshPhongMaterial({
            map: hint2Texture,
            color: 0xFFFFFF,
            transparent: true
        });
        let hint2Plane = new THREE.Mesh(hint2PlaneGeometry, hint2PlaneMaterial);
        hint2Plane.position.set(5, 1, 10);
        hint2Plane.rotation.set(0,  THREE.MathUtils.DEG2RAD * -140, 0);
        hint2.add(hint2Plane);

        scene.add(hint2);

        GameLoop.add(() => { Scene.#indiceVisible(scene, 2, 5); } )

        // Indice 3
        let hint3Texture = new THREE.Texture();
        let hint3 = new THREE.Object3D();
        hint3.name = "Hint 3";
        hint3.position.set(-5.9, 2.4, 2.6);
        hint3.rotation.set(0,  THREE.MathUtils.DEG2RAD * 90, 0);

        tempo.load("https://raw.githubusercontent.com/Tom60chat/Cathedrale3D/main/Assets/Indice3.png', function (image) {
            hint3Texture.magFilter = THREE.NearestFilter;
            hint3Texture.minFilter = THREE.NearestMipmapNearestFilter;
            hint3Texture.anisotropy = 0;
            hint3Texture.image = image;
            hint3Texture.needsUpdate = true;
        });
        let hint3PlaneGeometry = new THREE.PlaneGeometry(1, 1, 1);
        let hint3PlaneMaterial = new THREE.MeshPhongMaterial({
            map: hint3Texture,
            color: 0xFFFFFF,
            transparent: true
        });
        let hint3Plane = new THREE.Mesh(hint3PlaneGeometry, hint3PlaneMaterial);
        hint3.add(hint3Plane);

        GameLoop.add(() => { Scene.#indiceVisible(scene, 3, 5); } )

        scene.add(hint3);
        
        // Indice 3
        let hint4Texture = new THREE.Texture();
        let hint4 = new THREE.Object3D();
        hint4.name = "Hint 4";
        hint4.position.set(-5.9, 2.4, 2.6);
        hint4.rotation.set(0,  THREE.MathUtils.DEG2RAD * 90, 0);

        tempo.load("https://raw.githubusercontent.com/Tom60chat/Cathedrale3D/main/Assets/Indice4.png', function (image) {
            hint4Texture.magFilter = THREE.NearestFilter;
            hint4Texture.minFilter = THREE.NearestMipmapNearestFilter;
            hint4Texture.anisotropy = 0;
            hint4Texture.image = image;
            hint4Texture.needsUpdate = true;
        });
        let hint4PlaneGeometry = new THREE.PlaneGeometry(1, 1, 1);
        let hint4PlaneMaterial = new THREE.MeshBasicMaterial({
            map: hint4Texture,
            color: 0xFFFFFF,
            transparent: true
        });
        let hint4Plane = new THREE.Mesh(hint4PlaneGeometry, hint4PlaneMaterial);
        hint4Plane.position.set(2, 30, 5);
        hint4Plane.rotation.set(THREE.MathUtils.DEG2RAD * 90, 0, 0);
        hint4Plane.scale.set(10, 10, 10);
        hint4.add(hint4Plane);

        GameLoop.add(() => { Scene.#indiceVisible(scene, 4, 5); } )

        let ambientLB = new THREE.PointLight(0xFFFF00, 1, 21);
        ambientLB.position.set(2, 30, 5);
        hint4.add(ambientLB);

        scene.add(hint4);
    }

    /**
     *
     * @param {THREE.Scene} scene
     * @param {number} indice
     * @param {number} distance
     */
    static #indiceVisible(scene, indice, distance) {
        /**@type {THREE.Object3D}*/
        let hint = scene.getObjectByName("Hint " + indice);
        /**@type {THREE.Object3D}*/
        let player = scene.getObjectByName("Player");

        let hintDistance = player.position.distanceTo(hint.position);
        if (indice === 1) {
            let co = document.querySelector("#code");
            co.style.visibility = !(hintDistance >= distance) ? 'visible' : 'hidden';
        } else if (indice === 2 )
            hint.visible = (hintDistance >= distance);
        else
            hint.visible = !(hintDistance >= distance);

    }

    /**
     *
     * @param {THREE.Scene} scene
     * @param {THREE.Camera} camera
     * @returns {THREE.Object3D}
     */
    static getPlayerModel(scene, camera) {
        let playerObject = new THREE.Object3D();

        // Lumière
        let torch = new THREE.PointLight(0xFFDDAA, 1, 10);

        torch.scale.set(0.1, 0.1, 0.1);
        torch.rotation.set(THREE.MathUtils.DEG2RAD * -10, 0, THREE.MathUtils.DEG2RAD * 10);
        torch.position.set(0.04, -0.01, 0.1);

        // Modèles
        let playerTorch = Scene.getTorch(scene);
        playerTorch.scale.set(0.1, 0.1, 0.1);
        playerTorch.rotation.set(THREE.MathUtils.DEG2RAD * -10, 0, THREE.MathUtils.DEG2RAD * 10);
        playerTorch.position.set(0.04, -0.01, -0.1);

        playerObject.attach(camera);
        playerObject.attach(torch);
        playerObject.attach(playerTorch);
        playerObject.name = "Player";

        scene.add(playerObject);

        return playerObject;
    }

    /**
     *
     * @param {THREE.Scene} scene
     * @returns {THREE.Object3D}
     */
    static getTorch(scene) {
        let manager = new THREE.LoadingManager();
        manager.onProgress = function (item, loaded, total) {
            console.log(item, loaded, total);
        };

        let texture = new THREE.Texture();

        let tempo = new THREE.ImageLoader(manager);
        tempo.load("https://raw.githubusercontent.com/Tom60chat/Cathedrale3D/main/Assets/torch.png', function (image) {
            texture.magFilter = THREE.NearestFilter;
            texture.minFilter = THREE.NearestMipmapNearestFilter;
            texture.anisotropy = 0;
            texture.image = image;
            texture.needsUpdate = true;
        });

        // Chargement du modèle
        let planeGeometry = new THREE.PlaneGeometry(1, 1, 1);
        let planeMaterial = new THREE.MeshPhongMaterial( {map: texture, color: 0xFFFFFF});
        planeMaterial.transparent = true;
        return new THREE.Mesh(planeGeometry, planeMaterial);
    }
}
