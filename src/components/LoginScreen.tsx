import { useState } from 'react';
import { Flame, ChevronLeft, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { TermsModal } from './TermsModal';
import { mockUsers } from '../lib/mockData';
import type { User } from '../App';

interface LoginScreenProps {
  onBack: () => void;
  onLogin: (user: User) => void;
}

export function LoginScreen({ onBack, onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [error, setError] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      onLogin({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        barangay: user.barangay,
        contactNo: user.contactNo
      });
    } else {
      setError('Invalid email or password');
    }
  };

  if (showForgotPassword) {
    return (
      <div className="relative w-full max-w-[375px] h-[812px] bg-black rounded-[3rem] shadow-2xl overflow-hidden border-[14px] border-black">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[180px] h-[30px] bg-black rounded-b-3xl z-10" />
        <div className="w-full h-full bg-[#1E1E1E] p-6 pt-20">
          <button onClick={() => setShowForgotPassword(false)} className="text-[#A0A0A0] hover:text-[#F0F0F0] mb-8 transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-[#F0F0F0] text-[28px] font-bold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Reset Password
          </h1>
          <p className="text-[#A0A0A0] text-[14px] mb-8" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Enter your email to receive reset instructions
          </p>
          <Input
            type="email"
            placeholder="Email Address"
            className="mb-6 bg-[#2C2C2C] border-[#505050] text-[#F0F0F0] placeholder:text-[#A0A0A0] rounded-[12px] h-14"
          />
          <Button className="w-full bg-[#FF4500] hover:bg-[#FF5722] text-[#F0F0F0] rounded-[12px] h-14 text-[16px] font-semibold"
            style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Send Reset Link
          </Button>
        </div>
      </div>
    );
  }

  if (showSignUp) {
    return (
      <div className="relative w-full max-w-[375px] h-[812px] bg-black rounded-[3rem] shadow-2xl overflow-hidden border-[14px] border-black">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[180px] h-[30px] bg-black rounded-b-3xl z-10" />
        <div className="w-full h-full bg-[#1E1E1E] p-6 pt-20 overflow-y-auto pb-24">
          <button onClick={() => setShowSignUp(false)} className="text-[#A0A0A0] hover:text-[#F0F0F0] mb-8 transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-[#F0F0F0] text-[28px] font-bold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Create Account
          </h1>
          <p className="text-[#A0A0A0] text-[14px] mb-8" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Join SIKLAB to stay fire-ready
          </p>
          <div className="space-y-4">
            <Input placeholder="Full Name" className="bg-[#2C2C2C] border-[#505050] text-[#F0F0F0] rounded-[12px] h-14" />
            <Input type="email" placeholder="Email Address" className="bg-[#2C2C2C] border-[#505050] text-[#F0F0F0] rounded-[12px] h-14" />
            <Input placeholder="Contact Number" className="bg-[#2C2C2C] border-[#505050] text-[#F0F0F0] rounded-[12px] h-14" />
            <select className="w-full h-14 px-4 bg-[#2C2C2C] border border-[#505050] text-[#F0F0F0] rounded-[12px]"
              style={{ fontFamily: 'Montserrat, sans-serif' }}>
              <option>Select Barangay</option>
              <option>Tambacan</option>
              <option>Poblacion</option>
              <option>Saray</option>
            </select>
            <Input type="password" placeholder="Password" className="bg-[#2C2C2C] border-[#505050] text-[#F0F0F0] rounded-[12px] h-14" />
            <Input type="password" placeholder="Confirm Password" className="bg-[#2C2C2C] border-[#505050] text-[#F0F0F0] rounded-[12px] h-14" />
            <Button className="w-full bg-[#FF4500] hover:bg-[#FF5722] text-[#F0F0F0] rounded-[12px] h-14 text-[16px] font-semibold mt-6"
              style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-[375px] h-[812px] bg-black rounded-[3rem] shadow-2xl overflow-hidden border-[14px] border-black">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[180px] h-[30px] bg-black rounded-b-3xl z-10" />
      
      {/* Screen Content */}
      <div className="w-full h-full relative bg-[#1E1E1E] overflow-y-auto pb-24">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-16 left-6 text-[#A0A0A0] hover:text-[#F0F0F0] transition-colors z-20"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        {/* Logo */}
        <div className="pt-28 pb-8 flex flex-col items-center">
          <div className="w-20 h-20 bg-gradient-to-br from-[#FF4500] to-[#DC143C] rounded-[20px] flex items-center justify-center mb-4">
            <Flame className="w-12 h-12 text-[#F0F0F0] fill-[#F0F0F0]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-white tracking-wider text-[32px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>SIK</span>
            <span className="text-[#FF4500] tracking-wider text-[32px] font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>LAB</span>
          </div>
        </div>

        {/* Sign In Form */}
        <div className="px-6">
          <h2 className="text-[#F0F0F0] text-[24px] font-bold mb-8" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Sign In
          </h2>

          <form onSubmit={handleSignIn} className="space-y-6">
            <div>
              <label className="text-[#A0A0A0] text-[14px] mb-2 block font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Email
              </label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#2C2C2C] border-[#505050] text-[#F0F0F0] placeholder:text-[#A0A0A0] rounded-[12px] h-14"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              />
            </div>
            <div>
              <label className="text-[#A0A0A0] text-[14px] mb-2 block font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-[#2C2C2C] border-[#505050] text-[#F0F0F0] placeholder:text-[#A0A0A0] rounded-[12px] h-14 pr-12"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A0A0A0] hover:text-[#F0F0F0]"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            {error && (
              <p className="text-[#DC143C] text-[14px] text-center bg-[#DC143C]/10 p-3 rounded-[8px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {error}
              </p>
            )}
            
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="text-[#FF4500] text-[14px] hover:underline font-medium"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Forgot Password?
            </button>
            
            <Button
              type="submit"
              className="w-full bg-[#FF4500] hover:bg-[#FF5722] text-[#F0F0F0] rounded-[12px] h-14 shadow-lg text-[16px] font-semibold"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Log In
            </Button>
            
            <div className="text-center">
              <span className="text-[#A0A0A0] text-[14px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Don't have an account?{' '}
              </span>
              <button
                type="button"
                onClick={() => setShowSignUp(true)}
                className="text-[#FF4500] text-[14px] hover:underline font-semibold"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="text-center text-[#A0A0A0] text-[12px] mt-8" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            By continuing, you agree to our{' '}
            <button onClick={() => setShowTerms(true)} className="text-[#FF4500] hover:underline">
              Terms of Service
            </button>
            {' '}and{' '}
            <button onClick={() => setShowTerms(true)} className="text-[#FF4500] hover:underline">
              Privacy Policy
            </button>
          </p>
        </div>
      </div>

      {/* Terms Modal */}
      <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
    </div>
  );
}