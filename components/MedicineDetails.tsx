
import React from 'react';
import { MedicineInfo } from '../types';

interface MedicineDetailsProps {
  data: MedicineInfo;
}

const MedicineDetails: React.FC<MedicineDetailsProps> = ({ data }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 my-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl border border-brand-mid/20 shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-brand-cream/30 border-b border-brand-mid/10 px-8 py-6">
          <h2 className="text-3xl font-bold text-brand-deep mb-1">{data.medicineName}</h2>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-mid">Composition:</span>
            <p className="text-slate-700 font-medium">{data.composition}</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 space-y-8">
          {/* Uses */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-brand-light/20 rounded-md text-brand-deep">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-brand-deep">Common Uses</h3>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.uses.map((use, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700 bg-brand-cream/20 p-3 rounded-xl border border-brand-mid/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-mid mt-2 shrink-0"></span>
                  {use}
                </li>
              ))}
            </ul>
          </section>

          {/* Side Effects */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-brand-light/30 rounded-md text-brand-mid">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-brand-mid">Common Side Effects</h3>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.sideEffects.map((effect, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700 bg-brand-cream/10 p-3 rounded-xl border border-brand-mid/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-light mt-2 shrink-0"></span>
                  {effect}
                </li>
              ))}
            </ul>
          </section>

          {/* Warnings */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-brand-red/10 rounded-md text-brand-red">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-brand-red">Important Warnings</h3>
            </div>
            <div className="space-y-3">
              {data.warnings.map((warning, i) => (
                <div key={i} className="flex items-center gap-4 bg-brand-red/5 p-4 rounded-xl border border-brand-red/10 text-brand-red">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 shrink-0 opacity-60">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286Z" />
                  </svg>
                  <p className="text-sm font-semibold leading-relaxed">{warning}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Other Details */}
          <section className="pt-4 border-t border-brand-mid/10">
            <h3 className="text-lg font-bold text-brand-deep mb-3">Additional Information</h3>
            <p className="text-slate-700 leading-relaxed text-sm bg-brand-mid/5 p-4 rounded-xl border border-brand-mid/10">
              {data.otherDetails}
            </p>
          </section>
        </div>

        {/* Disclaimer Footer */}
        <div className="bg-brand-deep text-brand-cream p-6 text-center">
          <p className="text-sm font-medium opacity-90 italic">
            Disclaimer: This information is for educational purposes only. Always consult a qualified healthcare professional or doctor before starting, stopping, or changing any medication.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetails;
