import React from 'react';
import { Users, Activity, Sprout, MessageSquare, ShieldCheck, MoreVertical } from 'lucide-react';
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { Card, Badge, Button } from '../components/ui';
import PageWrapper from '../components/layout/PageWrapper';

const userGrowthData = [
  { month: 'Jan', users: 1200 },
  { month: 'Feb', users: 1900 },
  { month: 'Mar', users: 2400 },
  { month: 'Apr', users: 3100 },
  { month: 'May', users: 4500 },
  { month: 'Jun', users: 5200 },
];

const predictionDistribution = [
  { name: 'Crop Pred.', value: 45 },
  { name: 'Disease Check', value: 30 },
  { name: 'AI Consults', value: 25 },
];

const COLORS = ['var(--color-primary)', 'var(--color-accent)', 'var(--color-info)'];

const users = [
  { id: '1', name: 'Ramesh Kumar', email: 'ramesh@example.com', role: 'Farmer', status: 'Active', joined: '2026-01-15' },
  { id: '2', name: 'Anita Desai', email: 'anita@example.com', role: 'Agronomist', status: 'Active', joined: '2026-02-20' },
  { id: '3', name: 'John Smith', email: 'john@example.com', role: 'Admin', status: 'Active', joined: '2025-11-10' },
  { id: '4', name: 'Priya Singh', email: 'priya@example.com', role: 'Farmer', status: 'Inactive', joined: '2026-05-05' },
  { id: '5', name: 'Vikram Patel', email: 'vikram@example.com', role: 'Farmer', status: 'Active', joined: '2026-07-12' },
];

export default function Admin() {
  return (
    <PageWrapper title="Admin Dashboard">
      <div className="space-y-6 animate-fade-in">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card padding="md" className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted">Total Users</p>
              <p className="text-2xl font-bold text-text">5,200</p>
            </div>
          </Card>
          <Card padding="md" className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mr-4">
              <Activity className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted">Active Today</p>
              <p className="text-2xl font-bold text-text">842</p>
            </div>
          </Card>
          <Card padding="md" className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-info/10 flex items-center justify-center mr-4">
              <Sprout className="w-6 h-6 text-info" />
            </div>
            <div>
              <p className="text-sm text-muted">Predictions</p>
              <p className="text-2xl font-bold text-text">12.5k</p>
            </div>
          </Card>
          <Card padding="md" className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center mr-4">
              <MessageSquare className="w-6 h-6 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted">AI Queries</p>
              <p className="text-2xl font-bold text-text">45.2k</p>
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card padding="lg" className="lg:col-span-2">
            <h3 className="text-lg font-bold text-text mb-6">User Growth</h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userGrowthData}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <RechartsTooltip />
                  <Area type="monotone" dataKey="users" stroke="var(--color-primary)" fillOpacity={1} fill="url(#colorUsers)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card padding="lg">
            <h3 className="text-lg font-bold text-text mb-6">Service Usage</h3>
            <div className="h-72 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={predictionDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {predictionDistribution.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-text">100%</span>
                <span className="text-xs text-muted">Total Usage</span>
              </div>
            </div>
          </Card>
        </div>

        {/* User Management Table */}
        <Card padding="none" className="overflow-hidden border border-border">
          <div className="p-6 border-b border-border flex justify-between items-center">
            <h3 className="text-lg font-bold text-text">Recent Users</h3>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface text-muted">
                <tr>
                  <th className="px-6 py-4 font-semibold">User</th>
                  <th className="px-6 py-4 font-semibold">Role</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Joined Date</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-white">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-surface/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold mr-3">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-text">{user.name}</p>
                          <p className="text-xs text-muted">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {user.role === 'Admin' && <ShieldCheck className="w-4 h-4 text-primary mr-1" />}
                        <span className="text-text-secondary">{user.role}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={user.status === 'Active' ? 'success' : 'neutral'} size="sm">
                        {user.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-text-secondary">
                      {user.joined}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-muted hover:text-text p-1 rounded-md hover:bg-surface transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
}
