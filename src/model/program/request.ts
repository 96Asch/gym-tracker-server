interface ProgramBody {
    name: string;
    endDate: string;
}

interface ProgramQuery {
    ids?: string;
    before?: string;
}

export { ProgramBody, ProgramQuery };
