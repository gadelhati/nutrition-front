enum PromisseOne { Pending, Resolved, Rejected, Fulfilled, Settled }

enum PromisseTwo {
    PENDING= "Pending",
    RESOLVED= "Resolved",
    REJECTED= "Rejected",
    FULFILLED= 'Fulfilled',
    SETTLED= 'Settled',
}

const PromisseThree = {
    'PENDING': "Pending",
    'RESOLVED': "Resolved",
    'REJECTED': "Rejected",
    'FULFILLED': 'Fulfilled',
    'SETTLED': 'Settled',
}

export const initialState = {
    loading: false,
    error: null,
    item: Object,
    itens: [],
    promisseOne: PromisseOne,
    promisseTwo: PromisseTwo,
    promisseThree: PromisseThree,
}