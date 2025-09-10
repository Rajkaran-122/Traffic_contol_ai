'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/ui/status-badge';
import { Separator } from '@/components/ui/separator';
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
  Train,
  MapPin,
  Clock,
  Users,
  Zap,
  Route,
  Pause,
  Play,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import { mockSections, mockTrains, mockAIRecommendations } from '@/lib/mock-data';

export default function SectionDetail({ params }: { params: { id: string } }) {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  
  // Find section data (in real app, this would be fetched based on params.id)
  const section = mockSections.find(s => s.id === params.id) || mockSections[0];
  const sectionRecommendations = mockAIRecommendations.filter(
    rec => rec.sectionId === section.id
  );

  const handleAction = (action: string, trainId?: string) => {
    console.log(`Executing action: ${action}`, { trainId, sectionId: section.id });
    setSelectedAction(null);
    // In real app, this would trigger API calls
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{section.name}</h1>
          <p className="text-muted-foreground">
            Section control and traffic management
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge 
            variant="outline" 
            className="bg-blue-500/20 text-blue-400 border-blue-500/30"
          >
            <MapPin className="w-4 h-4 mr-2" />
            {section.currentTrains.length}/{section.capacity} Occupied
          </Badge>
          <Badge 
            variant="outline"
            className={
              section.utilization > 80 
                ? 'bg-red-500/20 text-red-400 border-red-500/30'
                : section.utilization > 60
                ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                : 'bg-green-500/20 text-green-400 border-green-500/30'
            }
          >
            {section.utilization}% Utilization
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Trains */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Train className="w-5 h-5 mr-2 text-primary" />
                Current Trains ({section.currentTrains.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {section.currentTrains.length === 0 ? (
                <div className="text-center py-8">
                  <Train className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No trains currently in this section</p>
                </div>
              ) : (
                section.currentTrains.map((train) => (
                  <div key={train.id} className="p-4 bg-accent/10 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Train className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{train.name}</p>
                          <p className="text-sm text-muted-foreground">{train.number}</p>
                        </div>
                      </div>
                      <StatusBadge status={train.status} />
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Speed:</span>
                        <p className="font-medium">{train.speed} km/h</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Passengers:</span>
                        <p className="font-medium">{train.passengers}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">ETA:</span>
                        <p className="font-medium">{train.estimatedArrival}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Delay:</span>
                        <p className={`font-medium ${train.delay > 0 ? 'text-red-400' : 'text-green-400'}`}>
                          {train.delay > 0 ? `+${train.delay}min` : 'On time'}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="outline">
                            <Route className="w-4 h-4 mr-2" />
                            Reroute
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Reroute Train {train.number}</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action will reroute the train via an alternative path. 
                              The system will automatically calculate the optimal route.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleAction('reroute', train.id)}>
                              Confirm Reroute
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="outline">
                            <Pause className="w-4 h-4 mr-2" />
                            Hold
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Hold Train {train.number}</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will stop the train at the current position until further notice.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleAction('hold', train.id)}>
                              Confirm Hold
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                      <Button size="sm" variant="default">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Clear
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Incoming Trains */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ArrowRight className="w-5 h-5 mr-2 text-accent" />
                Incoming Trains
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">12004 Lucknow Swarn Shatabdi</p>
                      <p className="text-sm text-muted-foreground">ETA: 15:45 (8 minutes)</p>
                    </div>
                    <StatusBadge status="on-time" />
                  </div>
                </div>
                <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">18238 Chhattisgarh Express</p>
                      <p className="text-sm text-muted-foreground">ETA: 16:20 (35 minutes)</p>
                    </div>
                    <StatusBadge status="delayed" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Recommendations & Controls */}
        <div className="space-y-6">
          {/* AI Recommendations */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 mr-2 text-primary" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {sectionRecommendations.length === 0 ? (
                <div className="text-center py-4">
                  <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No recommendations at this time
                  </p>
                </div>
              ) : (
                sectionRecommendations.map((rec) => (
                  <div key={rec.id} className="p-3 bg-accent/10 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        variant="outline"
                        className={
                          rec.priority === 'high'
                            ? 'bg-red-500/20 text-red-400 border-red-500/30'
                            : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                        }
                      >
                        {rec.priority.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {rec.confidence}% confidence
                      </span>
                    </div>
                    <p className="text-sm font-medium text-foreground mb-1">
                      {rec.recommendation}
                    </p>
                    <p className="text-xs text-muted-foreground mb-3">
                      {rec.reasoning}
                    </p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        Reject
                      </Button>
                      <Button size="sm" className="text-xs">
                        Accept
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Signal Status */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
                Signal Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {section.signals.map((signal) => (
                <div key={signal.id} className="flex items-center justify-between p-3 bg-accent/5 rounded-lg border border-border">
                  <div>
                    <p className="font-medium text-foreground">{signal.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Updated: {new Date(signal.lastUpdated).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        signal.status === 'green' ? 'bg-green-500' :
                        signal.status === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                    />
                    <Button size="sm" variant="outline">
                      Override
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Track Status */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Track Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {section.tracks.map((track) => (
                <div key={track.id} className="p-3 bg-accent/5 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-foreground">{track.name}</p>
                    <StatusBadge status={track.status} />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div>Length: {track.length} km</div>
                    <div>Max Speed: {track.maxSpeed} km/h</div>
                  </div>
                  {track.status === 'active' && (
                    <Button size="sm" variant="outline" className="w-full mt-2">
                      Mark for Maintenance
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}