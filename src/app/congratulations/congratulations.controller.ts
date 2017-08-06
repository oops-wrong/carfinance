import {FormService} from '../share/form.service';
import {FResponse} from '../share/models/form-response.model';

export class CongratulationsController implements ng.IController {

    public static $inject = [
        '$document',
        '$scope',
        '$state',
        '$timeout',
        'formService',
        '$window',
        '$analytics',
        'Restangular'
    ];

    protected isDelayed: boolean = false;
    private request: FResponse;

    constructor(
        private $document: ng.IDocumentService,
        private $scope: ng.IScope,
        private $state: ng.ui.IStateService,
        private $timeout: ng.ITimeoutService,
        private formService: FormService,
        private $window: ng.IWindowService,
        private $analytics: any,
        private restangular: Restangular.IService
    ) { }

    public $onInit() {
        //scroll to top of page
        (this.$document as any).scrollTop(100, 1000);

        //Once load if form has been submitted
        this.checkFormSubmitting();

        //extract response parameters
        this.request =  this.setResponseParams();

        //check api for buyer info after interval.
        this.$timeout(() => {
            this.getBuyerInfo(this.request)
                .then((response: FResponse) => {
                    if(response.data.length > 0 && response.data[0].redirectUrl != undefined && response.data[0].redirectUrl != '') {
                        console.log('redirecting to ' + response.data[0].buyerName);
                        this.$window.location.href = response.data[0].redirectUrl;
                    }
                })
                .finally(() => {
                    this.isDelayed = true;
                });
        }, 3000);

        //GA converstion
        this.$analytics.eventTrack('Lead', {  category: 'lead', label: 'lead' });
        //Adwords conversion tracking
        this.$window.goog_report_conversion();
        //Facebook event
        this.$window.fbq('track', 'Lead');
    }

    private checkFormSubmitting() {
        if (!this.formService.isSubmitted) {
            this.$state.go('main.face');
        }
    }

    private getBuyerInfo(request: FResponse): ng.IPromise<FResponse> {
        return this.restangular
            .withConfig(config => {
                config.setBaseUrl(ENV.INFO_API);
            })
            .all('')
            .post(request);
    }

    private setResponseParams(): FResponse {
        let requestModel = new FResponse;
        requestModel.ref = this.$state.params['ref'] || '';
        requestModel.token = this.$state.params['token'] || '';
        return requestModel;
    }
}
