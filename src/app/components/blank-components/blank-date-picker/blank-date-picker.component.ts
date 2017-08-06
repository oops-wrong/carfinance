import * as angular from 'angular';

import {BlankValidator} from '../validation-alert/blank-validator';

export class BlankDatePickerController extends BlankValidator {

    public static $inject = ['$scope'];
    public config = { dropdownSelector: `#a${this.name}`, startView:'year', minView:'day' };
    public label: string;
    public model: Date;
    public pickerModel: Date;
    public required: boolean;

    private modelsSyncWatcher: Dereg;

    protected ctrlAs: string = CTRL_AS;

    constructor (protected $scope: angular.IScope) {
        super();
    }

    public $onDestroy() {
        this.modelsSyncWatcher();
    }

    public afterOnInit() {
        this.initPickerModel();
        this.setModelsSyncWatcher();
    }

    public setDate() {
        this.model = this.pickerModel;
    }

    private initPickerModel(): void {
        this.pickerModel = this.model || new Date('1985-01-01');
    }

    private setModelsSyncWatcher(): void {
        this.modelsSyncWatcher = this.$scope.$watch(
            () => this.model,
            () => {
                if (this.model) {
                    this.pickerModel = this.model;
                }
            }
        );
    }
}

const CTRL_AS = 'dateVM';

export let blankDatePicker: angular.IComponentOptions = {
    templateUrl: require('./blank-date-picker.component.jade'),
    controller: BlankDatePickerController,
    controllerAs: CTRL_AS,
    bindings: {
        form: '<',
        label: '@',
        info: '@',
        model: '=',
        name: '@',
        required: '<'
    }
};
