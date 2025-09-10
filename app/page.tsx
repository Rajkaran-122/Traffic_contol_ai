'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KPICard } from '@/components/dashboard/kpi-card';
import { StatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Clock,
  Train,
  TrendingUp,
  AlertTriangle,
  Activity,
  BarChart3,
  MapPin,
  Zap,
} from 'lucide-react';
import { mockTrains, mockKPIs, mockAIRecommendations } from '@/lib/mock-data';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Control Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time overview of train traffic operations
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
            System Online
          </Badge>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Punctuality Rate"
          value={mockKPIs.punctuality}
          suffix="%"
          icon={Clock}
          change="+2.3% from last week"
          changeType="positive"
        />
        <KPICard
          title="Average Delay"
          value={mockKPIs.averageDelay}
          suffix=" min"
          icon={AlertTriangle}
          change="-1.5 min from yesterday"
          changeType="positive"
        />
        <KPICard
          title="Throughput"
          value={mockKPIs.throughput}
          suffix=" trains/day"
          icon={TrendingUp}
          change="+8 from yesterday"
          changeType="positive"
        />
        <KPICard
          title="Track Utilization"
          value={mockKPIs.utilization}
          suffix="%"
          icon={Activity}
          change="Optimal range"
          changeType="neutral"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Trains */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Active Trains</CardTitle>
            <Link href="/map">
              <Button variant="outline" size="sm">
                <MapPin className="w-4 h-4 mr-2" />
                View Map
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockTrains.map((train) => (
              <div
                key={train.id}
                className="flex items-center justify-between p-3 bg-accent/20 rounded-lg border border-border"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Train className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-foreground">{train.name}</p>
                      <StatusBadge status={train.status} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {train.number} • Section: {train.currentSection}
                    </p>
                    {train.delay > 0 && (
                      <p className="text-sm text-red-400">
                        Delayed by {train.delay} minutes
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{train.speed} km/h</p>
                  <p className="text-xs text-muted-foreground">{train.passengers} passengers</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center">
              <Zap className="w-5 h-5 mr-2 text-primary" />
              AI Recommendations
            </CardTitle>
            <Badge className="bg-primary/20 text-primary">
              {mockAIRecommendations.length} Active
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockAIRecommendations.map((rec) => (
              <div
                key={rec.id}
                className="p-4 bg-accent/10 rounded-lg border border-border"
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge
                    variant="outline"
                    className={
                      rec.priority === 'high'
                        ? 'bg-red-500/20 text-red-400 border-red-500/30'
                        : rec.priority === 'medium'
                        ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                        : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
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
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    Train {rec.trainId} • Section {rec.sectionId}
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="text-xs">
                      Reject
                    </Button>
                    <Button size="sm" className="text-xs">
                      Accept
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="/systems">
          <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
            <Zap className="w-6 h-6" />
            <span className="text-sm">Systems Status</span>
          </Button>
        </Link>
        <Link href="/simulator">
          <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
            <Activity className="w-6 h-6" />
            <span className="text-sm">Simulator</span>
          </Button>
        </Link>
        <Link href="/analytics">
          <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
            <BarChart3 className="w-6 h-6" />
            <span className="text-sm">Analytics</span>
          </Button>
        </Link>
        <Link href="/audit">
          <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
            <Clock className="w-6 h-6" />
            <span className="text-sm">Audit Logs</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
