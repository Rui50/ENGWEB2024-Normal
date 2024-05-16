# Setup

## Dataset Processing

### Tratamento dataset
1. **Convert CSV to JSON**: usar o programa `csv_to_json.py` presente no repositorio para fazer a conversão do csv para json
2. **Transformar `idcontrato`**: Mudar para `_id` devido a compatibilidade com mongoDB.
3. **Converter `precoContratual`**: Converter para número e mudar delimitador de `,` para `.`
4. **Mudar o campo**: `"precoContratual": -7853.66` para positivo.

## MongoDB

1. **Copiar JSON para o contaier**:
   ```bash
   docker cp contratos2024.json mongoEW:/tmp
   ```
2. **Entrar no container**:
   ```bash
   docker exec -it mongoEW bash
   ```
3. **Importar JSON para MongoDB**:
   ```bash
   mongoimport -d contratos -c contratos /tmp/contratos2024.json --jsonArray
   ```
4. **Aceder à shell do MongoDB**:
   ```bash
   mongosh
   ```
5. **Validar**:
   ```bash
   show dbs
   ```
   ```bash
   use contratos
   ```
   ```bash
   show collections
   ```