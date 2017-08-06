import * as angular from 'angular';

export abstract class BlankValidator implements angular.IComponentController {

    public field: angular.INgModelController;
    public form: angular.IFormController;
    public hasError: boolean = false;
    public isExtendedDropdown: boolean = false;
    public isFocusedOn: boolean;
    public isOpenPop: boolean;
    public mask: string;
    public maxlength: number;
    public name: string;

    protected $scope: angular.IScope;
    protected ctrlAs: string = '';
    protected dereg: () => void;
    protected formCtrl: string;
    protected modelCtrl: string;
    protected watchArray: string[] = [];

    public $onDestroy() {
        this.dereg();

        this.afterOnDestroy();
    }

    public $onInit() {
        this.buildCtrls();
        this.buildWatchArray();

        this.dereg = this.$scope.$watchGroup(
            this.watchArray,
            () => {
                this.watcher();
            }
        );

        this.afterOnInit();
    }

    public afterOnDestroy() {};

    public afterOnInit() {};

    public changeIsOpenPop(): void {
        this.isFocusedOn = !this.isFocusedOn;
        this.isOpenPop = !this.isOpenPop;
    }

    public changeOnFocus(): void {
        if (!this.isOpenPop) {
            this.isFocusedOn = !this.isFocusedOn;
        }
    }

    protected addFormWatcher(field: string): void {
        let watcher = `${this.formCtrl}.${field}`;
        this.watchArray.push(watcher);
    }

    protected addWatcher(field: string): void {
        let watcher = `${this.modelCtrl}.${field}`;
        this.watchArray.push(watcher);
    }

    protected addWatcherFn(fn: () => any): void {
        this.watchArray.push(fn as any);
    }

    protected buildCtrls(): void {
        this.formCtrl = `${this.ctrlAs}.form`;
        this.modelCtrl = `${this.ctrlAs}.form[${this.ctrlAs}.name]`;
    }

    protected buildWatchArray(): void {
        this.addFormWatcher('$submitted');

        this.addWatcher('$touched');
        this.addWatcher('$valid');

        if (this.mask) {
            this.addWatcher('$error.mask');
        }

        if (this.maxlength) {
            this.addWatcher('$error.maxlength');
        }

        this.addWatcherFn(() => this.isExtendedDropdown);
    }

    protected initField(): void {
        if (!this.field) {
            this.field = this.form[this.name];
        }
    }

    protected watcher(): void {
        this.initField();

        let invalidAndTouched = this.field.$invalid && this.field.$touched;
        let hasMaskError = this.field.$error.mask;
        let hasMaxlengthError = !!this.field.$error.maxlength;
        let invalidFormSubmitted = this.field.$invalid && this.form.$submitted && this.form.$invalid;

        this.hasError = invalidAndTouched && !hasMaskError && !this.isExtendedDropdown || hasMaxlengthError || invalidFormSubmitted;
    }
}
