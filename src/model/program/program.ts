interface Program {
    id?: number | string;
    name?: string;
    endDate?: Date;
}

interface StringedFields {
    endDate?: string;
}

type ProgramBody = Omit<Program, 'id' | 'endDate'> & StringedFields;

interface ProgramQuery {
    ids?: string;
    before?: string;
    finished?: string;
}

export type { Program, ProgramBody, ProgramQuery };
