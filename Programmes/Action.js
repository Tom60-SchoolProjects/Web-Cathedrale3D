export default class Action {
    //region Constructors
    constructor(actions) {
        if (actions === undefined)
            this.#actions = [];
        else
            this.#actions = actions;
    }
    //endregion

    //region Variables
    /**@type {Array<Function>}*/
    #actions;
    //endregion

    //region Methods
    /**@param {Function} func*/
    add(func) {
        if (func instanceof Function)
            this.#actions.push(func);
        else
            console.error(func + " is not a Function");
    }

    invoke(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14, arg15, arg16) {
        this.#actions.forEach(action => {
            if (action instanceof Function)
                action(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14, arg15, arg16);
        });
    }
    //endregion
}