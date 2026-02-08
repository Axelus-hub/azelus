import { useEffect, useState } from 'react';
import { 
  Cpu, HardDrive, MemoryStick, Network, Activity,
  RefreshCw, Trash2, Download, AlertTriangle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAdminStore } from '@/store/adminStore';
import { formatFileSize } from '@/lib/utils';
import { toast } from 'sonner';

export default function AdminServer() {
  const { serverStats, refreshServerStats, clearCache } = useAdminStore();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [logs] = useState<string[]>([
    '[2024-12-01 10:00:00] Server started successfully',
    '[2024-12-01 10:05:23] Database connection established',
    '[2024-12-01 10:15:45] Cache cleared - 150MB freed',
    '[2024-12-01 10:30:12] New user registered: johndoe',
    '[2024-12-01 11:00:00] Scheduled backup completed',
  ]);

  useEffect(() => {
    refreshServerStats();
  }, [refreshServerStats]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshServerStats();
    setIsRefreshing(false);
    toast.success('Server stats refreshed');
  };

  const handleClearCache = () => {
    clearCache();
    toast.success('Cache cleared successfully');
  };

  const handleDownloadLogs = () => {
    const blob = new Blob([logs.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `axelux-logs-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    toast.success('Logs downloaded');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Server Management</h1>
          <p className="text-muted-foreground">
            Monitor server performance and manage system resources
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" onClick={handleClearCache}>
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Cache
          </Button>
        </div>
      </div>

      {/* Server Stats */}
      {serverStats && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* CPU */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                CPU Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {serverStats.cpu.usage.toFixed(1)}%
              </div>
              <Progress 
                value={serverStats.cpu.usage} 
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-2">
                {serverStats.cpu.cores} cores
              </p>
            </CardContent>
          </Card>

          {/* Memory */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <MemoryStick className="w-4 h-4" />
                Memory
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {serverStats.memory.percentage.toFixed(1)}%
              </div>
              <Progress 
                value={serverStats.memory.percentage} 
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-2">
                {formatFileSize(serverStats.memory.used)} / {formatFileSize(serverStats.memory.total)}
              </p>
            </CardContent>
          </Card>

          {/* Disk */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <HardDrive className="w-4 h-4" />
                Disk Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {serverStats.disk.percentage.toFixed(1)}%
              </div>
              <Progress 
                value={serverStats.disk.percentage} 
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-2">
                {formatFileSize(serverStats.disk.used)} / {formatFileSize(serverStats.disk.total)}
              </p>
            </CardContent>
          </Card>

          {/* Network */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Network className="w-4 h-4" />
                Network
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Upload</span>
                  <span>{serverStats.network.uploadSpeed.toFixed(1)} MB/s</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Download</span>
                  <span>{serverStats.network.downloadSpeed.toFixed(1)} MB/s</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                {serverStats.activeConnections} active connections
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* System Info */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Server Details */}
        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Hostname</span>
              <span className="font-medium">axelux-server-01</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Operating System</span>
              <span className="font-medium">Ubuntu 22.04 LTS</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Node.js Version</span>
              <span className="font-medium">v20.10.0</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Database</span>
              <span className="font-medium">PostgreSQL 15</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Uptime</span>
              <span className="font-medium">
                {serverStats ? `${Math.floor(serverStats.uptime / 86400)} days` : '-'}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Last Backup</span>
              <span className="font-medium">2024-12-01 03:00:00</span>
            </div>
          </CardContent>
        </Card>

        {/* Logs */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Logs</CardTitle>
            <Button variant="outline" size="sm" onClick={handleDownloadLogs}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </CardHeader>
          <CardContent>
            <div className="bg-muted rounded-lg p-4 font-mono text-sm h-64 overflow-y-auto">
              {logs.map((log, i) => (
                <div key={i} className="py-1 text-muted-foreground">
                  {log}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            System Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {serverStats && serverStats.disk.percentage > 80 && (
              <div className="flex items-center gap-3 p-3 bg-yellow-500/10 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="font-medium">High Disk Usage</p>
                  <p className="text-sm text-muted-foreground">
                    Disk usage is at {serverStats.disk.percentage.toFixed(1)}%. Consider cleaning up old files.
                  </p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg">
              <Activity className="w-5 h-5 text-green-500" />
              <div>
                <p className="font-medium">All Systems Operational</p>
                <p className="text-sm text-muted-foreground">
                  All services are running normally.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
