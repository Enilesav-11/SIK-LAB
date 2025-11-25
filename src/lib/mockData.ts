export interface FireIncident {
  id: string;
  location: string;
  barangay: string;
  purok: string;
  description: string;
  reportedBy: string;
  reportedAt: string;
  status: 'pending' | 'active' | 'resolved';
  severity: 'low' | 'medium' | 'high';
  lat: number;
  lng: number;
  imageUrl?: string;
}

export interface HazardReport {
  id: string;
  location: string;
  barangay: string;
  type: 'electrical' | 'structural' | 'gas' | 'other';
  severity: 'low' | 'medium' | 'high';
  description: string;
  reportedBy: string;
  reportedAt: string;
  status: 'pending' | 'validated' | 'resolved' | 'rejected';
  lat: number;
  lng: number;
  imageUrl?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'advisory' | 'incident' | 'resolved' | 'training';
}

export const mockUsers = [
  {
    id: '1',
    name: 'Juan Dela Cruz',
    email: 'juan@resident.com',
    password: 'resident123',
    role: 'resident' as const,
    barangay: 'Tambacan',
    contactNo: '09123456789'
  },
  {
    id: '2',
    name: 'Fire Officer Santos',
    email: 'santos@bfp.gov.ph',
    password: 'bfp123',
    role: 'bfp' as const,
    barangay: 'Iligan City',
    contactNo: '09987654321'
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@siklab.gov.ph',
    password: 'admin123',
    role: 'admin' as const,
    barangay: 'System',
    contactNo: '09111222333'
  }
];

export const mockFireIncidents: FireIncident[] = [
  {
    id: 'FI001',
    location: 'Purok 9-A, near Sari-Sari Store',
    barangay: 'Tambacan',
    purok: 'Purok 9-A',
    description: 'House fire caused by ceiling fan explosion. Heavy smoke, multiple families affected.',
    reportedBy: 'Maria Santos',
    reportedAt: 'Today at 8:30 AM',
    status: 'active',
    severity: 'high',
    lat: 8.2280,
    lng: 124.2453,
    imageUrl: 'https://images.unsplash.com/photo-1639369488374-561b5486177d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMGZpcmUlMjBzbW9rZXxlbnwxfHx8fDE3NjMxMzY0NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 'FI002',
    location: 'Purok 3, Residential area',
    barangay: 'Poblacion',
    purok: 'Purok 3',
    description: 'Kitchen fire from unattended cooking. Contained by residents before BFP arrival.',
    reportedBy: 'Carlos Fernandez',
    reportedAt: 'This Week - Nov 20 7:15 PM',
    status: 'resolved',
    severity: 'medium',
    lat: 8.2285,
    lng: 124.2458,
    imageUrl: 'https://images.unsplash.com/photo-1664514931261-bc519a436078?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJlJTIwZmxhbWVzJTIwc21va2V8ZW58MXx8fHwxNzYzMTM2NDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 'FI003',
    location: 'Purok 6, Corner Store',
    barangay: 'Saray',
    purok: 'Purok 6',
    description: 'Electrical short circuit. Fire suppressed quickly. No casualties.',
    reportedBy: 'Angela Lopez',
    reportedAt: 'This Month - Nov 5 11:45 AM',
    status: 'resolved',
    severity: 'low',
    lat: 8.2275,
    lng: 124.2447,
    imageUrl: 'https://images.unsplash.com/photo-1516567832553-66232148f74c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJuaW5nJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYzMTM2NDQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 'FI004',
    location: 'Purok 4, Apartment Complex',
    barangay: 'Tambacan',
    purok: 'Purok 4',
    description: 'Candle left unattended. Minor fire damage, residents evacuated safely.',
    reportedBy: 'Jose Ramirez',
    reportedAt: 'This Week - Nov 19 9:00 PM',
    status: 'pending',
    severity: 'medium',
    lat: 8.2290,
    lng: 124.2460
  },
  {
    id: 'FI005',
    location: 'Purok 1, Two-story house',
    barangay: 'Poblacion',
    purok: 'Purok 1',
    description: 'Grass fire spreading to nearby houses. Emergency response ongoing.',
    reportedBy: 'Pedro Cruz',
    reportedAt: 'Today at 2:30 PM',
    status: 'active',
    severity: 'high',
    lat: 8.2295,
    lng: 124.2465
  },
  {
    id: 'FI006',
    location: 'Purok 8, Market area',
    barangay: 'Tambacan',
    purok: 'Purok 8',
    description: 'Small trash fire reported. Assessment needed.',
    reportedBy: 'Linda Garcia',
    reportedAt: 'Today at 10:15 AM',
    status: 'pending',
    severity: 'low',
    lat: 8.2272,
    lng: 124.2445
  },
  {
    id: 'FI007',
    location: 'Purok 2, School vicinity',
    barangay: 'Saray',
    purok: 'Purok 2',
    description: 'Smoke from burning garbage. Awaiting verification.',
    reportedBy: 'Ramon Diaz',
    reportedAt: 'This Week - Nov 21 1:20 PM',
    status: 'pending',
    severity: 'high',
    lat: 8.2268,
    lng: 124.2442
  },
  {
    id: 'FI008',
    location: 'Purok 5, Commercial building',
    barangay: 'Poblacion',
    purok: 'Purok 5',
    description: 'Fire alarm triggered. Needs immediate inspection.',
    reportedBy: 'Sandra Martinez',
    reportedAt: 'Today at 9:45 AM',
    status: 'active',
    severity: 'medium',
    lat: 8.2292,
    lng: 124.2462
  },
  {
    id: 'FI009',
    location: 'Purok 7, Gas station area',
    barangay: 'Tambacan',
    purok: 'Purok 7',
    description: 'Small vehicle fire extinguished. Cleanup completed.',
    reportedBy: 'Tommy Reyes',
    reportedAt: 'This Month - Nov 8 6:30 PM',
    status: 'resolved',
    severity: 'high',
    lat: 8.2298,
    lng: 124.2468
  }
];

export const mockHazardReports: HazardReport[] = [
  {
    id: 'HR001',
    location: 'Purok 5, near basketball court',
    barangay: 'Tambacan',
    type: 'electrical',
    severity: 'high',
    description: 'Tangled electrical wires hanging low, touching metal roofs. Risk of electrocution and fire.',
    reportedBy: 'Roberto Santos',
    reportedAt: 'This Week - Nov 20 3:00 PM',
    status: 'pending',
    lat: 8.2282,
    lng: 124.2450,
    imageUrl: 'https://images.unsplash.com/photo-1713937400833-f817938b51e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwd2lyZXMlMjBoYXphcmR8ZW58MXx8fHwxNzYzMTM1OTI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 'HR002',
    location: 'Purok 9, alley entrance',
    barangay: 'Tambacan',
    type: 'structural',
    severity: 'medium',
    description: 'Blocked evacuation route with stored materials. Fire trucks cannot access this area.',
    reportedBy: 'Elena Cruz',
    reportedAt: 'This Month - Nov 12 10:30 AM',
    status: 'validated',
    lat: 8.2278,
    lng: 124.2452,
    imageUrl: 'https://images.unsplash.com/photo-1722305283808-c5403873a17d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2VkJTIwYWxsZXklMjBnYXJiYWdlfGVufDF8fHx8MTc2MzEzNTkyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 'HR003',
    location: 'Purok 7, residential area',
    barangay: 'Poblacion',
    type: 'gas',
    severity: 'high',
    description: 'Multiple households storing LPG tanks outdoors under direct sunlight.',
    reportedBy: 'Miguel Torres',
    reportedAt: 'Today at 8:00 AM',
    status: 'pending',
    lat: 8.2288,
    lng: 124.2458,
    imageUrl: 'https://images.unsplash.com/photo-1668257790461-282ee6da6aa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxscGclMjBnYXMlMjB0YW5rc3xlbnwxfHx8fDE3NjMxMzU5MjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 'HR004',
    location: 'Purok 2, near chapel',
    barangay: 'Saray',
    type: 'electrical',
    severity: 'high',
    description: 'Illegal electrical connections, overloaded power lines',
    reportedBy: 'Carmen Diaz',
    reportedAt: 'This Month - Nov 11 2:45 PM',
    status: 'resolved',
    lat: 8.2292,
    lng: 124.2462,
    imageUrl: 'https://images.unsplash.com/photo-1724219836861-cd8ab3c03cd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbGxlZ2FsJTIwZWxlY3RyaWNhbCUyMGNvbm5lY3Rpb258ZW58MXx8fHwxNzYzMTM1OTI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 'HR005',
    location: 'Purok 8, main street',
    barangay: 'Poblacion',
    type: 'other',
    severity: 'medium',
    description: 'Regular burning of trash and dry leaves creating fire risk',
    reportedBy: 'Luis Ramos',
    reportedAt: 'This Week - Nov 21 11:15 AM',
    status: 'validated',
    lat: 8.2286,
    lng: 124.2456,
    imageUrl: 'https://images.unsplash.com/photo-1761847877200-46de510257ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFzaCUyMGJ1cm5pbmclMjBzbW9rZXxlbnwxfHx8fDE3NjMxMzU5MjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 'HR006',
    location: 'Purok 3, warehouse district',
    barangay: 'Tambacan',
    type: 'structural',
    severity: 'high',
    description: 'Old wooden building with damaged roof and exposed wires. High fire risk.',
    reportedBy: 'Maria Lopez',
    reportedAt: 'Today at 9:30 AM',
    status: 'pending',
    lat: 8.2276,
    lng: 124.2448
  },
  {
    id: 'HR007',
    location: 'Purok 4, market area',
    barangay: 'Saray',
    type: 'gas',
    severity: 'medium',
    description: 'Improper LPG storage near cooking area in market stalls.',
    reportedBy: 'Roberto Cruz',
    reportedAt: 'This Month - Nov 12 3:20 PM',
    status: 'resolved',
    lat: 8.2284,
    lng: 124.2454
  },
  {
    id: 'HR008',
    location: 'Purok 6, residential zone',
    barangay: 'Poblacion',
    type: 'other',
    severity: 'low',
    description: 'Overgrown vegetation near electrical posts. Minor trimming needed.',
    reportedBy: 'Ana Santos',
    reportedAt: 'Today at 11:00 AM',
    status: 'pending',
    lat: 8.2290,
    lng: 124.2460
  }
];

export const mockNews: NewsItem[] = [
  {
    id: 'N001',
    title: 'BFP Advisory: Fire Prevention Month',
    content: 'The Bureau of Fire Protection reminds all residents to practice fire safety. Check your electrical connections and keep fire extinguishers accessible.',
    date: '2025-11-14',
    type: 'advisory'
  },
  {
    id: 'N002',
    title: 'Fire Incident Resolved in Purok 2',
    content: 'Thanks to the quick response of residents and the fire brigade, the incident in Purok 2 was contained with minimal damage.',
    date: '2025-11-13',
    type: 'resolved'
  },
  {
    id: 'N003',
    title: 'Active Fire in Tambacan Purok 9-A',
    content: 'Fire units are currently responding to a house fire in Purok 9-A. Residents advised to stay clear of the area.',
    date: '2025-11-14',
    type: 'incident'
  },
  {
    id: 'N004',
    title: 'Fire Safety Training Schedule',
    content: 'Community fire brigade training will be held on November 20 at the Barangay Hall. All purok presidents are encouraged to attend.',
    date: '2025-11-12',
    type: 'training'
  }
];

export const fireProneAreas = [
  { barangay: 'Tambacan', purok: 'Purok 9-A', riskLevel: 'high', lat: 8.2280, lng: 124.2453 },
  { barangay: 'Tambacan', purok: 'Purok 7-A', riskLevel: 'high', lat: 8.2277, lng: 124.2451 },
  { barangay: 'Tambacan', purok: 'Purok 6-A', riskLevel: 'high', lat: 8.2274, lng: 124.2449 },
  { barangay: 'Tambacan', purok: 'Purok 2', riskLevel: 'high', lat: 8.2275, lng: 124.2448 },
  { barangay: 'Poblacion', purok: 'Purok 7', riskLevel: 'high', lat: 8.2290, lng: 124.2460 },
  { barangay: 'Poblacion', purok: 'Purok 8', riskLevel: 'medium', lat: 8.2285, lng: 124.2455 },
  { barangay: 'Saray', purok: 'Purok 1', riskLevel: 'high', lat: 8.2295, lng: 124.2465 },
  { barangay: 'Saray', purok: 'Purok 2', riskLevel: 'high', lat: 8.2292, lng: 124.2462 },
];

export const evacuationCenters = [
  { name: 'Tambacan Barangay Hall', barangay: 'Tambacan', capacity: 200, lat: 8.2276, lng: 124.2450 },
  { name: 'Tambacan Gym', barangay: 'Tambacan', capacity: 350, lat: 8.2279, lng: 124.2454 },
  { name: 'Poblacion Barangay Hall', barangay: 'Poblacion', capacity: 250, lat: 8.2287, lng: 124.2457 },
  { name: 'Poblacion Gym', barangay: 'Poblacion', capacity: 400, lat: 8.2291, lng: 124.2461 },
  { name: 'Saray Elementary School', barangay: 'Saray', capacity: 500, lat: 8.2293, lng: 124.2463 },
  { name: 'Saray Barangay Gym', barangay: 'Saray', capacity: 300, lat: 8.2296, lng: 124.2466 },
];

export const fireStations = [
  { name: 'Iligan City Fire Station', location: 'City Center', lat: 8.2283, lng: 124.2451, units: 5 },
  { name: 'BFP Sub-Station Tambacan', location: 'Tambacan', lat: 8.2278, lng: 124.2452, units: 2 },
];

export const waterSources = [
  { type: 'Fire Hydrant', location: 'Tambacan Barangay Hall', lat: 8.2276, lng: 124.2450 },
  { type: 'Fire Hydrant', location: 'Main Road Junction', lat: 8.2284, lng: 124.2454 },
  { type: 'Water Source', location: 'Bay Area', lat: 8.2270, lng: 124.2445 },
  { type: 'Water Source', location: 'Canal System', lat: 8.2281, lng: 124.2453 },
];

export const safetyTips = [
  {
    id: 'tip1',
    title: 'Emergency Evacuation Plan',
    category: 'evacuation',
    content: 'Know your evacuation routes and assembly points. Practice family fire drills regularly.'
  },
  {
    id: 'tip2',
    title: 'Home Fire Prevention Tips',
    category: 'prevention',
    content: 'Never leave candles unattended. Check electrical wiring regularly. Store LPG tanks in well-ventilated areas.'
  },
  {
    id: 'tip3',
    title: 'What to Do During a Fire',
    category: 'response',
    content: 'Stay low to avoid smoke. Call 911/160/161 immediately. Never go back inside a burning building.'
  },
  {
    id: 'tip4',
    title: 'Fire Extinguisher Use',
    category: 'equipment',
    content: 'Remember PASS: Pull, Aim, Squeeze, Sweep. Keep extinguishers accessible and maintained.'
  }
];