'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { KPICard } from '@/components/dashboard/kpi-card'; // ✅ single import for KPICard
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  TrendingUp,
  Download,
  Calendar,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Clock,
} from 'lucide-react';
import { mockKPIs, chartData } from '@/lib/mock-data';

const COLORS = ['#ffcc00', '#3da9fc', '#10b981', '#ef4444', '#8b5cf6'];

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Performance insights and traffic analytics
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="7days">
            <SelectTrigger className="w-32">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="7days">7 Days</SelectItem>
              <SelectItem value="30days">30 Days</SelectItem>
              <SelectItem value="3months">3 Months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Punctuality Rate"
          value={mockKPIs.punctuality}
          suffix="%"
          icon={Clock}
          change="+2.3% vs last period"
          changeType="positive"
        />
        <KPICard
          title="Network Efficiency"
          value={mockKPIs.efficiency}
          suffix="%"
          icon={TrendingUp}
          change="+1.8% vs last period"
          changeType="positive"
        />
        <KPICard
          title="Daily Throughput"
          value={mockKPIs.throughput}
          suffix=" trains"
          icon={Activity}
          change="+12 vs yesterday"
          changeType="positive"
        />
        <KPICard
          title="Track Utilization"
          value={mockKPIs.utilization}
          suffix="%"
          icon={BarChart3}
          change="Within optimal range"
          changeType="neutral"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Punctuality Trends */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-primary" />
              Punctuality Trends
            </CardTitle>
            <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
              +2.3%
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData.punctuality}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#9ca3af"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#9ca3af"
                    fontSize={12}
                    domain={[80, 95]}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#f9fafb'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#ffcc00" 
                    strokeWidth={3}
                    dot={{ fill: '#ffcc00', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Hourly Traffic Distribution */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-primary" />
              Hourly Traffic Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData.throughput}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="hour" 
                    stroke="#9ca3af"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#9ca3af"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#f9fafb'
                    }}
                  />
                  <Bar 
                    dataKey="trains" 
                    fill="#3da9fc"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Delay Distribution */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChartIcon className="w-5 h-5 mr-2 text-primary" />
              Delay Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData.delays}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {chartData.delays.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="bg-card border-border lg:col-span-2">
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Network Efficiency</span>
                  <span className="text-sm font-bold text-foreground">{mockKPIs.efficiency}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${mockKPIs.efficiency}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Track Utilization</span>
                  <span className="text-sm font-bold text-foreground">{mockKPIs.utilization}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-accent h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${mockKPIs.utilization}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Punctuality Rate</span>
                  <span className="text-sm font-bold text-foreground">{mockKPIs.punctuality}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${mockKPIs.punctuality}%` }}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <p className="text-xs text-muted-foreground">Avg Response Time</p>
                    <p className="text-lg font-bold text-foreground">2.3s</p>
                  </div>
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <p className="text-xs text-muted-foreground">System Uptime</p>
                    <p className="text-lg font-bold text-green-400">99.8%</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Insights */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>AI-Generated Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <h4 className="font-semibold text-green-400 mb-2">Performance Improvement</h4>
              <p className="text-sm text-muted-foreground">
                Punctuality has improved by 2.3% this week due to optimized signal timing and better route planning.
              </p>
            </div>
            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <h4 className="font-semibold text-blue-400 mb-2">Traffic Pattern</h4>
              <p className="text-sm text-muted-foreground">
                Peak traffic hours show consistent patterns between 8-10 AM and 5-7 PM. Consider dynamic scheduling.
              </p>
            </div>
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <h4 className="font-semibold text-yellow-400 mb-2">Maintenance Alert</h4>
              <p className="text-sm text-muted-foreground">
                Track utilization in Section NDLS-GZB is approaching 85%. Schedule maintenance during off-peak hours.
              </p>
            </div>
            <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
              <h4 className="font-semibold text-purple-400 mb-2">Optimization Opportunity</h4>
              <p className="text-sm text-muted-foreground">
                Implementing AI-suggested route changes could reduce average delays by 18% and save 320L fuel daily.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
