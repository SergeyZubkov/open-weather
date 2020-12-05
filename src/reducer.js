export default (state = [], action) => {
    switch (action.type) {
        case "ADD_CITY_SUCCESS": return [
            ...state,
            action.city
        ]
        
        case "DELETE_CITY": return [
            ...state.filter(c => c.id !== action.id)
        ];
        case "GET_INITIAL_DATA_SUCCESS": return [
            ...state,
            ...action.cities
        ];
        default: return state
    }
}