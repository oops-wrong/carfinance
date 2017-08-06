import {FormService} from './share/form.service';
import {UTM} from './share/models/form.model';

export class MainController implements ng.IController {

    public static $inject = [
        '$state',
        'formService'
    ];
    
    constructor (
        private $state: ng.ui.IStateService,
        private formService: FormService
    ) {}

    public $onInit() {
        this.setIp();
        this.setUtmParams();
    }

    private setIp(): void {
        this.formService.setIp();
    }

    private setUtmParams(): void {
        this.formService.utm = new UTM({
            source: this.$state.params['utm_source'] as string,
            source_id: this.$state.params['utm_source_id'] as string,
            channel: this.$state.params['utm_medium'] as string,
            campaign: this.$state.params['utm_campaign'] as string,
            keyword: this.$state.params['utm_term'] as string,
        });
    }
}
