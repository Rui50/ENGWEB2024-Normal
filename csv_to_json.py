import csv
import json

def csv_to_json(csv_file_path, json_file_path):
    with open(csv_file_path, mode='r', encoding='utf-8') as csv_file:
        reader = csv.DictReader(csv_file, delimiter=';')
        data = [row for row in reader]
    
    # Converter "precoContratual" para float
    for row in data:
        row["precoContratual"] = float(row["precoContratual"].replace(',', '.')) if row["precoContratual"] else None
    

    json_data = json.dumps(data, ensure_ascii=False, indent=4)
    
    with open(json_file_path, mode='w', encoding='utf-8') as json_file:
        json_file.write(json_data)

csv_file_path = 'contratos2024.csv'
json_file_path = 'contratos2024.json'

csv_to_json(csv_file_path, json_file_path)
