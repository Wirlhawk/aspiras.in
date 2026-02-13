import { Card } from "@/components/retroui/Card";
import { getDashboardStats } from "@/server/dashboard/dashboard.query";
import {
  Users,
  MessageSquare,
  School,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle
} from "lucide-react";
import Link from "next/link";

const DashboardPage = async () => {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-head mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back, Admin.</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6 flex flex-row items-center justify-between space-y-0">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Students</p>
            <h2 className="text-3xl font-bold">{stats.totalStudents}</h2>
          </div>
          <div className="p-3 bg-primary/10 rounded-full text-primary">
            <Users size={24} />
          </div>
        </Card>

        <Card className="p-6 flex flex-row items-center justify-between space-y-0">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Classes</p>
            <h2 className="text-3xl font-bold">{stats.totalClasses}</h2>
          </div>
          <div className="p-3 bg-blue-500/10 rounded-full text-blue-500">
            <School size={24} />
          </div>
        </Card>

        <Card className="p-6 flex flex-row items-center justify-between space-y-0">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Aspirations</p>
            <h2 className="text-3xl font-bold">{stats.totalAspirations}</h2>
          </div>
          <div className="p-3 bg-orange-500/10 rounded-full text-orange-500">
            <MessageSquare size={24} />
          </div>
        </Card>

        {/* Pending Actions / Priority */}
        <Link href="/dashboard/aspirations" className="block h-full">
          <Card className="p-6 flex flex-row items-center justify-between space-y-0 h-full hover:bg-muted/50 transition-colors cursor-pointer border-dashed border-2">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending Review</p>
              <h2 className="text-3xl font-bold text-yellow-600">
                {stats.statusCounts['PENDING'] || 0}
              </h2>
            </div>
            <div className="p-3 bg-yellow-500/10 rounded-full text-yellow-600">
              <Clock size={24} />
            </div>
          </Card>
        </Link>
      </div>

      {/* Aspiration Status Breakdown */}
      <div>
        <h2 className="text-xl font-head mb-4">Aspiration Status</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-4 flex items-center gap-4">
            <div className="p-2 bg-blue-100 text-blue-700 rounded-full">
              <AlertCircle size={20} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Processing</p>
              <p className="text-lg font-bold">{stats.statusCounts['PROCESSING'] || 0}</p>
            </div>
          </Card>

          <Card className="p-4 flex items-center gap-4">
            <div className="p-2 bg-green-100 text-green-700 rounded-full">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Done</p>
              <p className="text-lg font-bold">{stats.statusCounts['DONE'] || 0}</p>
            </div>
          </Card>

          <Card className="p-4 flex items-center gap-4">
            <div className="p-2 bg-red-100 text-red-700 rounded-full">
              <XCircle size={20} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Rejected</p>
              <p className="text-lg font-bold">{stats.statusCounts['REJECTED'] || 0}</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;