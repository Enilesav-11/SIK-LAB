import { X, FileText } from 'lucide-react';
import { SequenceDiagram } from './SequenceDiagram';

interface TechnicalDiagramsProps {
  onClose: () => void;
}

export function TechnicalDiagrams({ onClose }: TechnicalDiagramsProps) {
  return (
    <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 overflow-hidden">
      <div className="bg-[#1E1E1E] border border-[#505050] rounded-[16px] w-full max-w-7xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#505050] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#DC143C] to-[#FF4500] rounded-[12px] flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-[#F0F0F0] text-[24px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                SIKLAB Sequence Diagram
              </h1>
              <p className="text-[#A0A0A0] text-[13px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                System Interaction Flow (Tier 1-3)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#A0A0A0] hover:text-[#F0F0F0] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Sequence Diagram Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            <p className="text-[#A0A0A0] text-[13px] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Sequence diagram showing the interaction flow between Resident, Web App, API Server, Database, and AI Service during the hazard reporting process (up to Tier 3: Login, Form Setup, and Photo Upload with AI Analysis).
            </p>
            <div className="bg-[#2C2C2C] border border-[#505050] rounded-[12px] p-6 overflow-x-auto">
              <SequenceDiagram />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
