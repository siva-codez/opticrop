import React from 'react';
import { useNavigate } from 'react-router';
import { 
  Sprout, Leaf, MessageSquare, CloudSun, 
  FlaskConical, Droplets, Beaker, ArrowRight,
  TrendingUp, Activity, CheckCircle, FileText, Clock
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line 
} from 'recharts';
import { Card, Button } from '../components/ui';
import PageWrapper from '../components/layout/PageWrapper';

const predictionData = [
  { month: 'Jan', predictions: 3 },
  { month: 'Feb', predictions: 5 },
  { month: 'Mar', predictions: 8 },
  { month: 'Apr', predictions: 4 },
  { month: 'May', predictions: 12 },
  { month: 'Jun', predictions: 9 },
];

const weatherData = [
  { day: 'Mon', temp: 28, humidity: 65 },
  { day: 'Tue', temp: 30, humidity: 60 },
  { day: 'Wed', temp: 29, humidity: 62 },
  { day: 'Thu', temp: 32, humidity: 55 },
  { day: 'Fri', temp: 31, humidity: 58 },
  { day: 'Sat', temp: 27, humidity: 70 },
  { day: 'Sun', temp: 26, humidity: 72 },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <PageWrapper title="Dashboard">
      <div className="space-y-8 animate-fade-in">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-text mb-1">Good morning, Farmer</h1>
            <p className="text-muted">Let's make today's farming decisions smarter.</p>
          </div>
          <div className="bg-surface border border-border rounded-xl px-4 py-3 flex items-center shadow-sm">
            <span className="text-lg mr-2">🌤️</span>
            <div className="text-sm font-medium text-text">
              28°C, Partly Cloudy <span className="text-muted mx-1">·</span> Humidity 65% <span className="text-muted mx-1">·</span> Wind 12 km/h
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 gap-4 no-scrollbar">
          <button onClick={() => navigate('/predict')} className="flex items-center gap-3 bg-primary/10 text-primary px-5 py-3 rounded-xl whitespace-nowrap hover:bg-primary/20 transition-colors">
            <Sprout className="w-5 h-5" />
            <span className="font-semibold">Predict Best Crop</span>
          </button>
          <button onClick={() => navigate('/disease')} className="flex items-center gap-3 bg-accent/10 text-accent px-5 py-3 rounded-xl whitespace-nowrap hover:bg-accent/20 transition-colors">
            <Leaf className="w-5 h-5" />
            <span className="font-semibold">Analyze Leaf</span>
          </button>
          <button onClick={() => navigate('/assistant')} className="flex items-center gap-3 bg-info/10 text-info px-5 py-3 rounded-xl whitespace-nowrap hover:bg-info/20 transition-colors">
            <MessageSquare className="w-5 h-5" />
            <span className="font-semibold">Ask AI Assistant</span>
          </button>
          <button className="flex items-center gap-3 bg-warning/10 text-warning px-5 py-3 rounded-xl whitespace-nowrap hover:bg-warning/20 transition-colors">
            <CloudSun className="w-5 h-5" />
            <span className="font-semibold">Check Weather</span>
          </button>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card variant="interactive" padding="lg" className="flex flex-col h-full group" onClick={() => navigate('/predict')}>
            <div className="w-12 h-12 bg-primary/20 text-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Sprout className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-text mb-2">Crop Recommendation</h3>
            <p className="text-sm text-muted flex-grow mb-4">Find the best crop for your soil and climate</p>
            <div className="flex items-center text-primary text-sm font-semibold">
              Get Started <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>
          
          <Card variant="interactive" padding="lg" className="flex flex-col h-full group" onClick={() => navigate('/disease')}>
            <div className="w-12 h-12 bg-accent/20 text-accent rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-text mb-2">Leaf Disease Detection</h3>
            <p className="text-sm text-muted flex-grow mb-4">Upload a photo to diagnose plant diseases</p>
            <div className="flex items-center text-accent text-sm font-semibold">
              Scan Leaf <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>

          <Card variant="interactive" padding="lg" className="flex flex-col h-full group" onClick={() => navigate('/assistant')}>
            <div className="w-12 h-12 bg-info/20 text-info rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-text mb-2">AI Agriculture Assistant</h3>
            <p className="text-sm text-muted flex-grow mb-4">Get expert farming advice instantly</p>
            <div className="flex items-center text-info text-sm font-semibold">
              Chat Now <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>

          <Card variant="interactive" padding="lg" className="flex flex-col h-full group">
            <div className="w-12 h-12 bg-purple-500/20 text-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FlaskConical className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-text mb-2">Soil Health</h3>
            <p className="text-sm text-muted flex-grow mb-4">Analyze and improve your soil composition</p>
            <div className="flex items-center text-purple-600 text-sm font-semibold">
              Analyze <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>

          <Card variant="interactive" padding="lg" className="flex flex-col h-full group">
            <div className="w-12 h-12 bg-cyan-500/20 text-cyan-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Droplets className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-text mb-2">Water Management</h3>
            <p className="text-sm text-muted flex-grow mb-4">Smart irrigation and water optimization</p>
            <div className="flex items-center text-cyan-600 text-sm font-semibold">
              Manage <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>

          <Card variant="interactive" padding="lg" className="flex flex-col h-full group">
            <div className="w-12 h-12 bg-warning/20 text-warning rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Beaker className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-text mb-2">Fertilizer Guidance</h3>
            <p className="text-sm text-muted flex-grow mb-4">Optimize nutrient application for better yield</p>
            <div className="flex items-center text-warning text-sm font-semibold">
              Get Guide <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>
        </div>

        {/* Analytics Section */}
        <div>
          <h2 className="text-xl font-bold text-text mb-4">Farm Analytics</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="flex items-center p-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted">Predictions Made</p>
                <p className="text-xl font-bold text-primary">12</p>
              </div>
            </Card>
            <Card className="flex items-center p-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mr-4">
                <Activity className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted">Disease Checks</p>
                <p className="text-xl font-bold text-accent">5</p>
              </div>
            </Card>
            <Card className="flex items-center p-4">
              <div className="w-10 h-10 rounded-full bg-info/10 flex items-center justify-center mr-4">
                <FileText className="w-5 h-5 text-info" />
              </div>
              <div>
                <p className="text-sm text-muted">Saved Reports</p>
                <p className="text-xl font-bold text-info">8</p>
              </div>
            </Card>
            <Card className="flex items-center p-4">
              <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center mr-4">
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted">Recent Activity</p>
                <p className="text-xl font-bold text-warning">3 today</p>
              </div>
            </Card>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card padding="lg">
            <h3 className="text-lg font-bold text-text mb-6">Prediction History</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={predictionData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} />
                  <Bar dataKey="predictions" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card padding="lg">
            <h3 className="text-lg font-bold text-text mb-6">Weather Trends</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weatherData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Line yAxisId="left" type="monotone" dataKey="temp" stroke="var(--color-warning)" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                  <Line yAxisId="right" type="monotone" dataKey="humidity" stroke="var(--color-info)" strokeWidth={3} dot={{r: 4}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card padding="lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-text">Recent Activity</h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4 py-2 border-b border-border last:border-0">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Sprout className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-grow">
                <p className="text-sm font-medium text-text">Crop prediction: Rice (96.4% confidence)</p>
                <p className="text-xs text-muted">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 py-2 border-b border-border last:border-0">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <CheckCircle className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-grow">
                <p className="text-sm font-medium text-text">Disease check: Healthy leaf detected</p>
                <p className="text-xs text-muted">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 py-2 border-b border-border last:border-0">
              <div className="w-10 h-10 rounded-full bg-info/10 flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5 text-info" />
              </div>
              <div className="flex-grow">
                <p className="text-sm font-medium text-text">AI chat: Fertilizer advice for tomato</p>
                <p className="text-xs text-muted">Yesterday</p>
              </div>
            </div>
            <div className="flex items-center gap-4 py-2 border-b border-border last:border-0">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-grow">
                <p className="text-sm font-medium text-text">Report generated: Monthly summary</p>
                <p className="text-xs text-muted">2 days ago</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
}
