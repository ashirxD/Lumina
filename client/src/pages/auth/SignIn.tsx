import React, { useState } from 'react';
import { 
  Home, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  ArrowRight,
  Users,
  Calendar,
  CheckSquare,
  Heart,
  Star,
  MessageCircle,
  Shield
} from 'lucide-react';

interface SignInFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FeatureItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const SignIn: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<SignInFormData>({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const features: FeatureItem[] = [
    {
      icon: CheckSquare,
      title: "Task & Chore Management",
      description: "Assign tasks, track progress, and reward completion"
    },
    {
      icon: Calendar,
      title: "Family Calendar",
      description: "Keep everyone synchronized with shared schedules"
    },
    {
      icon: MessageCircle,
      title: "Family Communication",
      description: "Share updates, photos, and stay connected"
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Private family space with parental controls"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('Sign in data:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex">
      {/* Left Side - Sign In Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 via-teal-600 to-blue-600 rounded-3xl flex items-center justify-center shadow-lg">
                <Home className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Home</h1>
            <p className="text-gray-600">Sign in to your Lumina family hub</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-white/80 backdrop-blur-sm"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-white/80 backdrop-blur-sm"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500" 
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <button type="button" className="text-sm text-emerald-600 hover:text-emerald-700 transition-colors">
                Forgot password?
              </button>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-2xl font-medium hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-emerald-500/25 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              New family?{' '}
              <a href="/signup" className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
                Create your family hub
              </a>
            </p>
          </div>

          {/* OAuth Options */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gradient-to-br from-emerald-50 to-blue-50 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-2xl shadow-sm bg-white/80 backdrop-blur-sm text-sm font-medium text-gray-500 hover:bg-white transition-all">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </button>
              <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-2xl shadow-sm bg-white/80 backdrop-blur-sm text-sm font-medium text-gray-500 hover:bg-white transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Features/Branding */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-teal-600/20"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, rgba(16, 185, 129, 0.15) 0%, transparent 50%), 
                           radial-gradient(circle at 80% 70%, rgba(20, 184, 166, 0.15) 0%, transparent 50%),
                           radial-gradient(circle at 60% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`
        }}></div>

        {/* Floating Family Icons */}
        <div className="absolute top-20 left-20 animate-bounce">
          <div className="w-12 h-12 bg-emerald-500/30 rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6 text-emerald-300" />
          </div>
        </div>
        <div className="absolute top-40 right-32 animate-pulse">
          <div className="w-8 h-8 bg-blue-500/30 rounded-full flex items-center justify-center">
            <Star className="w-4 h-4 text-blue-300" />
          </div>
        </div>
        <div className="absolute bottom-40 left-32 animate-bounce" style={{ animationDelay: '1s' }}>
          <div className="w-10 h-10 bg-teal-500/30 rounded-full flex items-center justify-center">
            <Users className="w-5 h-5 text-teal-300" />
          </div>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 via-teal-600 to-blue-600 rounded-2xl flex items-center justify-center">
                <Home className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-bold tracking-tight">Lumina</span>
            </div>
            <h2 className="text-4xl font-bold leading-tight mb-4">
              Your family's digital home
            </h2>
            <p className="text-xl text-teal-100 leading-relaxed">
              Where families connect, organize, and thrive together in one beautiful space.
            </p>
          </div>

          <div className="space-y-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-teal-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1 text-white">{feature.title}</h3>
                    <p className="text-teal-100">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Stats */}
          <div className="mt-12 pt-8 border-t border-teal-800/30">
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">5k+</div>
                <div className="text-teal-200 text-sm">Happy Families</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">25k+</div>
                <div className="text-teal-200 text-sm">Tasks Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">100%</div>
                <div className="text-teal-200 text-sm">Family Love</div>
              </div>
            </div>
          </div>

          {/* Family Quote */}
          <div className="mt-8 p-6 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl border border-teal-500/20">
            <p className="text-teal-100 italic text-center">
              "Lumina has brought our family closer together. Managing chores and schedules has never been this easy!"
            </p>
            <p className="text-teal-200 text-sm text-center mt-2">- The Johnson Family</p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-32 right-20 w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 left-20 w-40 h-40 bg-gradient-to-br from-teal-500/15 to-blue-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
};

export default SignIn;