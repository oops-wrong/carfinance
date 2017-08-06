import * as angular from 'angular';

export class BlankButtonController implements angular.IComponentController {

    public static $inject = [];
    public disabled: boolean;
    public extraClass: string;
    public icon: string;
    public label: string;
    public loading: boolean;
    public type: string;

    protected ctrlAs: string = CTRL_AS;

    constructor () {}
}

const CTRL_AS = 'buttonVM';

export let blankButton: angular.IComponentOptions = {
    templateUrl: require('./blank-button.component.jade'),
    controller: BlankButtonController,
    controllerAs: CTRL_AS,
    bindings: {
        disabled: '<',
        extraClass: '@',
        icon: '@',
        label: '@',
        loading: '<',
        type: '@',
    }
};
