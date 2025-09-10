'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/ui/status-badge';
import { Switch } from '@/components/ui/switch';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Zap,
  Settings,
  Activity,
  AlertTriangle,
  CheckCircle,
  WifiOff,
  Wrench,
  Power,
} from 'lucide-react';
import { mockSections } from '@/lib/mock-data';

interface SystemComponent {
  id: string;
  name: string;
  type: 'signal' | 'track' | 'power' | 'communication';
  status: 'active' | 'maintenance' | 'error' | 'offline';
  location: string;
  lastCheck: string;
  autoMode: boolean;
}

const systemComponents: SystemComponent[] = [
  {
    id: 'SIG001',
    name: 'NDLS Outer Signal',
    type: 'signal',
    status: 'active',
    location: 'New Delhi Station - Platform 1',
    lastCheck: '2 minutes ago',
    autoMode: true,
  },
  {
    id: 'SIG002',
    name: 'GZB Junction Signal',
    type: 'signal',
    status: 'maintenance',
    location: 'Ghaziabad Junction - Main Line',
    lastCheck: '15 minutes ago',
    autoMode: false,
  },
  {
    id: 'TRK001',
    name: 'Main Line UP Track',
    type: 'track',
    status: 'active',
    location: 'NDLS-GZB Section',
    lastCheck: '1 minute ago',
    autoMode: true,
  },
  {
    id: 'PWR001',
    name: 'Traction Power Supply',
    type: 'power',
    status: 'active',
    location: 'Substation A',
    lastCheck: '30 seconds ago',
    autoMode: true,
  },
  {
    id: 'COM001',
    name: 'Communication Tower',
    type: 'communication',
    status: 'error',
    location: 'Control Center',
    lastCheck: '5 minutes ago',
    autoMode: true,
  },
];

export default function SystemsStatus() {
  const [components, setComponents] = useState(systemComponents);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'maintenance':
        return <Wrench className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'offline':
        return <WifiOff className="w-4 h-4 text-gray-500" />;
      default:
        return <Activity className="w-4 h-4 text-blue-500" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'signal':
        return <Zap className="w-4 h-4" />;
      case 'track':
        return <Activity className="w-4 h-4" />;
      case 'power':
        return <Power className="w-4 h-4" />;
      case 'communication':
        return <Settings className="w-4 h-4" />;
      default:
        return <Settings className="w-4 h-4" />;
    }
  };

  const toggleAutoMode = (componentId: string) => {
    setComponents(components.map(comp => 
      comp.id === componentId 
        ? { ...comp, autoMode: !comp.autoMode }
        : comp
    ));
  };

  const changeComponentStatus = (componentId: string, newStatus: string) => {
    setComponents(components.map(comp => 
      comp.id === componentId 
        ? { ...comp, status: newStatus as any, lastCheck: 'Just now' }
        : comp
    ));
  };

  const statusCounts = components.reduce((acc, comp) => {
    acc[comp.status] = (acc[comp.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Systems Status</h1>
          <p className="text-muted-foreground">
            Monitor and control railway infrastructure systems
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
            {statusCounts.active || 0} Active
          </Badge>
          {statusCounts.error > 0 && (
            <Badge variant="outline" className="bg-red-500/20 text-red-400 border-red-500/30">
              <AlertTriangle className="w-3 h-3 mr-1" />
              {statusCounts.error} Errors
            </Badge>
          )}
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-foreground">{statusCounts.active || 0}</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Wrench className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold text-foreground">{statusCounts.maintenance || 0}</p>
                <p className="text-sm text-muted-foreground">Maintenance</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-2xl font-bold text-foreground">{statusCounts.error || 0}</p>
                <p className="text-sm text-muted-foreground">Errors</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <WifiOff className="w-8 h-8 text-gray-500" />
              <div>
                <p className="text-2xl font-bold text-foreground">{statusCounts.offline || 0}</p>
                <p className="text-sm text-muted-foreground">Offline</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Components */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Components List */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="w-5 h-5 mr-2 text-primary" />
              System Components
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {components.map((component) => (
              <div key={component.id} className="p-4 bg-accent/10 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      {getTypeIcon(component.type)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{component.name}</p>
                      <p className="text-sm text-muted-foreground">{component.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(component.status)}
                    <StatusBadge status={component.status} />
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">
                    Last checked: {component.lastCheck}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Auto Mode:</span>
                    <Switch
                      checked={component.autoMode}
                      onCheckedChange={() => toggleAutoMode(component.id)}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {component.status === 'maintenance' && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          Mark Active
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Mark Component as Active</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to mark {component.name} as active? 
                            Ensure all maintenance work is completed.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => changeComponentStatus(component.id, 'active')}
                          >
                            Confirm
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}

                  {component.status === 'active' && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          Schedule Maintenance
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Schedule Maintenance</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will mark {component.name} as under maintenance. 
                            Traffic control will be affected.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => changeComponentStatus(component.id, 'maintenance')}
                          >
                            Confirm
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}

                  {component.status === 'error' && (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => changeComponentStatus(component.id, 'active')}
                    >
                      Reset
                    </Button>
                  )}

                  <Button size="sm" variant="ghost">
                    View Logs
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* System Schematic */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2 text-primary" />
              Network Schematic
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 h-96">
              <svg width="100%" height="100%" viewBox="0 0 400 300" className="overflow-visible">
                {/* Track Lines */}
                <line x1="50" y1="150" x2="350" y2="150" stroke="#4a5568" strokeWidth="6" />
                <line x1="50" y1="100" x2="350" y2="100" stroke="#4a5568" strokeWidth="4" />
                <line x1="50" y1="200" x2="350" y2="200" stroke="#4a5568" strokeWidth="4" />

                {/* Stations */}
                <rect x="75" y="85" width="50" height="30" fill="#1a2d5a" stroke="#ffcc00" strokeWidth="2" rx="3" />
                <text x="100" y="105" textAnchor="middle" fill="#ffffff" fontSize="10">NDLS</text>

                <rect x="275" y="85" width="50" height="30" fill="#1a2d5a" stroke="#ffcc00" strokeWidth="2" rx="3" />
                <text x="300" y="105" textAnchor="middle" fill="#ffffff" fontSize="10">GZB</text>

                {/* Signals */}
                <circle cx="140" cy="150" r="8" fill="#10b981" className="signal-green" />
                <text x="140" y="175" textAnchor="middle" fill="#10b981" fontSize="8">SIG001</text>

                <circle cx="260" cy="150" r="8" fill="#eab308" className="signal-yellow" />
                <text x="260" y="175" textAnchor="middle" fill="#eab308" fontSize="8">SIG002</text>

                {/* Power Supply */}
                <rect x="180" y="50" width="40" height="30" fill="#3b82f6" stroke="#ffffff" strokeWidth="1" rx="2" />
                <text x="200" y="70" textAnchor="middle" fill="#ffffff" fontSize="8">PWR</text>

                {/* Communication Tower */}
                <line x1="350" y1="50" x2="350" y2="80" stroke="#ffffff" strokeWidth="3" />
                <line x1="345" y1="55" x2="355" y2="55" stroke="#ffffff" strokeWidth="2" />
                <line x1="347" y1="60" x2="353" y2="60" stroke="#ffffff" strokeWidth="2" />
                <text x="350" y="95" textAnchor="middle" fill="#ffffff" fontSize="8">COM</text>

                {/* Status Indicators */}
                <circle cx="380" cy="100" r="4" fill="#10b981" />
                <circle cx="380" cy="115" r="4" fill="#eab308" />
                <circle cx="380" cy="130" r="4" fill="#ef4444" />

                <text x="370" y="105" textAnchor="end" fill="#ffffff" fontSize="8">Active</text>
                <text x="370" y="120" textAnchor="end" fill="#ffffff" fontSize="8">Maintenance</text>
                <text x="370" y="135" textAnchor="end" fill="#ffffff" fontSize="8">Error</text>
              </svg>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}