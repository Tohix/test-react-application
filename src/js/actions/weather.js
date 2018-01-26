import api from '../helpers/api'

export const WEATHER_FETCH_DATA_SUCCESS = 'WEATHER_FETCH_DATA_SUCCESS';
export const WEATHER_FETCH_DATA_ERROR = 'WEATHER_FETCH_DATA_ERROR';
export const REMOVE_WEATHER_TAB = 'REMOVE_WEATHER_TAB';
export const SELECT_ACTIVE_TAB = 'SELECT_ACTIVE_TAB';
export const ADD_LOCATION_SUCCESS = 'ADD_LOCATION_SUCCESS';

const API_URL = 'http://api.openweathermap.org/data/2.5/weather';
const API_KEY = '76198606ea04cade893d95fe844e10f0';

/**
 * Fetch weather data
 * @param data
 */
export const addLocation = data => (dispatch) => {
    api(`${API_URL}?q=${data}&APPID=${API_KEY}`)
        .then(response => {
            let payload = {
                title: data,
                body: response
            }
            dispatch({ type: ADD_LOCATION_SUCCESS, payload})
        })
}

/**
 * Remove Weather Tab
 * @param data
 */
export const removeWeatherTab = data => (dispatch) => {
    dispatch({ type: REMOVE_WEATHER_TAB, payload: data})
}

/**
 * Select Active tab
 * @param data
 */
export const selectActiveTab = (activeTab, title)=> (dispatch) => {
    dispatch({ type: SELECT_ACTIVE_TAB, payload: activeTab});
    api(`${API_URL}?q=${title}&APPID=${API_KEY}`)
        .then(response => {
            let payload = {
                key: activeTab,
                title: title,
                body: response
            }
            dispatch({ type: WEATHER_FETCH_DATA_SUCCESS, payload})
        })
}