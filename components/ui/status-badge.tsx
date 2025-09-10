"use client";

import { cn } from "@/lib/utils";
import {
  Clock,
  AlertCircle,
  CheckCircle,
  Play,
  Settings,
  XCircle,
  Zap,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

// 🚂 Status domain
export type StatusType =
  | "on-time"
  | "delayed"
  | "on-track"
  | "active"
  | "maintenance"
  | "blocked"
  | "offline"
  | "error"
  | "critical"
  | "warning"
  | "scheduled"
  | "approaching"
  | "departed";

// Variants for your fancy badges
const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-200",
  {
    variants: {
      variant: {
        "on-time":
          "bg-emerald-500/15 text-emerald-600 border-emerald-500/30 hover:bg-emerald-500/25",
        delayed:
          "bg-red-500/15 text-red-600 border-red-500/30 hover:bg-red-500/25",
        "on-track":
          "bg-blue-500/15 text-blue-600 border-blue-500/30 hover:bg-blue-500/25",
        active:
          "bg-green-500/15 text-green-600 border-green-500/30 hover:bg-green-500/25",
        maintenance:
          "bg-amber-500/15 text-amber-600 border-amber-500/30 hover:bg-amber-500/25",
        blocked:
          "bg-red-600/15 text-red-700 border-red-600/30 hover:bg-red-600/25",
        offline:
          "bg-slate-500/15 text-slate-600 border-slate-500/30 hover:bg-slate-500/25",
        error:
          "bg-red-500/15 text-red-600 border-red-500/30 hover:bg-red-500/25",
        critical:
          "bg-red-600/20 text-red-700 border-red-600/40 animate-pulse",
        warning:
          "bg-orange-500/15 text-orange-600 border-orange-500/30 hover:bg-orange-500/25",
        scheduled:
          "bg-indigo-500/15 text-indigo-600 border-indigo-500/30 hover:bg-indigo-500/25",
        approaching:
          "bg-yellow-500/15 text-yellow-600 border-yellow-500/30 hover:bg-yellow-500/25",
        departed:
          "bg-gray-500/15 text-gray-600 border-gray-500/30 hover:bg-gray-500/25",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "active",
      size: "md",
    },
  }
);

interface StatusBadgeProps extends VariantProps<typeof badgeVariants> {
  status: StatusType;
  className?: string;
  showIcon?: boolean;
  animated?: boolean;
  onClick?: () => void;
  tooltip?: string;
  pulse?: boolean;
}

// Icon mappings
const getStatusConfig = (status: StatusType) => {
  const configs: Record<
    StatusType,
    { label: string; icon: any; priority: string; description: string }
  > = {
    "on-time": {
      label: "On Time",
      icon: CheckCircle,
      priority: "high",
      description: "Operating according to schedule",
    },
    delayed: {
      label: "Delayed",
      icon: Clock,
      priority: "medium",
      description: "Behind scheduled time",
    },
    "on-track": {
      label: "On Track",
      icon: TrendingUp,
      priority: "high",
      description: "Following designated route",
    },
    active: {
      label: "Active",
      icon: Play,
      priority: "high",
      description: "Currently operational",
    },
    maintenance: {
      label: "Maintenance",
      icon: Settings,
      priority: "low",
      description: "Under maintenance",
    },
    blocked: {
      label: "Blocked",
      icon: XCircle,
      priority: "critical",
      description: "Path obstructed or blocked",
    },
    offline: {
      label: "Offline",
      icon: XCircle,
      priority: "low",
      description: "System not operational",
    },
    error: {
      label: "Error",
      icon: AlertCircle,
      priority: "high",
      description: "System error detected",
    },
    critical: {
      label: "Critical",
      icon: AlertCircle,
      priority: "critical",
      description: "Immediate attention required",
    },
    warning: {
      label: "Warning",
      icon: AlertCircle,
      priority: "medium",
      description: "Caution advised",
    },
    scheduled: {
      label: "Scheduled",
      icon: Calendar,
      priority: "medium",
      description: "Planned operation",
    },
    approaching: {
      label: "Approaching",
      icon: Zap,
      priority: "medium",
      description: "Nearing destination",
    },
    departed: {
      label: "Departed",
      icon: CheckCircle,
      priority: "low",
      description: "Left the station",
    },
  };
  return configs[status];
};

// 🎯 Main component
export function StatusBadge({
  status,
  className,
  showIcon = true,
  animated = false,
  onClick,
  tooltip,
  pulse = false,
  size = "md",
  ...props
}: StatusBadgeProps) {
  const config = getStatusConfig(status);
  const IconComponent = config.icon;

  const badgeClasses = cn(
    badgeVariants({ variant: status, size }),
    {
      "cursor-pointer hover:shadow-md": onClick,
      "animate-bounce": animated && config.priority === "critical",
      "animate-pulse": pulse || config.priority === "critical",
    },
    className
  );

  const badge = (
    <span
      className={badgeClasses}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      title={tooltip || config.description}
      {...props}
    >
      {showIcon && (
        <IconComponent
          className={cn("h-3 w-3", {
            "animate-spin": status === "maintenance" && animated,
            "animate-pulse": config.priority === "critical",
          })}
        />
      )}
      <span className="font-medium">{config.label}</span>
    </span>
  );

  return badge;
}

export const getStatusPriority = (status: StatusType): number => {
  const priorities: Record<StatusType, number> = {
    critical: 4,
    blocked: 4,
    error: 3,
    delayed: 3,
    warning: 2,
    maintenance: 2,
    approaching: 2,
    scheduled: 2,
    active: 1,
    "on-time": 1,
    "on-track": 1,
    departed: 0,
    offline: 0,
  };
  return priorities[status] ?? 1;
};

export const isStatusCritical = (status: StatusType): boolean => {
  return ["critical", "blocked", "error", "delayed"].includes(status);
};

interface StatusGroupProps {
  statuses: { status: StatusType; count: number }[];
  className?: string;
}

export function StatusGroup({ statuses, className }: StatusGroupProps) {
  const sortedStatuses = statuses.sort(
    (a, b) => getStatusPriority(b.status) - getStatusPriority(a.status)
  );

  return (
    <div className={cn("flex flex-wrap gap-1", className)}>
      {sortedStatuses.map(({ status, count }) => (
        <div key={status} className="flex items-center gap-1">
          <StatusBadge status={status} size="sm" />
          {count > 1 && (
            <span className="text-xs text-gray-500 font-medium">({count})</span>
          )}
        </div>
      ))}
    </div>
  );
}

export type { StatusBadgeProps };
export { badgeVariants };
