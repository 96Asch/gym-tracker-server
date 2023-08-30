interface ProgramBody {
    name: string;
    endDate: string;
}

interface ProgramQuery {
    ids?: string;
    before?: string;
    finished?: string;
}

export { ProgramBody, ProgramQuery };
