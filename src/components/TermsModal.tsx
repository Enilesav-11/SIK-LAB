import { Flame, X } from 'lucide-react';
import { Button } from './ui/button';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TermsModal({ isOpen, onClose }: TermsModalProps) {
  if (!isOpen) return null;

  const handleAccept = () => {
    console.log('Terms accepted');
    onClose();
  };

  return (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-8 z-30">
      <div className="bg-white rounded-lg shadow-xl max-w-[280px] w-full max-h-[500px] flex flex-col">
        {/* Header */}
        <div className="flex flex-col items-center p-6 border-b">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-6 h-6 text-orange-600 fill-orange-600" />
            <span className="tracking-wider">SIKLAB</span>
          </div>
          <p className="text-xs text-gray-600">Terms and Service</p>
          <p className="text-xs text-gray-400">Last updated 06.01.2025</p>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 text-xs space-y-4">
          <p className="text-gray-700">
            Welcome to <span className="font-semibold">SikLab</span>, a Fire Hazard Mapping and 
            Awareness System.
          </p>
          <p className="text-gray-700">
            By downloading and using SikLab, you agree to comply with and be bound by these{' '}
            <span className="font-semibold">Terms of Service</span>.
          </p>
          <p className="text-gray-700">
            Please read them carefully before using the app.
          </p>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">1. Acceptance of Terms</h3>
            <p className="text-gray-700">
              By using SikLab, you confirm that you have read, understood, and agreed to these Terms of Service 
              and our Privacy Policy. If you do not agree, please do not use the app.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">2. Description of Service</h3>
            <p className="text-gray-700">
              SikLab provides users with tools to report fire incidents in real-time. View fire hazard maps and 
              access fire safety information and educational resources. SikLab is intended to support 
              awareness and reporting, not to replace official emergency services. In the event of an active fire or emergency, always 
              contact your local fire department or emergency services immediately.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">3. User Responsibilities</h3>
            <p className="text-gray-700">
              You agree to use SikLab only for lawful purposes and in a manner that does not infringe 
              on the rights of others. You must provide accurate information when reporting incidents.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">4. Privacy and Data Collection</h3>
            <p className="text-gray-700">
              Your use of SikLab is subject to our Privacy Policy, which describes how we collect, 
              use, and protect your personal information.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t">
          <Button
            onClick={handleAccept}
            className="w-full rounded-full bg-transparent border-2 border-orange-500 text-orange-600 hover:bg-orange-50"
          >
            I have read the Terms of Service and Privacy Policy
          </Button>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
