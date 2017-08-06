import * as angular from 'angular';

import {Option} from '../../../share/models/common.model';
import {BlankValidator} from '../validation-alert/blank-validator';

export class BlankSelectDoubleController extends BlankValidator {

    public static $inject = [
        '$scope',
        '$timeout'
    ];
    public disabled: boolean;
    public info: string;
    public label: string;
    public model1: any;
    public model2: any;
    public options1: Option[];
    public options2: Option[];
    public order: string;
    public required: boolean;
    public reverse: boolean = false;

    private watcherModel2: Dereg;

    protected ctrlAs: string = CTRL_AS;

    constructor (
        protected $scope: angular.IScope,
        private $timeout: ng.ITimeoutService
    ) {
        super();
    }

    public afterOnDestroy() {
        this.watcherModel2();
    };

    public afterOnInit(): void {
        this.setModel2Watcher();
    }

    private setModel2Watcher(): void {
        this.watcherModel2 = this.$scope.$watch(
            () => this.model2,
            () => this.validateSelect1()
        );
    }

    private validateSelect1(): void {
        this.$timeout(() => {
            let formField1 = this.form[this.name];

            if (formField1) {
                formField1.$validate();
            }
        });
    }
}

const CTRL_AS = 'selectVM';

export let blankSelectDouble: angular.IComponentOptions = {
    templateUrl: require('./blank-select-double.component.jade'),
    controller: BlankSelectDoubleController,
    controllerAs: CTRL_AS,
    bindings: {
        change: '=',
        disabled: '<',
        form: '<',
        info: '@',
        label: '@',
        maxlength: '@',
        model1: '=',
        model2: '=',
        name: '@',
        options1: '<',
        options2: '<',
        order: '<',
        required: '<',
        reverse: '<'
    }
};
