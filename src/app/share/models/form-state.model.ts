export class FormState {
    isActive = false;
    isEditable = false;

    constructor(rawData?: Partial<FormState>) {
        _.assignIn(this, rawData);
    }
}

export class FormStateHelper {
    public static resetActiveStates(states: FormState[]): void {
        _.each(states, state => {
            state.isActive = false;
        });
    }

    public static resetEditableState(states: FormState[], stateNumber: number): void {
        states[stateNumber].isEditable = false;
    }

    public static setActiveState(states: FormState[], stateNumber: number): void {
        this.resetActiveStates(states);
        states[stateNumber].isActive = true;
    }

    public static setEditableState(states: FormState[], stateNumber: number): void {
        states[stateNumber].isEditable = true;
    }
}
