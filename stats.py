import pandas as pd

def analyze_data(json_file):
    df = pd.read_json(json_file)
    total_rows = len(df)
    
    print("-" * 30)
    print("📊 ANÁLISE DE DADOS PARA O FRONTEND")
    print("-" * 30)

    # 1. Análise de Subserviços (Ocupação)
    for col in ['subservico3', 'subservico4', 'subservico5']:
        if col in df.columns:
            # Conta quantos campos NÃO estão vazios
            count = df[df[col] != ""].shape[0]
            percent = (count / total_rows) * 100
            print(f"Coluna {col}: {count} preenchidos ({percent:.2f}%)")

    print("-" * 30)

    # 2. Cardinalidade de Empresa Serviço
    if 'Empresa Serviço' in df.columns:
        empresas = df['Empresa Serviço'].unique()
        print(f"Empresas encontradas ({len(empresas)}):")
        for emp in empresas:
            if emp == "":
                print("  - [Vazio/Geral]")
            else:
                print(f"  - {emp}")
    
    print("-" * 30)
    
    # 3. Distribuição de Prioridade (Para sabermos as cores dos Badges)
    if 'prioridade' in df.columns:
        print("Níveis de Prioridade:")
        print(df['prioridade'].value_counts())

if __name__ == "__main__":
    analyze_data('categorias.json')