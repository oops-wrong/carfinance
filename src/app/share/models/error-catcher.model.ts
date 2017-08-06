export class ErrorCatcherModel {
    to: string;
    source: string;
    description: string;
    line: string;
    col: string;
    stack: string;
    other: string;

    constructor(rawData?: ErrorCatcherModel) {
        _.assignIn(this, rawData);
    }
}
