export interface Train {
  id: string;
  number: string;
  name: string;
  status: 'on-time' | 'delayed' | 'on-track';
  currentSection: string;
  nextSection?: string;
  delay: number; // in minutes
  speed: number; // km/h
  passengers: number;
  route: string[];
  scheduledArrival: string;
  estimatedArrival: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  type: 'express' | 'passenger' | 'goods';
}

export interface Section {
  id: string;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  currentTrains: Train[];
  incomingTrains: Train[];
  capacity: number;
  utilization: number;
  signals: Signal[];
  tracks: Track[];
}

export interface Signal {
  id: string;
  name: string;
  status: 'green' | 'red' | 'yellow';
  position: {
    lat: number;
    lng: number;
  };
  lastUpdated: string;
}

export interface Track {
  id: string;
  name: string;
  status: 'active' | 'maintenance' | 'blocked';
  length: number; // in km
  maxSpeed: number; // km/h
}

export interface KPI {
  punctuality: number;
  averageDelay: number;
  throughput: number;
  utilization: number;
  efficiency: number;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  event: string;
  trainId?: string;
  sectionId?: string;
  user: string;
  action: string;
  details: string;
}

export interface AIRecommendation {
  id: string;
  type: 'reroute' | 'delay' | 'speed_adjustment' | 'signal_change';
  priority: 'high' | 'medium' | 'low';
  trainId: string;
  sectionId: string;
  recommendation: string;
  reasoning: string;
  impact: string;
  confidence: number;
  estimatedSavings: {
    time: number;
    fuel: number;
  };
}