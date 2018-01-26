import { fromJS } from 'immutable'
import {
  WEATHER_FETCH_DATA_SUCCESS,
  WEATHER_FETCH_DATA_ERROR,
  REMOVE_WEATHER_TAB,
  SELECT_ACTIVE_TAB,
  ADD_LOCATION_SUCCESS
} from '../actions/weather';

const initialState = fromJS({
  items: [
    { title: 'New York, USA', content: {}, key: '1' },
    { title: 'Toronto, Canada', content: {}, key: '2' },
  ],
  keyCounter: 2,
  activeTab: '1'
})

let nextKey;

export default (state = initialState, action) => {
  switch (action.type) {

    case WEATHER_FETCH_DATA_SUCCESS:


      let content = [];
      content.push(action.payload.body.weather[0].description);
      content.push(`Wind: ${action.payload.body.wind.speed} m/s`);
      content.push(`Temperature: ${action.payload.body.main.temp}`);
      content.push(`Temperature Max: ${action.payload.body.main.temp_max}`);
      content.push(`Temperature Min: ${action.payload.body.main.temp_min}`);

      return state
        .update('items', (items) => items.map(item => {
          if (item.get('key') !== action.payload.key) {
            return item;
          }
          return item.set('content', content)
        }));

    case WEATHER_FETCH_DATA_ERROR:
      return state
        .set('error', fromJS(action.payload))

    case REMOVE_WEATHER_TAB:
      return state
         .update('items', items => items.filter(item => item.get('key') != action.payload));

    case SELECT_ACTIVE_TAB:
      return state
          .set('activeTab', fromJS(action.payload))

    case ADD_LOCATION_SUCCESS:
      nextKey = state.get('keyCounter')
      nextKey++;

      let newItem = { title: action.payload.title, content: {}, key: nextKey.toString()}
      return state
        .update('items', (items) => items.push(fromJS(newItem)))
        .update('keyCounter', (value) => nextKey);

    default:
      return state
  }
}
