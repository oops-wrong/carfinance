import { Form, UTM } from './models/form.model';
import { FResponse } from './models/form-response.model';

export class FormService {

    public static $inject = [
        '$window',
        'api',
        'Restangular'
    ];
    public ip: string;
    public isSubmitted = false;
    public utm: UTM;

    constructor(
        private $window: ng.IWindowService,
        private api: Restangular.IService,
        private restangular: Restangular.IService
    ) { }

    public setIp(): void {
        this.restangular
            .withConfig(config => {
                config.setBaseUrl('//freegeoip.net/json/');
            })
            .one('')
            .get()
            .then(data => {
                this.ip = data.ip;
            });
    }

    public submit(form: Form): ng.IPromise<FResponse> {
        this.isSubmitted = true;
        form.setDob();
        this.setIpToForm(form);
        this.setTrackingUrlToForm(form);
        this.setUtmToForm(form);

        return this.submitRequest(form);
    }

    private setIpToForm(form: Form): void {
        form.ip_address = this.ip;
    }

    private setTrackingUrlToForm(form: Form): void {
        form.trackingUrl = this.$window.location.search;
    }

    private setUtmToForm(form: Form): void {
        _.assignIn(form, this.utm);
    }

    private submitRequest(form: Form): ng.IPromise<FResponse> {
        return this.api
            .all('')
            .post(form);
    }
}
