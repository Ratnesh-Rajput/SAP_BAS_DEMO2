namespace forecast;

entity ForecastData {
     key uid: UUID; 
     Date: Integer;
    Company_code: Integer;
    GL_Account: Integer;
    Description: String;
    Location: String;
    Profit_Ctr: String;
    Cost_Ctr: String;
    Audit_Trail: String;
    Amount_LC: Decimal;
}
