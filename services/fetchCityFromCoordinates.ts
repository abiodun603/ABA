import axios from 'axios';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiYWJpb2R1bnRlbHZpZGEiLCJhIjoiY2xvZTF3dm1yMGY0NTJrcncxZTVseTc5ciJ9.pHW8EMjOMcEdwpmGjJAumQ';

async function fetchCityFromCoordinates(latitude: any, longitude: any) {
  try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?types=place&access_token=${MAPBOX_ACCESS_TOKEN}`
    );

    if (response.data && response.data.features && response.data.features.length > 0) {
      const cityInfo = response.data.features[0];
      const city = cityInfo.text;

      return city;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching city:', error);
    return null;
  }
}

export default fetchCityFromCoordinates;
