interface Program {
    id?: number;
    name?: string;
    endDate?: Date;
    setIds?: number[];
}

interface StringedFields {
    endDate?: string;
}

type ProgramBody = Omit<Program, 'id' | 'endDate'> & StringedFields;

interface ProgramQuery {
    ids?: string;
    before?: string;
    finished?: string;
    exerciseIds?: number[];
    nested?: string;
}

export type { Program, ProgramBody, ProgramQuery };
