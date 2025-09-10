'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  Brain,
  Play,
  RotateCcw,
  Plus,
  Trash2,
  TrendingUp,
  Clock,
  Users,
  Train,
  BarChart3,
} from 'lucide-react';
import { mockSections } from '@/lib/mock-data';

interface SimulationTrain {
  id: string;
  number: string;
  name: string;
  passengers: number;
  speed: number;
  type: 'express' | 'passenger' | 'goods';
  startTime: string;
}

interface SimulationResults {
  averageDelay: number;
  throughput: number;
  utilization: number;
  conflicts: number;
  fuelSavings: number;
  recommendations: string[];
}

export default function Simulator() {
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [simulationTrains, setSimulationTrains] = useState<SimulationTrain[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<SimulationResults | null>(null);
  const [newTrain, setNewTrain] = useState({
    number: '',
    name: '',
    passengers: '',
    speed: '',
    type: 'express' as const,
    startTime: '14:00',
  });

  const addTrain = () => {
    if (!newTrain.number || !newTrain.name) return;

    const train: SimulationTrain = {
      id: Date.now().toString(),
      number: newTrain.number,
      name: newTrain.name,
      passengers: parseInt(newTrain.passengers) || 500,
      speed: parseInt(newTrain.speed) || 80,
      type: newTrain.type,
      startTime: newTrain.startTime,
    };

    setSimulationTrains([...simulationTrains, train]);
    setNewTrain({
      number: '',
      name: '',
      passengers: '',
      speed: '',
      type: 'express',
      startTime: '14:00',
    });
  };

  const removeTrain = (trainId: string) => {
    setSimulationTrains(simulationTrains.filter(train => train.id !== trainId));
  };

  const runSimulation = () => {
    setIsRunning(true);
    
    // Mock simulation delay
    setTimeout(() => {
      const mockResults: SimulationResults = {
        averageDelay: Math.random() * 15 + 5,
        throughput: simulationTrains.length * (0.8 + Math.random() * 0.4),
        utilization: Math.random() * 30 + 60,
        conflicts: Math.floor(Math.random() * 3),
        fuelSavings: Math.random() * 500 + 100,
        recommendations: [
          'Consider spacing trains 12-15 minutes apart during peak hours',
          'Reduce speed of goods trains to 65 km/h in congested sections',
          'Implement dynamic signal timing based on real-time traffic',
          'Use loop lines for slower trains during express train passages',
        ],
      };
      
      setResults(mockResults);
      setIsRunning(false);
    }, 3000);
  };

  const resetSimulation = () => {
    setSimulationTrains([]);
    setResults(null);
    setSelectedSection('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Traffic Simulator</h1>
          <p className="text-muted-foreground">
            Test different scenarios and optimize traffic flow
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            <Brain className="w-4 h-4 mr-2" />
            AI-Powered
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Simulation Setup */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section Selection */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Select Section</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedSection} onValueChange={setSelectedSection}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a section to simulate" />
                </SelectTrigger>
                <SelectContent>
                  {mockSections.map(section => (
                    <SelectItem key={section.id} value={section.id}>
                      {section.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Train Configuration */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Add Trains to Simulation
                <Badge variant="outline">
                  {simulationTrains.length} trains configured
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="trainNumber">Train Number</Label>
                  <Input
                    id="trainNumber"
                    placeholder="e.g., 12345"
                    value={newTrain.number}
                    onChange={(e) => setNewTrain({...newTrain, number: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="trainName">Train Name</Label>
                  <Input
                    id="trainName"
                    placeholder="e.g., Express Train"
                    value={newTrain.name}
                    onChange={(e) => setNewTrain({...newTrain, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="passengers">Passengers</Label>
                  <Input
                    id="passengers"
                    type="number"
                    placeholder="500"
                    value={newTrain.passengers}
                    onChange={(e) => setNewTrain({...newTrain, passengers: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="speed">Speed (km/h)</Label>
                  <Input
                    id="speed"
                    type="number"
                    placeholder="80"
                    value={newTrain.speed}
                    onChange={(e) => setNewTrain({...newTrain, speed: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="trainType">Type</Label>
                  <Select value={newTrain.type} onValueChange={(value) => setNewTrain({...newTrain, type: value as any})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="express">Express</SelectItem>
                      <SelectItem value="passenger">Passenger</SelectItem>
                      <SelectItem value="goods">Goods</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={newTrain.startTime}
                    onChange={(e) => setNewTrain({...newTrain, startTime: e.target.value})}
                  />
                </div>
              </div>
              
              <Button onClick={addTrain} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Train to Simulation
              </Button>
            </CardContent>
          </Card>

          {/* Configured Trains */}
          {simulationTrains.length > 0 && (
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Configured Trains</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {simulationTrains.map((train) => (
                    <div key={train.id} className="flex items-center justify-between p-3 bg-accent/10 rounded-lg border border-border">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Train className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{train.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {train.number} • {train.type} • {train.speed} km/h • {train.passengers} pax
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{train.startTime}</Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeTrain(train.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Simulation Controls */}
          <Card className="bg-card border-border">
            <CardContent className="flex items-center justify-center space-x-4 py-8">
              <Button
                onClick={runSimulation}
                disabled={!selectedSection || simulationTrains.length === 0 || isRunning}
                size="lg"
                className="px-8"
              >
                {isRunning ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Running Simulation...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Run Simulation
                  </>
                )}
              </Button>
              <Button onClick={resetSimulation} variant="outline" size="lg">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Panel */}
        <div>
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-primary" />
                Simulation Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!results ? (
                <div className="text-center py-8">
                  <Brain className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Configure trains and run simulation to see results
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* KPI Results */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-accent/10 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium">Avg. Delay</span>
                      </div>
                      <span className="font-bold">{results.averageDelay.toFixed(1)} min</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-accent/10 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium">Throughput</span>
                      </div>
                      <span className="font-bold">{results.throughput.toFixed(1)} trains/h</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-accent/10 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium">Utilization</span>
                      </div>
                      <span className="font-bold">{results.utilization.toFixed(1)}%</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-accent/10 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Train className="w-4 h-4 text-red-500" />
                        <span className="text-sm font-medium">Conflicts</span>
                      </div>
                      <span className="font-bold">{results.conflicts}</span>
                    </div>
                  </div>

                  <Separator />

                  {/* Fuel Savings */}
                  <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <p className="text-sm font-medium text-green-400 mb-1">Fuel Savings</p>
                    <p className="text-lg font-bold text-green-400">
                      {results.fuelSavings.toFixed(0)} L/day
                    </p>
                  </div>

                  <Separator />

                  {/* AI Recommendations */}
                  <div>
                    <h4 className="font-medium text-foreground mb-3 flex items-center">
                      <Brain className="w-4 h-4 mr-2 text-primary" />
                      AI Recommendations
                    </h4>
                    <div className="space-y-2">
                      {results.recommendations.map((rec, index) => (
                        <div key={index} className="p-2 bg-accent/5 rounded text-sm text-muted-foreground">
                          {rec}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}