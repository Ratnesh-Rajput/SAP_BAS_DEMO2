namespace my.data;

entity ForecastData {
    key ID        : Integer;  // Unique Identifier
    Date          : String;   // Date in string format
    Forecast      : Decimal(18, 2); // Forecast value
    Lower_CI      : Decimal(18, 2); // Lower Confidence Interval
    Upper_CI      : Decimal(18, 2); // Upper Confidence Interval
}