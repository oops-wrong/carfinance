import { LeadData } from './lead-buyer.model';

export class FResponse {
    status: boolean;
    description: string;
    ref: number;
    fields: object;
    token: string;
    data: [LeadData];
}
