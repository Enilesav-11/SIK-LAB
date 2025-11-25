import { Bell, AlertTriangle, CheckCircle, Shield, BookOpen, Map } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import type { User } from '../../App';
import { mockNews, safetyTips } from '../../lib/mockData';

interface StayUpdatedProps {
  user: User;
}

export function StayUpdated({ user }: StayUpdatedProps) {
  const getRiskLevel = (barangay: string) => {
    if (barangay === 'Tambacan' || barangay === 'Saray') return { level: 'HIGH', color: 'red' };
    if (barangay === 'Poblacion') return { level: 'MEDIUM', color: 'orange' };
    return { level: 'LOW', color: 'green' };
  };

  const risk = getRiskLevel(user.barangay);

  return (
    <div className="p-6 space-y-6 pt-12 pb-24 min-h-full">
      <div>
        <h1 className="text-white mb-2">Stay Updated & Safe</h1>
        <p className="text-sm text-white/80">Fire safety information and community updates</p>
      </div>

      {/* Area Status */}
      <Card className={`p-4 ${risk.color === 'red' ? 'bg-red-500/20 backdrop-blur-sm border-red-300/30' : risk.color === 'orange' ? 'bg-orange-500/20 backdrop-blur-sm border-orange-300/30' : 'bg-green-500/20 backdrop-blur-sm border-green-300/30'}`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm text-white">Your Area Status</h3>
          <Badge className={`${risk.color === 'red' ? 'bg-red-600' : risk.color === 'orange' ? 'bg-orange-600' : 'bg-green-600'}`}>{risk.level} RISK</Badge>
        </div>
        <p className="text-xs text-white/80">
          {user.barangay} - Based on recent incidents, housing density, and fire safety infrastructure.
        </p>
      </Card>

      {/* Community Newsfeed */}
      <div>
        <h3 className="text-sm text-white mb-3">Community News & Alerts</h3>
        <div className="space-y-3">
          {mockNews.map((news) => (
            <Card key={news.id} className="p-4 bg-white/10 backdrop-blur-sm border-white/20">
              <div className="flex items-start gap-3">
                {news.type === 'incident' && (
                  <AlertTriangle className="w-5 h-5 text-red-300 flex-shrink-0" />
                )}
                {news.type === 'resolved' && (
                  <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                )}
                {news.type === 'advisory' && (
                  <Bell className="w-5 h-5 text-blue-300 flex-shrink-0" />
                )}
                {news.type === 'training' && (
                  <BookOpen className="w-5 h-5 text-purple-300 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm text-white mb-1">{news.title}</h4>
                  <p className="text-xs text-white/80 mb-2">{news.content}</p>
                  <p className="text-xs text-white/60">{news.date}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Safety Tips & Awareness */}
      <div>
        <h3 className="text-sm text-white mb-3">Fire Safety & Awareness</h3>
        <div className="space-y-3">
          {safetyTips.map((tip) => (
            <Card key={tip.id} className="p-4 bg-white/10 backdrop-blur-sm border-white/20">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-white flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm text-white mb-1">{tip.title}</h4>
                  <p className="text-xs text-white/80">{tip.content}</p>
                  <Badge className="mt-2 bg-white/20 backdrop-blur-sm text-white text-xs border border-white/30">
                    {tip.category}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Emergency Contacts */}
      <Card className="p-4 bg-white/10 backdrop-blur-sm border-white/20">
        <h3 className="text-sm text-white mb-3">Emergency Hotlines</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center p-2 bg-black/20 backdrop-blur-sm rounded">
            <span className="text-sm text-white/70">Fire Emergency</span>
            <span className="text-sm text-white">911 / 160</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-black/20 backdrop-blur-sm rounded">
            <span className="text-sm text-white/70">BFP Iligan</span>
            <span className="text-sm text-white">(063) 221-4444</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-black/20 backdrop-blur-sm rounded">
            <span className="text-sm text-white/70">CDRRMO</span>
            <span className="text-sm text-white">(063) 221-5555</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-black/20 backdrop-blur-sm rounded">
            <span className="text-sm text-white/70">Barangay Hall</span>
            <span className="text-sm text-white">(063) 221-6666</span>
          </div>
        </div>
      </Card>
    </div>
  );
}