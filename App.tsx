
import React, { useState, useCallback } from 'react';
import Header from './components/Header.tsx';
import SearchBar from './components/SearchBar.tsx';
import MedicineDetails from './components/MedicineDetails.tsx';
import { AppState } from './types.ts';
import { fetchMedicineDetails } from './services/geminiService.ts';

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

        {/* Loading State with Message */}
        {state.loading && (
          <div className="max-w-4xl mx-auto px-4 mt-12 text-center animate-pulse">
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-brand-mid/20 border-t-brand-deep rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-brand-mid">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-brand-deep tracking-tight">
                  wait patiently while we are fetching the info....
                </h3>
                <p className="text-brand-mid font-medium max-w-xs mx-auto">
                  AI Pharma-Aid is analyzing medical data to provide a clear summary for you.
                </p>
              </div>
              <div className="w-full max-w-md space-y-4">
                <div className="h-4 bg-brand-mid/10 rounded-full w-3/4 mx-auto"></div>
                <div className="h-4 bg-brand-mid/10 rounded-full w-1/2 mx-auto"></div>
              </div>
            </div>
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
