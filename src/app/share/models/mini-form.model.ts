import {
    FVehicleType,
    FVehicleTypeName
} from './form.model';

export class MiniForm {
    vehicle_type: FVehicleTypeName = FVehicleType.CAR;
    product_amount: string = '7500'; // loan value
    product_term: string = '4'; // loan duration

    constructor(rawData?: MiniForm) {
        _.assignIn(this, rawData);
    }
}
