'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/ui/status-badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  MapPin,
  Search,
  Layers,
  ZoomIn,
  ZoomOut,
  Train,
  Navigation,
  Filter,
} from 'lucide-react';
import { mockTrains, mockSections } from '@/lib/mock-data';
import Link from 'next/link';

export default function MapView() {
  const [selectedTrain, setSelectedTrain] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleTrainClick = (trainId: string) => {
    setSelectedTrain(trainId === selectedTrain ? null : trainId);
  };

  const selectedTrainData = mockTrains.find(train => train.id === selectedTrain);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Network Map</h1>
          <p className="text-muted-foreground">
            Real-time train positions and route monitoring
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Search sections..." className="pl-10 w-48" />
          </div>
          <Select>
            <SelectTrigger className="w-32">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Trains</SelectItem>
              <SelectItem value="delayed">Delayed</SelectItem>
              <SelectItem value="on-time">On Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Container */}
        <div className="lg:col-span-2">
          <Card className="bg-card border-border h-[600px] relative">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">Interactive Network Map</CardTitle>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setZoomLevel(Math.min(zoomLevel + 0.2, 2))}
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setZoomLevel(Math.max(zoomLevel - 0.2, 0.5))}
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <Badge variant="outline">{Math.round(zoomLevel * 100)}%</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0 h-full">
              {/* Mock Map with SVG */}
              <div className="relative w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 800 500"
                  style={{ transform: `scale(${zoomLevel})` }}
                  className="transition-transform duration-300"
                >
                  {/* Railway Tracks */}
                  <defs>
                    <pattern
                      id="tracks"
                      patternUnits="userSpaceOnUse"
                      width="20"
                      height="4"
                    >
                      <rect width="20" height="2" fill="#4a5568" />
                      <rect y="2" width="20" height="2" fill="none" />
                    </pattern>
                  </defs>
                  
                  {/* Main track lines */}
                  <line x1="50" y1="100" x2="750" y2="100" stroke="#4a5568" strokeWidth="8" />
                  <line x1="50" y1="200" x2="750" y2="200" stroke="#4a5568" strokeWidth="8" />
                  <line x1="50" y1="300" x2="750" y2="300" stroke="#4a5568" strokeWidth="8" />
                  
                  {/* Junction connections */}
                  <line x1="200" y1="100" x2="200" y2="200" stroke="#4a5568" strokeWidth="6" />
                  <line x1="400" y1="200" x2="400" y2="300" stroke="#4a5568" strokeWidth="6" />
                  <line x1="600" y1="100" x2="600" y2="300" stroke="#4a5568" strokeWidth="6" />

                  {/* Stations */}
                  {mockSections.map((section, index) => (
                    <g key={section.id}>
                      <rect
                        x={150 + index * 200}
                        y={80 + (index % 3) * 100}
                        width="100"
                        height="40"
                        fill="#1a2d5a"
                        stroke="#ffcc00"
                        strokeWidth="2"
                        rx="5"
                      />
                      <text
                        x={200 + index * 200}
                        y={105 + (index % 3) * 100}
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="12"
                        className="font-medium"
                      >
                        {section.name.split(' - ')[0]}
                      </text>
                    </g>
                  ))}

                  {/* Trains */}
                  {mockTrains.map((train, index) => {
                    const x = 100 + index * 250;
                    const y = 85 + (index % 3) * 100;
                    const isSelected = selectedTrain === train.id;
                    
                    return (
                      <g
                        key={train.id}
                        className="train-marker cursor-pointer"
                        onClick={() => handleTrainClick(train.id)}
                      >
                        <circle
                          cx={x}
                          cy={y}
                          r={isSelected ? "12" : "8"}
                          fill={
                            train.status === 'on-time' ? '#10b981' :
                            train.status === 'delayed' ? '#ef4444' : '#3b82f6'
                          }
                          stroke="#ffffff"
                          strokeWidth="2"
                          className="animate-pulse-slow"
                        />
                        <text
                          x={x}
                          y={y + 25}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="10"
                          className="font-bold"
                        >
                          {train.number}
                        </text>
                        {isSelected && (
                          <circle
                            cx={x}
                            cy={y}
                            r="16"
                            fill="none"
                            stroke="#ffcc00"
                            strokeWidth="2"
                            strokeDasharray="5,5"
                            className="animate-pulse"
                          />
                        )}
                      </g>
                    );
                  })}

                  {/* Signals */}
                  <circle cx="180" cy="90" r="6" fill="#10b981" className="signal-green" />
                  <circle cx="380" cy="190" r="6" fill="#eab308" className="signal-yellow" />
                  <circle cx="580" cy="290" r="6" fill="#ef4444" className="signal-red" />
                </svg>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-foreground">On Time</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-xs text-foreground">Delayed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-xs text-foreground">On Track</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Train Details Panel */}
        <div className="space-y-4">
          {selectedTrainData ? (
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Train className="w-5 h-5 text-primary" />
                    <span>{selectedTrainData.name}</span>
                  </div>
                  <StatusBadge status={selectedTrainData.status} />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Train Number:</span>
                    <p className="font-medium">{selectedTrainData.number}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Speed:</span>
                    <p className="font-medium">{selectedTrainData.speed} km/h</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Passengers:</span>
                    <p className="font-medium">{selectedTrainData.passengers}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Type:</span>
                    <p className="font-medium capitalize">{selectedTrainData.type}</p>
                  </div>
                </div>
                
                {selectedTrainData.delay > 0 && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <p className="text-red-400 text-sm font-medium">
                      Delayed by {selectedTrainData.delay} minutes
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      New ETA: {selectedTrainData.estimatedArrival}
                    </p>
                  </div>
                )}

                <div>
                  <span className="text-muted-foreground text-sm">Current Route:</span>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedTrainData.route.map((station, index) => (
                      <Badge key={station} variant="outline" className="text-xs">
                        {station}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Link href={`/section/${selectedTrainData.currentSection}`} className="flex-1">
                    <Button size="sm" className="w-full">
                      <Navigation className="w-4 h-4 mr-2" />
                      Section Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-card border-border">
              <CardContent className="flex items-center justify-center py-8">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">
                    Click on a train marker to view details
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Active Sections */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Active Sections</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockSections.map((section) => (
                <Link key={section.id} href={`/section/${section.id}`}>
                  <div className="p-3 bg-accent/10 rounded-lg border border-border hover:bg-accent/20 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-foreground">{section.name}</p>
                      <Badge variant="outline">
                        {section.currentTrains.length}/{section.capacity}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Utilization:</span>
                      <span className="text-foreground">{section.utilization}%</span>
                    </div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}