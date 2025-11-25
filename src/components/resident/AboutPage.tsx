import { ArrowLeft, Flame } from 'lucide-react';
import type { User } from '../../App';

interface AboutPageProps {
  user: User;
  onNavigate?: (page: string) => void;
}

export function AboutPage({ user, onNavigate }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-[#1E1E1E] pb-24">
      {/* Top App Bar */}
      <div className="px-5 py-4 pt-16 bg-[#2C2C2C] border-b border-[#505050] flex items-center gap-4">
        <button 
          onClick={() => onNavigate?.('home')}
          className="p-2 hover:bg-[#3C3C3C] rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-[#F0F0F0]" />
        </button>
        <h1 className="text-[#F0F0F0] text-[24px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          About Us
        </h1>
      </div>

      <div className="px-5 py-8">
        {/* SIKLAB Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-[#FF4500] to-[#DC143C] rounded-full flex items-center justify-center">
              <Flame className="w-7 h-7 text-white" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-[#FF4500] text-[32px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                SIK
              </span>
              <span className="text-[#FF4500] text-[32px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                LAB
              </span>
            </div>
          </div>
          <p className="text-[#A0A0A0] text-[14px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            About Us
          </p>
        </div>

        {/* About Content */}
        <div className="bg-[#2C2C2C] border border-[#505050] rounded-[16px] p-6">
          <div className="space-y-4 text-[#F0F0F0] text-[15px] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            <p>
              <span className="font-bold text-[#FF4500]">Siklab</span> is a <span className="font-semibold">fire hazard mapping and awareness system</span> designed to help communities stay informed, alert, and safe. Our mission is to <span className="font-semibold">empower residents, responders, and local officials</span> with real-time fire incident reporting, risk mapping, and safety updates — all in one accessible platform.
            </p>
            
            <p>
              Through community collaboration and technology, Siklab aims to <span className="font-semibold">reduce fire-related risks</span> by promoting awareness, improving response times, and encouraging preparedness.
            </p>
            
            <p>
              Whether you're reporting an incident, checking nearby fire hazards, or learning safety tips, Siklab is here to guide and protect you. Together, we can build a <span className="font-bold text-[#FF4500]">safer, more fire-resilient community</span>.
            </p>
          </div>
        </div>

        {/* Mission & Vision Cards */}
        <div className="mt-6 space-y-4">
          {/* Mission */}
          <div className="bg-[#2C2C2C] border border-[#505050] rounded-[16px] p-5">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 bg-[#FF4500]/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Flame className="w-5 h-5 text-[#FF4500]" />
              </div>
              <h2 className="text-[#FF4500] text-[18px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Our Mission
              </h2>
            </div>
            <p className="text-[#F0F0F0] text-[14px] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              To empower communities in Iligan City with accessible, real-time fire hazard information and emergency response tools that save lives and protect property.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-[#2C2C2C] border border-[#505050] rounded-[16px] p-5">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 bg-[#FF4500]/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Flame className="w-5 h-5 text-[#FF4500]" />
              </div>
              <h2 className="text-[#FF4500] text-[18px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Our Vision
              </h2>
            </div>
            <p className="text-[#F0F0F0] text-[14px] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              A fire-resilient Iligan City where every resident has the knowledge, tools, and support needed to prevent, respond to, and recover from fire emergencies.
            </p>
          </div>
        </div>

        {/* Key Features */}
        <div className="mt-6">
          <h2 className="text-[#F0F0F0] text-[18px] font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            What We Offer
          </h2>
          <div className="space-y-3">
            <div className="bg-[#2C2C2C] border border-[#505050] rounded-[12px] p-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#FF4500] rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h3 className="text-[#F0F0F0] text-[15px] font-semibold mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Interactive Fire Hazard Mapping
                  </h3>
                  <p className="text-[#A0A0A0] text-[13px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Real-time visualization of fire incidents and high-risk areas across Iligan City
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#2C2C2C] border border-[#505050] rounded-[12px] p-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#FF4500] rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h3 className="text-[#F0F0F0] text-[15px] font-semibold mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Real-Time Incident Reporting
                  </h3>
                  <p className="text-[#A0A0A0] text-[13px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Quick and easy reporting system for residents to alert authorities of fire emergencies
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#2C2C2C] border border-[#505050] rounded-[12px] p-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#FF4500] rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h3 className="text-[#F0F0F0] text-[15px] font-semibold mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Evacuation Route Visualization
                  </h3>
                  <p className="text-[#A0A0A0] text-[13px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Clear evacuation routes and nearest safe zones for emergency situations
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#2C2C2C] border border-[#505050] rounded-[12px] p-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#FF4500] rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h3 className="text-[#F0F0F0] text-[15px] font-semibold mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Emergency Notifications
                  </h3>
                  <p className="text-[#A0A0A0] text-[13px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Instant alerts and safety updates to keep communities informed and prepared
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-6 bg-gradient-to-br from-[#FF4500]/10 to-[#DC143C]/10 border border-[#FF4500]/30 rounded-[16px] p-5">
          <h2 className="text-[#FF4500] text-[16px] font-bold mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Get In Touch
          </h2>
          <div className="space-y-2">
            <p className="text-[#F0F0F0] text-[14px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              <span className="text-[#A0A0A0]">Email:</span> support@siklab-iligan.ph
            </p>
            <p className="text-[#F0F0F0] text-[14px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              <span className="text-[#A0A0A0]">Emergency Hotline:</span> 911 / 160
            </p>
            <p className="text-[#F0F0F0] text-[14px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              <span className="text-[#A0A0A0]">BFP Iligan:</span> (063) 221-4444
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-[#A0A0A0] text-[12px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Version 1.0.0
          </p>
          <p className="text-[#A0A0A0] text-[12px] mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            © 2024 SIKLAB - Fire Hazard Mapping & Awareness System
          </p>
          <p className="text-[#A0A0A0] text-[11px] mt-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Together, we build a safer, more fire-resilient community.
          </p>
        </div>
      </div>
    </div>
  );
}
