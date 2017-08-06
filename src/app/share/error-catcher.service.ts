import {Form} from './models/form.model';
import {ErrorCatcherModel} from './models/error-catcher.model';

export class ErrorCatcherService {

    public static $inject = [
        'formModel'
    ];

    constructor(
        private formModel: Form
    ) {}

    public getDefaultPayload(): ErrorCatcherModel {
        this.formModel.setDob();

        return new ErrorCatcherModel({
            to: ENV.NOTIFY_EMAIL,
            source: ENV.ENV_NAME,
            description: '',
            line: '',
            col: '',
            stack: '',
            other: JSON.stringify(this.formModel),
        });
    }

    public sendErrorReport(payload: ErrorCatcherModel): void {
        jQuery.ajax({
            contentType: 'application/json',
            data: JSON.stringify(payload),
            method: 'POST',
            url: ENV.EMAIL_API
        });
    }
}
