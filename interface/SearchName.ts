export interface APIResponse {
    studentGraduate: StudentGraduate[];
    studentCourse: StudentCourse[];
    studentModule: StudentModule[];
    counter: number;
}

export interface StudentGraduate {
    id: number;
    fullName: string;
    documentNumber: string;
    code: string;
    quota: Quota[];
    result: any[];
    graduate: GraduateData[];
    corporation: CorporationData[];
    endDate: string;
}

export interface Quota {
    id: number;
    name: string;
    code: string;
    dateReceipt: string | null;
    hourReceipt: string | null;
    price: string;
    state: boolean;
    date: string;
    observation: string | null;
    observationOption: string | null;
    idGraduate: number;
    voucherUpload: string | null;
    createdAt: string;
    updatedAt: string;
    studentGraduateId: number;
}

export interface GraduateData {
    graduate: {
        id: number;
        name: string;
    };
}

export interface CorporationData {
    corporation: {
        id: number;
        name: string;
        icon: string;
        image: string;
        graduate: GraduateCredits[];
        module: ModuleData[];
    };
}

export interface GraduateCredits {
    credits: string;
    hours: string;
    corporation: {
        graduate: {
            corporation: {
                id: number;
                name: string;
            };
            institute: string | null;
        }[];
    };
}

export interface ModuleData {
    module: {
        id: number;
        name: string;
        startDate: string;
        endDate: string;
    };
}

export interface StudentCourse {
    id: number;
    fullName: string;
    documentNumber: string;
    code: string;
    quota: Quota[];
    module: CourseModuleData[];
    corporation: CorporationData[];
}

export interface CourseModuleData {
    module: {
        id: number;
        name: string;
        endDate: string;
        corporation: CourseInstitute[];
    };
}

export interface CourseInstitute {
    hours: string;
    institute: {
        id: number;
        name: string;
        icon: string | null;
        image: string | null;
    };
}

export interface StudentModule {
    id: number;
    fullName: string;
    documentNumber: string;
    nameModule: string;
    endDate: string;
    hours: string;
    code: string;
    corporation: string;
    studentGraduate: {
        corporation: CorporationData[];
    };
}
