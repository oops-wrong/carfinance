import {ErrorCatcherService} from './error-catcher.service';

export class $exceptionHandler {

    public static $inject = [
        'errorCatcherService'
    ];

    constructor(
        errorCatcherService: ErrorCatcherService
    ) {
        return (exception, cause) => {
            console.error(exception.stack);

            let payload = errorCatcherService.getDefaultPayload();
            payload.description = `${exception.name}: ${exception.message}`;
            payload.source = ENV.ENV_NAME;
            payload.stack = JSON.stringify(exception.stack);
            errorCatcherService.sendErrorReport(payload);
        };
    }
}
