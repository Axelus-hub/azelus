import { useState } from 'react';
import { 
  Download, Trash2, Search, Filter,
  AlertCircle, AlertTriangle, Info,
  Calendar, User, Activity 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAdminStore } from '@/store/adminStore';
import { formatDate } from '@/lib/utils';
import { toast } from 'sonner';

const severityColors: Record<string, string> = {
  info: 'bg-blue-500',
  warning: 'bg-yellow-500',
  error: 'bg-orange-500',
  critical: 'bg-red-500',
};

const severityIcons: Record<string, React.ElementType> = {
  info: Info,
  warning: AlertTriangle,
  error: AlertCircle,
  critical: AlertCircle,
};

export default function AdminLogs() {
  const { activityLogs, clearLogs } = useAdminStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');

  const filteredLogs = activityLogs.filter(log => {
    const matchesSearch = 
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user?.username.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSeverity = severityFilter === 'all' || log.severity === severityFilter;
    
    return matchesSearch && matchesSeverity;
  });

  const handleDownload = () => {
    const logsText = filteredLogs.map(log => 
      `[${log.timestamp.toISOString()}] [${log.severity.toUpperCase()}] ${log.action}: ${log.details}`
    ).join('\n');
    
    const blob = new Blob([logsText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `axelux-activity-logs-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    toast.success('Logs downloaded');
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to clear all logs?')) {
      clearLogs();
      toast.success('Logs cleared');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Activity Logs</h1>
          <p className="text-muted-foreground">
            View and manage system activity logs
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" onClick={handleClear}>
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Logs</p>
            <p className="text-2xl font-bold">{activityLogs.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Info</p>
            <p className="text-2xl font-bold text-blue-500">
              {activityLogs.filter(l => l.severity === 'info').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Warnings</p>
            <p className="text-2xl font-bold text-yellow-500">
              {activityLogs.filter(l => l.severity === 'warning').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Errors</p>
            <p className="text-2xl font-bold text-red-500">
              {activityLogs.filter(l => l.severity === 'error' || l.severity === 'critical').length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search logs..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={severityFilter} onValueChange={setSeverityFilter}>
          <SelectTrigger className="w-[150px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severities</SelectItem>
            <SelectItem value="info">Info</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
            <SelectItem value="error">Error</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Logs List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {filteredLogs.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <Activity className="w-12 h-12 mx-auto mb-4" />
                <p>No logs found</p>
              </div>
            ) : (
              filteredLogs.map((log) => {
                const Icon = severityIcons[log.severity];
                return (
                  <div key={log.id} className="p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className={`w-8 h-8 ${severityColors[log.severity]} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="secondary">{log.action}</Badge>
                          <span className="text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3 inline mr-1" />
                            {formatDate(log.timestamp)}
                          </span>
                        </div>
                        <p className="mt-1">{log.details}</p>
                        {log.user && (
                          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                            <User className="w-4 h-4" />
                            {log.user.username} ({log.user.email})
                          </div>
                        )}
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>IP: {log.ipAddress}</span>
                          <span className="truncate">{log.userAgent}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
