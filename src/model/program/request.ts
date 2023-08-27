interface ProgramBody {
    name: string;
    endDate: string;
}

interface ProgramQuery {
    id?: string;
    before?: string;
}

export { ProgramBody, ProgramQuery };
