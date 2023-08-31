interface Program {
    id?: number;
    name?: string;
    endDate?: Date;
    setIds?: number[];
}

interface StringedFields {
    endDate?: string;
}

interface ProgramResult {
    id: number;
    name: string;
    endDate: Date;
}

type ProgramBody = Omit<Program, 'id' | 'endDate'> & StringedFields;

interface ProgramQuery {
    ids?: string;
    before?: string;
    finished?: string;
}

export type { Program, ProgramBody, ProgramQuery };
