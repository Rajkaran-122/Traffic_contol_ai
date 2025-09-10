import { Train, Section, Signal, Track, KPI, AuditLog, AIRecommendation } from './types';

export const mockTrains: Train[] = [
  {
    id: '1',
    number: '12302',
    name: 'Rajdhani Express',
    status: 'on-time',
    currentSection: 'NDLS-GZB',
    nextSection: 'GZB-CNB',
    delay: 0,
    speed: 110,
    passengers: 1200,
    route: ['NDLS', 'GZB', 'CNB', 'JHS', 'BPL', 'ET', 'NGP', 'BZA', 'MAS'],
    scheduledArrival: '14:30',
    estimatedArrival: '14:30',
    coordinates: { lat: 28.6448, lng: 77.216 },
    type: 'express',
  },
  {
    id: '2',
    number: '18448',
    name: 'Hirakud Express',
    status: 'delayed',
    currentSection: 'BBS-CTC',
    nextSection: 'CTC-JJKR',
    delay: 25,
    speed: 95,
    passengers: 980,
    route: ['BBS', 'CTC', 'JJKR', 'ROU', 'JSG', 'RIG', 'CPH'],
    scheduledArrival: '16:15',
    estimatedArrival: '16:40',
    coordinates: { lat: 20.2961, lng: 85.8245 },
    type: 'express',
  },
  {
    id: '3',
    number: '56473',
    name: 'Local Passenger',
    status: 'on-track',
    currentSection: 'LTT-TNA',
    nextSection: 'TNA-KYN',
    delay: 5,
    speed: 45,
    passengers: 650,
    route: ['LTT', 'TNA', 'KYN', 'DR', 'CSMT'],
    scheduledArrival: '17:45',
    estimatedArrival: '17:50',
    coordinates: { lat: 19.0728, lng: 72.8826 },
    type: 'passenger',
  },
];

export const mockSections: Section[] = [
  {
    id: 'NDLS-GZB',
    name: 'New Delhi - Ghaziabad',
    coordinates: { lat: 28.6448, lng: 77.316 },
    currentTrains: [mockTrains[0]],
    incomingTrains: [],
    capacity: 8,
    utilization: 65,
    signals: [
      {
        id: 'SIG001',
        name: 'NDLS Outer Signal',
        status: 'green',
        position: { lat: 28.6448, lng: 77.216 },
        lastUpdated: '2024-01-15T14:25:00Z',
      },
    ],
    tracks: [
      {
        id: 'TRK001',
        name: 'Main Line UP',
        status: 'active',
        length: 22.5,
        maxSpeed: 130,
      },
    ],
  },
  {
    id: 'BBS-CTC',
    name: 'Bhubaneswar - Cuttack',
    coordinates: { lat: 20.2961, lng: 85.8245 },
    currentTrains: [mockTrains[1]],
    incomingTrains: [],
    capacity: 6,
    utilization: 45,
    signals: [
      {
        id: 'SIG002',
        name: 'BBS Junction Signal',
        status: 'yellow',
        position: { lat: 20.2961, lng: 85.8245 },
        lastUpdated: '2024-01-15T14:20:00Z',
      },
    ],
    tracks: [
      {
        id: 'TRK002',
        name: 'Main Line',
        status: 'active',
        length: 28.8,
        maxSpeed: 110,
      },
    ],
  },
];

export const mockKPIs: KPI = {
  punctuality: 87.5,
  averageDelay: 12.3,
  throughput: 145,
  utilization: 72.1,
  efficiency: 89.2,
};

export const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    timestamp: '2024-01-15T14:30:00Z',
    event: 'Signal Changed',
    trainId: '12302',
    sectionId: 'NDLS-GZB',
    user: 'Controller A',
    action: 'Manual Override',
    details: 'Changed signal from yellow to green for platform clearance',
  },
  {
    id: '2',
    timestamp: '2024-01-15T14:25:00Z',
    event: 'Train Rerouted',
    trainId: '18448',
    sectionId: 'BBS-CTC',
    user: 'AI System',
    action: 'Automatic Reroute',
    details: 'Rerouted via loop line due to track maintenance',
  },
  {
    id: '3',
    timestamp: '2024-01-15T14:20:00Z',
    event: 'Track Maintenance',
    sectionId: 'LTT-TNA',
    user: 'Controller B',
    action: 'Status Update',
    details: 'Marked Track 2 as under maintenance for 2 hours',
  },
];

export const mockAIRecommendations: AIRecommendation[] = [
  {
    id: '1',
    type: 'reroute',
    priority: 'high',
    trainId: '18448',
    sectionId: 'BBS-CTC',
    recommendation: 'Reroute via Paradip-Haridaspur line',
    reasoning: 'Main line congestion detected. Alternative route available with 15min time saving.',
    impact: 'Reduce delay by 20 minutes, improve section utilization by 15%',
    confidence: 92,
    estimatedSavings: {
      time: 20,
      fuel: 150,
    },
  },
  {
    id: '2',
    type: 'speed_adjustment',
    priority: 'medium',
    trainId: '12302',
    sectionId: 'NDLS-GZB',
    recommendation: 'Reduce speed to 95 km/h for next 12 km',
    reasoning: 'Signal timing optimization to avoid stop at next junction.',
    impact: 'Maintain schedule while reducing fuel consumption by 8%',
    confidence: 85,
    estimatedSavings: {
      time: 0,
      fuel: 75,
    },
  },
];

export const chartData = {
  punctuality: [
    { month: 'Jan', value: 85.2 },
    { month: 'Feb', value: 87.1 },
    { month: 'Mar', value: 86.8 },
    { month: 'Apr', value: 88.5 },
    { month: 'May', value: 87.9 },
    { month: 'Jun', value: 89.2 },
  ],
  throughput: [
    { hour: '00', trains: 12 },
    { hour: '04', trains: 8 },
    { hour: '08', trains: 24 },
    { hour: '12', trains: 32 },
    { hour: '16', trains: 28 },
    { hour: '20', trains: 20 },
  ],
  delays: [
    { range: '0-5min', count: 145 },
    { range: '5-15min', count: 89 },
    { range: '15-30min', count: 34 },
    { range: '30-60min', count: 12 },
    { range: '60+min', count: 5 },
  ],
};