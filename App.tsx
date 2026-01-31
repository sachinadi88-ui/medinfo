
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MedicineDetails from './components/MedicineDetails';
import { AppState } from './types';
import { fetchMedicineDetails } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    loading: false,
    error: null,
    data: null,
  });

  const handleSearch = useCallback(async (query: string) => {
    setState({ loading: true, error: null, data: null });
    try {
      const details = await fetchMedicineDetails(query);
      setState({ loading: false, error: null, data: details });
    } catch (err: any) {
      setState({
        loading: false,
        error: err.message || "An unexpected error occurred while fetching information.",
        data: null,
      });
    }
  }, []);

  return (
    <div className="min-h-screen pb-20">
      <Header />
      
      <main className="container mx-auto max-w-5xl">
        <SearchBar onSearch={handleSearch} isLoading={state.loading} />

        {/* Error State */}
        {state.error && (
          <div className="max-w-4xl mx-auto px-4 mt-8">
            <div className="bg-brand-red/10 border border-brand-red/20 text-brand-red p-6 rounded-2xl flex items-center gap-4">
              <div className="p-2 bg-brand-red/20 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
              </div>
              <p className="font-bold">{state.error}</p>
            </div>
          </div>
        )}

        {/* Loading Skeleton */}
        {state.loading && (
          <div className="max-w-4xl mx-auto px-4 mt-8 animate-pulse">
            <div className="h-24 bg-brand-mid/10 rounded-3xl mb-4"></div>
            <div className="h-64 bg-brand-mid/10 rounded-3xl"></div>
          </div>
        )}

        {/* Results State */}
        {!state.loading && state.data && (
          <MedicineDetails data={state.data} />
        )}

        {/* Initial/Empty State */}
        {!state.loading && !state.data && !state.error && (
          <div className="max-w-4xl mx-auto px-4 mt-16 text-center">
            <div className="inline-block p-6 bg-white/50 rounded-full mb-6 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-brand-mid">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-brand-deep mb-2">Ready to assist you</h3>
            <p className="text-brand-mid max-w-sm mx-auto font-medium">
              Search for any medicine name above to get clear, educational information about its composition, uses, and risks.
            </p>
          </div>
        )}
      </main>

      {/* Footer Info */}
      <footer className="fixed bottom-0 left-0 right-0 py-4 px-6 text-center text-brand-deep/50 text-xs bg-white/40 backdrop-blur border-t border-brand-mid/10">
        &copy; {new Date().getFullYear()} MedInfo Assistant. Powered by Gemini AI. Educational content only.
      </footer>
    </div>
  );
};

export default App;
