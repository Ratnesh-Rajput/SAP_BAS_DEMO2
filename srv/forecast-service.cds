using {my.data as my } from '../db/schema';

service ForecastService {
    entity ForecastData as projection on my.ForecastData;
}
