
export const addCityAction = cityId => {
    return async dispatch => {
        function onSuccess(city) {
            dispatch({ type: 'ADD_CITY_SUCCESS', city });

            const cityIds = localStorage['cityIds'] ? localStorage['cityIds'].split(","): [];

            if (!cityIds.includes(cityId)) {
                cityIds.push(cityId);

                localStorage['cityIds'] = cityIds.join(',')
            }
          return city;
        }
        function onError(error) {
            dispatch({ type: 'ADD_CITY_FAILURE', error });
            return error;
        }
        try {
            const r = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&appid=5a1434c253404a3ffa75b8640df26b1e`);
            const city = await r.json();
            return onSuccess(city)
        } catch (error) {
            return onError(error);
        }
    }
}

export const tryGetInitialDataAction = () => {
    const cityIds = localStorage['cityIds'] ? localStorage['cityIds'].split(","): [];

    if ( !cityIds.length ) return 

    return async dispatch => {
        function onSuccess(cities) {
            dispatch({ type: 'GET_INITIAL_DATA_SUCCESS', cities });
            return cities;
        }
        function onError(error) {
            dispatch({ type: 'ADD_CIGET_INITIAL_DATA_FAILURE', error });
            return error;
        }
        try {
            const r = await fetch(`https://api.openweathermap.org/data/2.5/group?id=${cityIds.join(',')}&units=metric&appid=5a1434c253404a3ffa75b8640df26b1e`);
            const d = await r.json(); 
            return onSuccess(d.list);
        } catch (error) {
            return onError(error)
        }
    }
}

export const deleteCityAction = id => {
    const cityIds = localStorage['cityIds'] ? localStorage['cityIds'].split(","): [];

    if (cityIds.length) {
        localStorage['cityIds'] = cityIds.filter(i => i !== id)
    }

    return {
        type: "DELETE_CITY",
        id
    }
}