import * as angular from 'angular';

export class BlankButtonNumberController {

    public static $inject = [];
    public icon: string;
    public model: string;
    public max: number;
    public min: number;
    public step: number;

    constructor () {}

    public action(): void {
        let newValue: number = _.toNumber(this.model) + _.toNumber(this.step);

        if (newValue < this.min) {
            this.model = _.toString(this.min);
        } else if (newValue > this.max) {
            this.model = _.toString(this.max);
        } else {
            this.model = _.toString(newValue);
        }
    }
}

const CTRL_AS = 'buttonVM';

export let blankButtonNumber: angular.IComponentOptions = {
    templateUrl: require('./blank-button-number.component.jade'),
    controller: BlankButtonNumberController,
    controllerAs: CTRL_AS,
    bindings: {
        icon: '@',
        max: '@',
        min: '@',
        model: '=',
        step: '@'
    }
};
