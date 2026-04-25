import { useMemo, useState, useEffect } from 'react';
import type { CategoriaChamado } from '../types';
import categoriasRaw from '../data/categorias.json';

const categorias = categoriasRaw as CategoriaChamado[];
const ITEMS_PER_PAGE = 20;

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmpresa, setSelectedEmpresa] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedCD, setSelectedCD] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Reset da página quando um filtro muda
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedEmpresa, selectedArea, selectedCD]);

  const listas = useMemo(() => {
    const empresas = new Set<string>();
    const areas = new Set<string>();
    const cds = new Set<string>();

    categorias.forEach(item => {
      if (item['Empresa Serviço']) empresas.add(item['Empresa Serviço']);
      if (item['Área Serviço']) areas.add(item['Área Serviço']);
      if (item.subservico1 && item.subservico1.includes('-')) cds.add(item.subservico1);
    });

    return {
      empresas: Array.from(empresas).sort(),
      areas: Array.from(areas).sort(),
      cds: Array.from(cds).sort()
    };
  }, []);

  // 1. Primeiro filtramos a lista completa
  const allFilteredResults = useMemo(() => {
    let results = categorias;

    if (selectedEmpresa) results = results.filter(item => item['Empresa Serviço'] === selectedEmpresa);
    if (selectedArea) results = results.filter(item => item['Área Serviço'] === selectedArea);
    if (selectedCD) results = results.filter(item => item.subservico1 === selectedCD);

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter((item) => {
        return (
          item.servico.toLowerCase().includes(term) ||
          item.subservico1.toLowerCase().includes(term) ||
          item.subservico2.toLowerCase().includes(term) ||
          item.subservico3.toLowerCase().includes(term) ||
          item['Área Serviço'].toLowerCase().includes(term)
        );
      });
    }

    if (!searchTerm && !selectedEmpresa && !selectedArea && !selectedCD) return [];
    return results;
  }, [searchTerm, selectedEmpresa, selectedArea, selectedCD]);

  // 2. Calculamos a paginação sobre os resultados filtrados
  const totalPages = Math.ceil(allFilteredResults.length / ITEMS_PER_PAGE);
  
  const paginatedResults = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return allFilteredResults.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [allFilteredResults, currentPage]);

  return {
    searchTerm, setSearchTerm,
    selectedEmpresa, setSelectedEmpresa,
    selectedArea, setSelectedArea,
    selectedCD, setSelectedCD,
    currentPage, setCurrentPage,
    totalPages,
    totalResults: allFilteredResults.length,
    listas,
    filteredResults: paginatedResults,
  };
};