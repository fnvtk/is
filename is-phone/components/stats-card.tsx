import { TrendingDown, TrendingUp } from "lucide-react"
import { Card } from "@/components/ui/card"

interface StatsCardProps {
  title: string
  value: number
  trend?: number
  suffix?: string
}

export function StatsCard({ title, value, trend, suffix = "" }: StatsCardProps) {
  return (
    <Card className="p-4">
      <div className="flex flex-col">
        <span className="text-sm text-muted-foreground">{title}</span>
        <div className="flex items-center justify-between mt-1">
          <span className="text-2xl font-semibold">
            {value}
            {suffix}
          </span>
          {trend && (
            <div className={`flex items-center ${trend > 0 ? "text-green-500" : "text-red-500"}`}>
              {trend > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span className="text-sm ml-1">{Math.abs(trend)}%</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

