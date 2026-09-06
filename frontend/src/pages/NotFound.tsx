import React from 'react';
import { useNavigate } from 'react-router';
import { Leaf, Home } from 'lucide-react';
import { Button } from '../components/ui';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 relative overflow-hidden animate-fade-in">
      {/* Decorative leaves */}
      <Leaf className="absolute top-20 left-1/4 w-12 h-12 text-primary/10 rotate-45 animate-pulse" />
      <Leaf className="absolute bottom-32 right-1/4 w-16 h-16 text-accent/10 -rotate-12 animate-bounce" style={{animationDuration: '3s'}} />
      <Leaf className="absolute top-1/3 right-1/3 w-8 h-8 text-info/10 rotate-90" />
      
      <div className="text-center z-10 relative">
        <h1 className="text-8xl md:text-9xl font-black text-primary/20 tracking-tighter mb-4">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-text-secondary max-w-md mx-auto mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <Button 
          variant="primary" 
          size="lg" 
          icon={<Home className="w-5 h-5" />}
          onClick={() => navigate('/')}
        >
          Go to Home
        </Button>
      </div>
    </div>
  );
}
