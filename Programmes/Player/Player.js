/**
 * The player main logic
 */
import Action from "../Action.js";
import {ActorMotor} from "../Packages/PMG/PMG.js";
import {CharacterMovementStyles} from "../Packages/PMG/Controller/CharacterMovementStyle.js";

export default class Player {
    //region Constructors
    /**
     * @param {THREE.Camera} camera
     * @param {THREE.Object3D} transform
     * @param {PlayerInput} input
     */
    constructor(transform,/*camera,*/ input) {
        this.Motor = new ActorMotor(transform, true);

        //this.Camera = camera;
        this.Input = input;
    }
    //endregion

    //region Variables
    Motor;
    //Camera;
    MoveStyle = CharacterMovementStyles.MoveStyle._3D_2;
    Input;
    ActorChanged = new Action();
    //endregion

    //region Methods
    /*update() {
        switch (this.MoveStyle)
        {
            //Cursor move player
            case CharacterMovementStyles.MoveStyle._3D_1:

            /!*    if (virtualCamera is CinemachineFreeLook freeLook1)
            {
                freeLook1.m_XAxis.m_MaxSpeed = 250;
                freeLook1.m_BindingMode = CinemachineTransposer.BindingMode.SimpleFollowWithWorldUp;
            }*!/
                break;

            //Cursor move camera
            case CharacterMovementStyles.MoveStyle._3D_2:
            /!*    if (virtualCamera is CinemachineFreeLook freeLook2)
            {
                freeLook2.m_XAxis.m_MaxSpeed = 0;
                freeLook2.m_BindingMode = CinemachineTransposer.BindingMode.LockToTargetWithWorldUp;
            }*!/
                break;

            // No
            case CharacterMovementStyles.MoveStyle._3D_3:
                break;
            case CharacterMovementStyles.MoveStyle._2D:
                break;
            case CharacterMovementStyles.MoveStyle.TopDown:
                break;
        }
    }*/
    //endregion
}