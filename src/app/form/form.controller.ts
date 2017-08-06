import * as angular from 'angular';

import { FormService } from '../share/form.service';
import { Address, AddressContainer, AddressHelper } from '../share/models/address.model';
import { CommonHelper, fMonthOptions, fYearOptions } from '../share/models/common.model';
import {
    fDrivingLicenseTypeOptions,
    fEmploymentStatusOptions,
    fMaritalStatusOptions,
    Form,
    FPrevAddress,
    FPrevEmpl,
    fResidentialStatusOptions,
    fTitleOptions,
    fVehicleTypeOptions
} from '../share/models/form.model';
import { FResponse } from '../share/models/form-response.model';
import { FormState, FormStateHelper } from '../share/models/form-state.model';

export class FormController implements ng.IController {

    public static $inject = [
        '$document',
        '$scope',
        '$state',
        '$timeout',
        'formModel',
        'formService',
        '$window',
        '$analytics'
    ];
    public readonly formStateAnimationDuration = 500;
    public readonly minYearsAddress = 3;
    public readonly minYearsEmployment = 1;
    public readonly postCodePattern = /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) [0-9][A-Za-z]{2})$/;
    public readonly phonePattern = /^(?:(?:\(?(?:0(?:0|11)\)?[\s-]?\(?|\+)44\)?[\s-]?(?:\(?0\)?[\s-]?)?)|(?:\(?0))(?:(?:\d{5}\)?[\s-]?\d{4,5})|(?:\d{4}\)?[\s-]?(?:\d{5}|\d{3}[\s-]?\d{3}))|(?:\d{3}\)?[\s-]?\d{3}[\s-]?\d{3,4})|(?:\d{2}\)?[\s-]?\d{4}[\s-]?\d{4}))(?:[\s-]?(?:x|ext\.?|\#)\d{3,4})?$/;
    public currentAddressDetails: Address;
    public extraAddressRepeats: number[] = [];
    public extraEmploymentRepeats: number[] = [];
    public fDrivingLicenseTypeOptions = fDrivingLicenseTypeOptions;
    public fEmploymentStatusOptions = fEmploymentStatusOptions;
    public fMaritalStatusOptions = fMaritalStatusOptions;
    public fMonthOptions = fMonthOptions;
    public form;
    public formStates: FormState[];
    public fResidentialStatusOptions = fResidentialStatusOptions;
    public fTitleOptions = fTitleOptions;
    public fVehicleTypeOptions = fVehicleTypeOptions;
    public fYearOptions = fYearOptions;
    public isAgreementWithPolicy: boolean;
    public isAgreementWithSMS: boolean = true;
    public isDelayed: boolean = false;
    public previousAddressDetails: AddressContainer[] = [];

    constructor(
        private $analytics: any,
        private $document: ng.IDocumentService,
        private $scope: ng.IScope,
        private $state: ng.ui.IStateService,
        private $timeout: ng.ITimeoutService,
        private $window: ng.IWindowService,
        private formModel: Form,
        private formService: FormService
    ) {
        this.setFormStates();
    }

    public $onInit() {
        this.form = this.formModel;
        this.setParams();
        this.setWatcherCurrentAddressDetails();

        this.$timeout(() => {
            this.isDelayed = true;
        }, 2300);
    }

    public changeTimeStay = (value): void => {
        this.$timeout(() => {
            this.getAddressYears();
        });
    }

    public changeTimeEmployment = (value): void => {
        this.$timeout(() => {
            this.getEmploymentYears();
        });
    }

    public editState(stateNumber: number): void {
        FormStateHelper.resetEditableState(this.formStates, stateNumber);
        FormStateHelper.setActiveState(this.formStates, stateNumber);

        this.scrollToFormState(stateNumber);
    }

    public submitStep1(form: angular.IFormController): void {
        if (form.$invalid) {
            return;
        }

        FormStateHelper.setActiveState(this.formStates, 1);
        FormStateHelper.setEditableState(this.formStates, 0);
        this.scrollToFormState(1);
    }

    public submitStep2(form: angular.IFormController): void {
        if (form.$invalid) {
            return;
        }

        if (this.isEnoughAddressYears()) {
            FormStateHelper.setActiveState(this.formStates, 2);
            FormStateHelper.setEditableState(this.formStates, 1);
            this.scrollToFormState(2);
        } else {
            this.setPreviousAddressDetails();
            this.form.prev_addrs.push(new FPrevAddress());
            this.setExtraAddressRepeats();
            CommonHelper.resetForm(form);
        }
    }

    public submitStep3(form: angular.IFormController): void {
        if (form.$invalid) {
            return;
        }

        if (this.isEnoughEmploymentYears()) {
            FormStateHelper.setActiveState(this.formStates, 3);
            FormStateHelper.setEditableState(this.formStates, 2);
            this.scrollToFormState(3);
        } else {
            this.form.prev_empls.push(new FPrevEmpl());
            this.setExtraEmploymentRepeats();
            CommonHelper.resetForm(form);
        }
    }

    public submitStep4(form: angular.IFormController): void {
        if (form.$invalid) {
            return;
        }

        this.formService.submit(this.form)
            .then((response: FResponse) => {
                this.$state.go('main.congratulations', { 'ref': response.ref, 'token': response.token }, {inherit: false});
            }).catch(error => {
            this.$state.go('main.congratulations', { 'ref': '', 'token': '' }, {inherit: false});
        }).finally(() => {
        });
    }

    private getAddressYears(): number {
        let currentYears = _.toNumber(this.form.curr_addr_yrs) + CommonHelper.calculateYearPartByMonths(this.form.curr_addr_mon);
        let extraYears = 0;
        let limitYears = 0;

        if (currentYears >= this.minYearsAddress) {
            this.form.prev_addrs = [];
            this.extraAddressRepeats = [];
        }

        _.each(this.form.prev_addrs, (prevAddress, i: number) => {
            extraYears += _.toNumber(prevAddress.prev_addr_yrs) + CommonHelper.calculateYearPartByMonths(prevAddress.prev_addr_mon);

            if (extraYears + currentYears >= this.minYearsAddress) {
                limitYears = i + 1;
                return false;
            }
        });

        if (limitYears > 0 && this.extraAddressRepeats.length > limitYears) {
            this.form.prev_addrs = _.slice(this.form.prev_addrs, 0, limitYears);
            this.extraAddressRepeats = _.slice(this.extraAddressRepeats, 0, limitYears);
        }

        return currentYears + extraYears;
    }

    private getEmploymentYears(): number {
        let currentYears = _.toNumber(this.form.curr_empl_yrs) + CommonHelper.calculateYearPartByMonths(this.form.curr_empl_mon);
        let extraYears = 0;
        let limitYears = 0;

        if (currentYears >= this.minYearsEmployment) {
            this.form.prev_empls = [];
            this.extraEmploymentRepeats = [];
        }

        _.each(this.form.prev_empls, (prevEmpls, i: number) => {
            extraYears += _.toNumber(prevEmpls.prev_empl_yrs) + CommonHelper.calculateYearPartByMonths(prevEmpls.prev_empl_mon);

            if (extraYears + currentYears >= this.minYearsEmployment) {
                limitYears = i + 1;
                return false;
            }
        });

        if (limitYears > 0 && this.extraEmploymentRepeats.length > limitYears) {
            this.form.prev_empls = _.slice(this.form.prev_empls, 0, limitYears);
            this.extraEmploymentRepeats = _.slice(this.extraEmploymentRepeats, 0, limitYears);
        }

        return currentYears + extraYears;
    }

    private isEnoughAddressYears(): boolean {
        return this.getAddressYears() >= this.minYearsAddress;
    }

    private isEnoughEmploymentYears(): boolean {
        return this.getEmploymentYears() >= this.minYearsEmployment;
    }

    private scrollToFormState(stateNumber: number): void {
        this.$timeout(() => {
            let formStateElement = angular.element(document.getElementById(`formState${stateNumber}`));
            (this.$document as any).scrollToElementAnimated(formStateElement, 0, 300);
        }, this.formStateAnimationDuration);
    }

    private setExtraAddressRepeats(): void {
        this.extraAddressRepeats.push(this.extraAddressRepeats.length);
    }

    private setExtraEmploymentRepeats(): void {
        this.extraEmploymentRepeats.push(this.extraEmploymentRepeats.length);
    }

    private setFormStates(): void {
        this.formStates = [
            new FormState({
                isActive: true
            }),
            new FormState(),
            new FormState(),
            new FormState(),
        ];
    }

    private setParams(): void {
        this.form.vehicle_type = this.$state.params['vehicle_type'] || this.form.vehicle_type;
        this.form.product_amount = _.toNumber(this.$state.params['product_amount']) || this.form.product_amount;
        this.form.product_term = _.toNumber(this.$state.params['product_term']) || this.form.product_term;
    }

    private setPreviousAddressDetails(): void {
        let addressIndex = this.form.prev_addrs.length;
        let addressContainer = new AddressContainer();
        this.previousAddressDetails.push(addressContainer);
        this.$scope.$watch(
            () => addressContainer.details,
            () => {
                let houseComponent = AddressHelper.getHouse(addressContainer.details);
                let postcodeComponent = AddressHelper.getPostcode(addressContainer.details);
                let streetComponent = AddressHelper.getStreet(addressContainer.details);
                let townComponent = AddressHelper.getTown(addressContainer.details);

                this.form.prev_addrs[addressIndex].prev_addr_line_1 = streetComponent && streetComponent.long_name || this.form.prev_addrs[addressIndex].prev_addr_line_1;
                this.form.prev_addrs[addressIndex].prev_addr_line_2 = houseComponent && houseComponent.long_name || this.form.prev_addrs[addressIndex].prev_addr_line_2;
                this.form.prev_addrs[addressIndex].prev_addr_pcode = postcodeComponent && postcodeComponent.long_name || this.form.prev_addrs[addressIndex].prev_addr_pcode;
                this.form.prev_addrs[addressIndex].prev_addr_town = townComponent && townComponent.long_name || this.form.prev_addrs[addressIndex].prev_addr_town;
            }
        );
    }

    private setWatcherCurrentAddressDetails(): void {
        this.$scope.$watch(
            () => this.currentAddressDetails,
            () => {
                let houseComponent = AddressHelper.getHouse(this.currentAddressDetails);
                let postcodeComponent = AddressHelper.getPostcode(this.currentAddressDetails);
                let streetComponent = AddressHelper.getStreet(this.currentAddressDetails);
                let townComponent = AddressHelper.getTown(this.currentAddressDetails);

                this.form.addr_line_1 = streetComponent && streetComponent.long_name || this.form.addr_line_1;
                this.form.addr_line_2 = houseComponent && houseComponent.long_name || this.form.addr_line_2;
                this.form.addr_pcode = postcodeComponent && postcodeComponent.long_name || this.form.addr_pcode;
                this.form.addr_town = townComponent && townComponent.long_name || this.form.addr_town;
            }
        );
    }
}
