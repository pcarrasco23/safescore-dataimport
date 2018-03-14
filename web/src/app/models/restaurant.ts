export class Violation {
    code: string;
    description: string;
    criticalFlag: boolean;
}

export class Inspection {
    date: Date;
    score: number;
    grade: string;
    violations: Violation[];
}

export class Restaurant {
    id: number;
    name: string;
    streetNumber: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
    score: number;
    grade: string;
    closed: boolean;
    cuisineDescription: string;
    inspections: Inspection[];
}