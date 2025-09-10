'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Search,
  Filter,
  Download,
  FileText,
  Clock,
  User,
  Train,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { mockAuditLogs } from '@/lib/mock-data';

export default function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [eventFilter, setEventFilter] = useState('all');
  const [userFilter, setUserFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  const logsPerPage = 10;
  
  // Extended mock data for pagination
  const extendedLogs = [
    ...mockAuditLogs,
    {
      id: '4',
      timestamp: '2024-01-15T14:15:00Z',
      event: 'Speed Adjustment',
      trainId: '12302',
      sectionId: 'NDLS-GZB',
      user: 'AI System',
      action: 'Automatic Adjustment',
      details: 'Reduced speed to 95 km/h for fuel optimization',
    },
    {
      id: '5',
      timestamp: '2024-01-15T14:10:00Z',
      event: 'System Alert',
      user: 'System',
      action: 'Alert Generated',
      details: 'High utilization detected in BBS-CTC section',
    },
    {
      id: '6',
      timestamp: '2024-01-15T14:05:00Z',
      event: 'User Login',
      user: 'Controller B',
      action: 'Authentication',
      details: 'User logged in from workstation WS-002',
    },
    {
      id: '7',
      timestamp: '2024-01-15T14:00:00Z',
      event: 'Train Departed',
      trainId: '56473',
      sectionId: 'LTT-TNA',
      user: 'System',
      action: 'Status Update',
      details: 'Train departed on time from platform 3',
    },
    {
      id: '8',
      timestamp: '2024-01-15T13:55:00Z',
      event: 'Signal Override',
      trainId: '18448',
      sectionId: 'BBS-CTC',
      user: 'Controller A',
      action: 'Manual Override',
      details: 'Override signal to allow train passage during maintenance window',
    },
  ];

  const filteredLogs = extendedLogs.filter(log => {
    const matchesSearch = searchTerm === '' || 
      log.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.trainId?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesEvent = eventFilter === 'all' || log.event === eventFilter;
    const matchesUser = userFilter === 'all' || log.user === userFilter;
    
    return matchesSearch && matchesEvent && matchesUser;
  });

  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
  const startIndex = (currentPage - 1) * logsPerPage;
  const currentLogs = filteredLogs.slice(startIndex, startIndex + logsPerPage);

  const getEventIcon = (event: string) => {
    switch (event.toLowerCase()) {
      case 'signal changed':
      case 'signal override':
        return <MapPin className="w-4 h-4 text-yellow-500" />;
      case 'train rerouted':
      case 'train departed':
        return <Train className="w-4 h-4 text-blue-500" />;
      case 'user login':
        return <User className="w-4 h-4 text-green-500" />;
      case 'track maintenance':
        return <Clock className="w-4 h-4 text-orange-500" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getActionBadge = (action: string) => {
    switch (action.toLowerCase()) {
      case 'manual override':
        return <Badge variant="outline" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Manual</Badge>;
      case 'automatic reroute':
      case 'automatic adjustment':
        return <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">Auto</Badge>;
      case 'status update':
        return <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">Status</Badge>;
      case 'authentication':
        return <Badge variant="outline" className="bg-purple-500/20 text-purple-400 border-purple-500/30">Auth</Badge>;
      default:
        return <Badge variant="outline">System</Badge>;
    }
  };

  const exportLogs = () => {
    const csvContent = [
      'Timestamp,Event,Train ID,Section ID,User,Action,Details',
      ...filteredLogs.map(log => 
        `${log.timestamp},${log.event},${log.trainId || ''},${log.sectionId || ''},${log.user},${log.action},"${log.details}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'audit-logs.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Audit Logs</h1>
          <p className="text-muted-foreground">
            Track all system activities and user actions
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            <FileText className="w-4 h-4 mr-2" />
            {filteredLogs.length} entries
          </Badge>
          <Button onClick={exportLogs} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search events, trains, details..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={eventFilter} onValueChange={setEventFilter}>
              <SelectTrigger>
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by event" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="Signal Changed">Signal Changed</SelectItem>
                <SelectItem value="Train Rerouted">Train Rerouted</SelectItem>
                <SelectItem value="Track Maintenance">Track Maintenance</SelectItem>
                <SelectItem value="Speed Adjustment">Speed Adjustment</SelectItem>
                <SelectItem value="User Login">User Login</SelectItem>
              </SelectContent>
            </Select>

            <Select value={userFilter} onValueChange={setUserFilter}>
              <SelectTrigger>
                <User className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by user" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="Controller A">Controller A</SelectItem>
                <SelectItem value="Controller B">Controller B</SelectItem>
                <SelectItem value="AI System">AI System</SelectItem>
                <SelectItem value="System">System</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setEventFilter('all');
                setUserFilter('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card className="bg-card border-border">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-muted-foreground">Time</TableHead>
                <TableHead className="text-muted-foreground">Event</TableHead>
                <TableHead className="text-muted-foreground">Train/Section</TableHead>
                <TableHead className="text-muted-foreground">User</TableHead>
                <TableHead className="text-muted-foreground">Action</TableHead>
                <TableHead className="text-muted-foreground">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentLogs.map((log) => (
                <TableRow key={log.id} className="border-border hover:bg-accent/10">
                  <TableCell className="text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getEventIcon(log.event)}
                      <span className="font-medium">{log.event}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {log.trainId && (
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1">
                          <Train className="w-3 h-3 text-blue-500" />
                          <span className="text-sm">{log.trainId}</span>
                        </div>
                        {log.sectionId && (
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3 text-green-500" />
                            <span className="text-xs text-muted-foreground">{log.sectionId}</span>
                          </div>
                        )}
                      </div>
                    )}
                    {!log.trainId && log.sectionId && (
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-green-500" />
                        <span className="text-sm">{log.sectionId}</span>
                      </div>
                    )}
                    {!log.trainId && !log.sectionId && (
                      <span className="text-muted-foreground text-sm">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{log.user}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getActionBadge(log.action)}
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <p className="text-sm text-muted-foreground truncate" title={log.details}>
                      {log.details}
                    </p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(startIndex + logsPerPage, filteredLogs.length)} of {filteredLogs.length} entries
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}