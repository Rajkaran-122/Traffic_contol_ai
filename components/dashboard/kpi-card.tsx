import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  suffix?: string;
}

export function KPICard({
  title,
  value,
  icon: Icon,
  change,
  changeType = 'neutral',
  suffix = '',
}: KPICardProps) {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-green-400';
      case 'negative':
        return 'text-red-400';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <Card className="bg-card border-border shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">
          {value}
          {suffix}
        </div>
        {change && (
          <p className={`text-xs ${getChangeColor()} mt-1`}>
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
