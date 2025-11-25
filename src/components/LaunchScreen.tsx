import { Flame } from 'lucide-react';
import { Button } from './ui/button';

interface LaunchScreenProps {
  onGetStarted: () => void;
  onAboutClick?: () => void;
}

export function LaunchScreen({ onGetStarted, onAboutClick }: LaunchScreenProps) {
  return (
    <div className="relative w-full max-w-[375px] h-[812px] bg-black rounded-[3rem] shadow-2xl overflow-hidden border-[14px] border-black">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[180px] h-[30px] bg-black rounded-b-3xl z-10" />
      
      {/* Screen Content - Pixel Perfect Design */}
      <div className="w-full h-full relative bg-[#1E1E1E] flex flex-col items-center justify-center">
        {/* Logo Section */}
        <div className="flex flex-col items-center gap-8">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-[#FF4500] to-[#DC143C] rounded-[24px] flex items-center justify-center shadow-lg">
              <Flame className="w-20 h-20 text-[#F0F0F0] fill-[#F0F0F0]" />
            </div>
          </div>
          <div className="text-center">
            <div className="flex items-baseline justify-center gap-2 mb-3">
              <span className="text-[40px] font-bold tracking-tight text-[#F0F0F0]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                SIK
              </span>
              <span className="text-[40px] font-bold tracking-tight text-[#FF4500]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                LAB
              </span>
            </div>
            <p className="text-[#A0A0A0] text-[14px] tracking-wide" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Fire Hazard Mapping System
            </p>
          </div>
        </div>

        {/* Tagline */}
        <div className="absolute bottom-[200px] px-8 text-center">
          <p className="text-[#F0F0F0] text-[18px] leading-[160%]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Your guide to a safer,<br />
            more fire-ready community
          </p>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-[60px] left-0 right-0 px-6 space-y-4">
          <Button
            onClick={onGetStarted}
            className="w-full rounded-[12px] h-14 bg-[#FF4500] hover:bg-[#FF5722] text-[#F0F0F0] text-[16px] font-semibold shadow-lg transition-all"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Get Started
          </Button>
          <Button
            variant="outline"
            onClick={onAboutClick}
            className="w-full rounded-[12px] h-14 border-2 border-[#505050] text-[#A0A0A0] bg-transparent hover:bg-[#2C2C2C] text-[16px] font-semibold transition-all"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            About SIKLAB
          </Button>
        </div>
      </div>
    </div>
  );
}