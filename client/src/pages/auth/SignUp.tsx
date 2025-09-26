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
  Shield,
  User,
  Phone
} from 'lucide-react';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  role: string;
  agreeToTerms: boolean;
}

interface FeatureItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<SignUpFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'guardian',
    agreeToTerms: false
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<Record<keyof SignUpFormData, string>>>({});

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

  const roleOptions = [
    { value: 'guardian', label: 'Parent/Guardian' },
    { value: 'child', label: 'Child' },
    { value: 'caregiver', label: 'Caregiver' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof SignUpFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof SignUpFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const signupData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: formData.role
      };
      
      console.log('Sign up data:', signupData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Handle success (redirect to dashboard or show success message)
      alert('Account created successfully! Welcome to Lumina!');
      
    } catch (error) {
      console.error('Sign up error:', error);
      // Handle error (show error message)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex">
      {/* Left Side - Sign Up Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 via-teal-600 to-blue-600 rounded-3xl flex items-center justify-center shadow-lg">
                <Home className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Your Family Hub</h1>
            <p className="text-gray-600">Join thousands of families organizing their lives with Lumina</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-4 py-3 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-white/80 backdrop-blur-sm`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-4 py-3 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-white/80 backdrop-blur-sm`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-4 py-3 border ${errors.phone ? 'border-red-300' : 'border-gray-300'} rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-white/80 backdrop-blur-sm`}
                  placeholder="Enter your phone number"
                />
              </div>
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>

            {/* Role Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Role
              </label>
              <div className="relative">
                <Users className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-white/80 backdrop-blur-sm appearance-none"
                >
                  {roleOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Password Field */}
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
                  className={`w-full pl-12 pr-12 py-3 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-white/80 backdrop-blur-sm`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-12 py-3 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-white/80 backdrop-blur-sm`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input 
                  type="checkbox" 
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500" 
                />
              </div>
              <div className="ml-3 text-sm">
                <label className="text-gray-600">
                  I agree to the{' '}
                  <a href="/terms" className="text-emerald-600 hover:text-emerald-700 transition-colors">
                    Terms of Service
                  </a>
                  {' '}and{' '}
                  <a href="/privacy" className="text-emerald-600 hover:text-emerald-700 transition-colors">
                    Privacy Policy
                  </a>
                </label>
                {errors.agreeToTerms && <p className="mt-1 text-red-600">{errors.agreeToTerms}</p>}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-2xl font-medium hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-emerald-500/25 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Create Family Hub</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have a family hub?{' '}
              <a href="/" className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
                Sign in here
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
              <button type="button" className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-2xl shadow-sm bg-white/80 backdrop-blur-sm text-sm font-medium text-gray-500 hover:bg-white transition-all">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </button>
              <button type="button" className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-2xl shadow-sm bg-white/80 backdrop-blur-sm text-sm font-medium text-gray-500 hover:bg-white transition-all">
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
              Start your family journey today
            </h2>
            <p className="text-xl text-teal-100 leading-relaxed">
              Join thousands of families who have transformed their daily routines with Lumina.
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
              "Setting up Lumina was so easy! Now our entire family stays organized and connected."
            </p>
            <p className="text-teal-200 text-sm text-center mt-2">- The Martinez Family</p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-32 right-20 w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 left-20 w-40 h-40 bg-gradient-to-br from-teal-500/15 to-blue-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
};

export default SignUp;