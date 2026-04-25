import React from 'react';
import { useSearch } from './hooks/useSearch';
import { 
  Search, 
  AlertTriangle, 
  Building2, 
  Clock, 
  Filter, 
  MapPin, 
  Layers 
} from 'lucide-react';

const App: React.FC = () => {
  const { 
    searchTerm, 
    setSearchTerm, 
    selectedEmpresa, 
    setSelectedEmpresa, 
    selectedArea,
    setSelectedArea,
    selectedCD,
    setSelectedCD,
    currentPage,          // Nova variável de paginação
    setCurrentPage,       // Nova função de paginação
    totalPages,           // Total de páginas calculado
    totalResults,         // Total de itens encontrados
    listas, 
    filteredResults 
  } = useSearch();

  const renderPriority = (priority: string | number) => {
    const p = String(priority);
    if (p.includes('1.0')) return <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-[10px] font-bold uppercase">Crítica</span>;
    if (p.includes('2.0')) return <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-[10px] font-bold uppercase">Alta</span>;
    if (p.includes('3.0')) return <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-[10px] font-bold uppercase">Normal</span>;
    return <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-[10px] font-bold uppercase">N/A</span>;
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <header className="max-w-5xl mx-auto mb-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-1 tracking-tight">ITSM Category Navigator</h1>
        <div className="flex items-center gap-2 text-slate-500 text-sm">
          <span className="font-medium text-blue-600">GrupoSC</span>
          <span className="text-slate-300">|</span>
          <span className="italic">Suporte Logístico & TI</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto">
        {/* Seção de Controles e Filtros */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* Busca por Texto (Ocupa 2 colunas no Desktop) */}
            <div className="md:col-span-2 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="O que você está procurando? (Ex: Zebra, SAP...)"
                className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-700 transition-all outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filtro de Empresa */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building2 className="h-4 w-4 text-slate-400" />
              </div>
              <select
                className="block w-full pl-10 pr-8 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white text-slate-700 appearance-none cursor-pointer text-sm"
                value={selectedEmpresa}
                onChange={(e) => setSelectedEmpresa(e.target.value)}
              >
                <option value="">Todas as Empresas</option>
                {listas.empresas.map(emp => <option key={emp} value={emp}>{emp}</option>)}
              </select>
            </div>

            {/* Filtro de Área */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Layers className="h-4 w-4 text-slate-400" />
              </div>
              <select
                className="block w-full pl-10 pr-8 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white text-slate-700 appearance-none cursor-pointer text-sm"
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
              >
                <option value="">Todas as Áreas</option>
                {listas.areas.map(area => <option key={area} value={area}>{area}</option>)}
              </select>
            </div>

            {/* Filtro de Localidade (CD) - Nova funcionalidade baseada no seu feedback */}
            <div className="md:col-span-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-4 w-4 text-slate-400" />
              </div>
              <select
                className="block w-full pl-10 pr-8 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white text-slate-700 appearance-none cursor-pointer text-sm font-medium"
                value={selectedCD}
                onChange={(e) => setSelectedCD(e.target.value)}
              >
                <option value="">Todos os CDs (Localidades)</option>
                {listas.cds.map(cd => <option key={cd} value={cd}>{cd}</option>)}
              </select>
            </div>

            {/* Botão para limpar filtros rápidos se necessário */}
            <div className="md:col-span-3 flex items-center gap-2 text-[11px] text-slate-400 uppercase font-bold tracking-widest">
              <Filter size={12} />
              Filtros Ativos: { (selectedEmpresa || selectedArea || selectedCD || searchTerm) ? 'Sim' : 'Nenhum' }
            </div>
          </div>
        </div>

        {/* Listagem de Resultados */}
        <div className="grid grid-cols-1 gap-4">
          {filteredResults.length > 0 ? (
            filteredResults.map((item, index) => (
              <div 
                key={index} 
                className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all group"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex flex-wrap gap-2">
                    <span className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2 py-1 rounded text-[10px] font-bold border border-blue-100 uppercase">
                      <Building2 size={12} />
                      {item['Empresa Serviço']}
                    </span>
                    <span className="flex items-center gap-1.5 bg-slate-100 text-slate-600 px-2 py-1 rounded text-[10px] font-bold border border-slate-200 uppercase">
                      <MapPin size={12} />
                      {item.subservico1}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {item.aprovagestor && (
                      <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-1 rounded text-[10px] font-bold border border-amber-200 uppercase">
                        <AlertTriangle size={12} />
                        Gestor
                      </div>
                    )}
                    {renderPriority(item.prioridade)}
                  </div>
                </div>

                <h3 className="text-slate-800 font-bold text-lg mb-1 group-hover:text-blue-600 transition-colors">
                  {item.servico}
                </h3>
                
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  {[item.subservico2, item.subservico3, item.subservico4, item.subservico5]
                    .filter(sub => sub && sub !== '---')
                    .join(" ➔ ")}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                   <div className="flex items-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {item.tipodeservico}
                      </span>
                      <span className="flex items-center gap-1">
                        <Layers size={12} /> {item['Área Serviço']}
                      </span>
                   </div>
                   <button className="text-[10px] text-blue-500 font-bold uppercase hover:underline">
                     Ver Detalhes
                   </button>
                </div>
              </div>
            ))
          ) : (searchTerm !== "" || selectedEmpresa !== "" || selectedArea !== "" || selectedCD !== "") ? (
            <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl py-16 text-center text-slate-400">
              <p className="italic">Nenhuma categoria encontrada para os filtros aplicados.</p>
              <button 
                onClick={() => {setSearchTerm(''); setSelectedEmpresa(''); setSelectedArea(''); setSelectedCD('');}}
                className="mt-4 text-blue-500 text-xs font-bold uppercase hover:underline"
              >
                Limpar todos os filtros
              </button>
            </div>
          ) : (
            <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl py-16 text-center text-slate-400">
              <Search className="mx-auto h-8 w-8 mb-4 opacity-20" />
              <p className="italic">Selecione uma localidade (CD) ou digite um termo para começar...</p>
            </div>
          )}
        </div>

        {/*Barra de navegação */}
        {/* ... dentro do main, após a listagem de cards ... */}

        {totalPages > 1 && (
          <div className="flex flex-col items-center gap-4 mt-8 pb-10">
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage(p => Math.max(1, p - 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 py-2 border border-slate-200 rounded-lg bg-white text-sm font-bold text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
              >
                Anterior
              </button>

              <div className="flex items-center px-4 text-sm font-medium text-slate-500">
                Página <span className="text-blue-600 font-bold mx-1">{currentPage}</span> de <span className="font-bold mx-1">{totalPages}</span>
              </div>

              <button
                disabled={currentPage === totalPages}
                onClick={() => {
                  setCurrentPage(p => Math.min(totalPages, p + 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 py-2 border border-slate-200 rounded-lg bg-white text-sm font-bold text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
              >
                Próxima
              </button>
            </div>
            
            <div className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">
              Total de {totalResults} resultados encontrados
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;