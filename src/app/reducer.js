const initState = {
    cities: ['Budapest'],
    selectedCity: 'Budapest',
};

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_CITY':
            return {
                ...state,
                cities: [...state.cities, action.payload],
            };
        case 'SELECT_CITY':
            return {
                ...state,
                selectedCity: action.payload,
            };
        default:
            return state;
    }
};

export default rootReducer;