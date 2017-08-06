import moment = require('moment');

import {Option, OptionWithIcon} from './common.model';

export class Form {
    title: FTitleName = FTitle.Mr;
    f_name: string;
    l_name: string;
    dob: Date;
    dob_day: string;
    dob_mon: string;
    dob_year: string;
    addr_line_1: string; // street
    addr_line_2: string; // building name
    addr_town: string;
    addr_pcode: string;
    curr_addr_yrs: string;
    curr_addr_mon: string = '0';
    curr_residential_status: FResidentialStatusName;
    phone_1: string;
    email_addr: string;
    occupation: string;
    monthly_income: number;
    employment_status: FEmploymentStatusName;
    curr_empl_name: string;
    curr_empl_addr_1: string; // street
    curr_empl_addr_2: string; // building name
    curr_empl_addr_town: string;
    curr_empl_addr_pcode: string;
    curr_empl_yrs: string;
    curr_empl_mon: string = '0';
    marital_status: FMaritalStatusName;
    product_amount: number = 7500; // loan value
    product_term: number; // loan duration
    driving_license_type: FDrivingLicenseTypeName;
    vehicle_type: FVehicleTypeName = FVehicleType.CAR;
    product_code = 'CARFINANCE';
    product_type = 'CARFINANCE';
    prev_addrs: FPrevAddress[];
    prev_empls: FPrevEmpl[];

    source: string;
    source_id: string;
    channel: string;
    campaign: string;
    keyword: string;
    trackingUrl: string;
    ip_address: string;

    constructor(rawData?: Form) {
        _.assignIn(this, rawData);

        this.prev_addrs = _.map(this.prev_addrs, prevAddress => new FPrevAddress(prevAddress));
        this.prev_empls = _.map(this.prev_empls, prevEmpl => new FPrevEmpl(prevEmpl));
    }

    public setDob(): void {
        this.setDobDay();
        this.setDobMon();
        this.setDobYear();
    }

    private setDobDay(): void {
        this.dob_day = this.dob && moment(this.dob).format('DD');
    };

    private setDobMon(): void {
        this.dob_mon = this.dob && moment(this.dob).format('M');
    };

    private setDobYear(): void {
        this.dob_year = this.dob && moment(this.dob).format('YYYY');
    };
}

/////////////////////////////////////////////////////////////
// F_TITLE
/////////////////////////////////////////////////////////////

export class FTitle {
    static readonly Mr = 'Mr';
    static readonly Mrs = 'Mrs';
    static readonly Ms = 'Ms';
    static readonly Miss = 'Miss';
}
export type FTitleName = keyof typeof FTitle;

export const fTitleOptions: Option[] = [
    {
        displayName: 'Mr',
        value: FTitle.Mr
    },
    {
        displayName: 'Mrs',
        value: FTitle.Mrs
    },
    {
        displayName: 'Ms',
        value: FTitle.Ms
    },
    {
        displayName: 'Miss',
        value: FTitle.Miss
    },
];

/////////////////////////////////////////////////////////////
// F_RESIDENTIAL_STATUS
/////////////////////////////////////////////////////////////

export class FResidentialStatus {
    static readonly HOMEOWNER = 'HOMEOWNER';
    static readonly TENANTPRIVATE = 'TENANTPRIVATE';
    static readonly TENANTCOUNCIL = 'TENANTCOUNCIL';
    static readonly WITHPARENTS = 'WITHPARENTS';
    static readonly UNKNOWN = 'UNKNOWN';
}
export type FResidentialStatusName = keyof typeof FResidentialStatus;

export const fResidentialStatusOptions: Option[] = [
    {
        displayName: 'Homeowner',
        value: FResidentialStatus.HOMEOWNER
    },
    {
        displayName: 'Private Tenant',
        value: FResidentialStatus.TENANTPRIVATE
    },
    {
        displayName: 'Tenant Council',
        value: FResidentialStatus.TENANTCOUNCIL
    },
    {
        displayName: 'Living with Parents',
        value: FResidentialStatus.WITHPARENTS
    },
    {
        displayName: 'Unknown',
        value: FResidentialStatus.UNKNOWN
    },
];

/////////////////////////////////////////////////////////////
// F_EMPLOYMENT_STATUS
/////////////////////////////////////////////////////////////

export class FEmploymentStatus {
    static readonly EMPLOYED = 'EMPLOYED';
    static readonly SELFEMPLOYED = 'SELFEMPLOYED';
    static readonly RETIRED = 'RETIRED';
    static readonly UNEMPLOYED = 'UNEMPLOYED';
}
export type FEmploymentStatusName = keyof typeof FEmploymentStatus;

export const fEmploymentStatusOptions: Option[] = [
    {
        displayName: 'Employed',
        value: FEmploymentStatus.EMPLOYED
    },
    {
        displayName: 'Self Employed',
        value: FEmploymentStatus.SELFEMPLOYED
    },
    {
        displayName: 'Retired',
        value: FEmploymentStatus.RETIRED
    },
    {
        displayName: 'Unemployed',
        value: FEmploymentStatus.UNEMPLOYED
    },
];

/////////////////////////////////////////////////////////////
// F_MARITAL_STATUS
/////////////////////////////////////////////////////////////

export class FMaritalStatus {
    static readonly MARRIED = 'MARRIED';
    static readonly SINGLE = 'SINGLE';
    static readonly DIVORCED = 'DIVORCED';
    static readonly SEPERATED = 'SEPERATED';
    static readonly WIDOWED = 'WIDOWED';
    static readonly COHABIT = 'COHABIT';
}
export type FMaritalStatusName = keyof typeof FMaritalStatus;

export const fMaritalStatusOptions: Option[] = [
    {
        displayName: 'Married',
        value: FMaritalStatus.MARRIED
    },
    {
        displayName: 'Cohabiting',
        value: FMaritalStatus.COHABIT
    },
    {
        displayName: 'Single',
        value: FMaritalStatus.SINGLE
    },
    {
        displayName: 'Divorced',
        value: FMaritalStatus.DIVORCED
    },
    {
        displayName: 'Separated',
        value: FMaritalStatus.SEPERATED
    },
    {
        displayName: 'Widowed',
        value: FMaritalStatus.WIDOWED
    },
];

/////////////////////////////////////////////////////////////
// F_DRIVING_LICENSE_TYPE
/////////////////////////////////////////////////////////////

export class FDrivingLicenseType {
    static readonly FULLUK = 'FULLUK';
    static readonly FULLUKPHOTO = 'FULLUKPHOTO';
    static readonly INTER = 'INTER';
    static readonly NONE = 'NONE';
    static readonly PROVUK = 'PROVUK';
    static readonly EU = 'EU';
}
export type FDrivingLicenseTypeName = keyof typeof FDrivingLicenseType;

export const fDrivingLicenseTypeOptions: Option[] = [
    {
        displayName: 'Full UK',
        value: FDrivingLicenseType.FULLUK
    },
    {
        displayName: 'Full UK Photocard',
        value: FDrivingLicenseType.FULLUKPHOTO
    },
    {
        displayName: 'International',
        value: FDrivingLicenseType.INTER
    },
    {
        displayName: 'None',
        value: FDrivingLicenseType.NONE
    },
    {
        displayName: 'Provisional UK',
        value: FDrivingLicenseType.PROVUK
    },
    {
        displayName: 'EU',
        value: FDrivingLicenseType.EU
    },
];

/////////////////////////////////////////////////////////////
// F_VEHICLE_TYPE
/////////////////////////////////////////////////////////////

export class FVehicleType {
    static readonly CAR = 'CAR';
    static readonly MOTORBIKE = 'MOTORBIKE';
    static readonly VAN = 'VAN';
}
export type FVehicleTypeName = keyof typeof FVehicleType;

export const fVehicleTypeOptions: OptionWithIcon[] = [
    {
        displayName: 'Car',
        icon: 'ico ico-car',
        value: FVehicleType.CAR
    },
    {
        displayName: 'Van',
        icon: 'ico ico-van',
        value: FVehicleType.VAN
    },
    {
        displayName: 'Bike',
        icon: 'ico ico-bike',
        value: FVehicleType.MOTORBIKE
    },
];

/////////////////////////////////////////////////////////////
// F_PREV_ADDRESS
/////////////////////////////////////////////////////////////

export class FPrevAddress {
    prev_addr_line_1: string; // Street
    prev_addr_line_2: string; // House
    prev_addr_town: string; // City
    prev_addr_pcode: string; // Zip
    prev_addr_yrs: string;
    prev_addr_mon: string = '0';

    constructor(rawData?: FPrevAddress) {
        _.assignIn(this, rawData);
    }
}

/////////////////////////////////////////////////////////////
// F_PREV_EMPL
/////////////////////////////////////////////////////////////

export class FPrevEmpl {
    prev_empl_name: string;
    prev_empl_addr_line_1: string;
    prev_empl_addr_line_2: string;
    prev_empl_addr_town: string;
    prev_empl_addr_pcode: string;
    prev_empl_yrs: string;
    prev_empl_mon: string = '0';

    constructor(rawData?: FPrevEmpl) {
        _.assignIn(this, rawData);
    }
}

/////////////////////////////////////////////////////////////
// UTM MODEL
/////////////////////////////////////////////////////////////

export class UTM {
    source: string;
    source_id: string;
    channel: string;
    campaign: string;
    keyword: string;

    constructor(rawData?: Partial<UTM>) {
        _.assignIn(this, rawData);
    }
}
