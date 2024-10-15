import json
import pandas as pd

# Load your dataset
file_path = r'C:\Users\Siva\Documents\GitHub\uv-index-map\cleaned_solar_irradiance_data.csv'
df_cleaned = pd.read_csv(file_path)

# Convert the DataFrame to JSON
df_cleaned.to_json('solar_irradiance.json', orient='records')
