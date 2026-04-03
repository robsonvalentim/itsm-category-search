import pandas as pd
import json
import os

def clean_itsm_data_final(input_file, output_json):
    if not os.path.exists(input_file):
        print("Erro: Arquivo não encontrado.")
        return

    # Silenciar o aviso de downcasting futuro para manter a limpeza
    pd.set_option('future.no_silent_downcasting', True)

    # 1. Leitura
    df = pd.read_excel(input_file)

    # 2. Seleção de Colunas
    cols = [
        'Área Serviço', 'servico', 'subservico1', 'subservico2', 
        'subservico3', 'subservico4', 'subservico5', 
        'tipodeservico', 'aprovagestor', 'Empresa Serviço', 'prioridade'
    ]
    
    existing_cols = [c for c in cols if c in df.columns]
    df = df[existing_cols].copy()

    # 3. Tratamento de Strings (Ajustado de applymap para map)
    # Primeiro garantimos que tudo que for texto sofra o trim
    df = df.map(lambda x: x.strip() if isinstance(x, str) else x)

    # 4. Normalização de Booleanos (aprovagestor)
    if 'aprovagestor' in df.columns:
        map_bool = {
            'Sim': True, 'S': True, '1': True, '1.0': True, 'True': True,
            'Não': False, 'N': False, '0': False, '0.0': False, 'False': False, 
            'nan': False, '': False
        }
        # Convertemos para string para normalizar o mapeamento
        df['aprovagestor'] = df['aprovagestor'].astype(str).str.strip().map(map_bool).fillna(False)

    # 5. Tratamento de Dtypes Incompatíveis
    # Convertemos o dataframe inteiro para 'object' antes do fillna para evitar o erro de float64
    df = df.astype(object).fillna("")

    # 6. Desduplicação
    df.drop_duplicates(inplace=True)

    # 7. Exportação
    data = df.to_dict(orient='records')
    with open(output_json, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

    print(f"✅ Dados normalizados com sucesso!")
    print(f"📊 Total de categorias únicas: {len(df)}")
    print(f"📂 Arquivo gerado: {output_json}")

if __name__ == "__main__":
    clean_itsm_data_final('Categorias_Chamados.xlsx', 'categorias.json')