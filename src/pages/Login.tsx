import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useToast } from '../components/ui/use-toast';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'; // Icons for show/hide password
import { Checkbox } from '../components/ui/checkbox'; // Import Checkbox component

const Login = () => {
  const { userType } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false); // Track success state
  const [showPassword, setShowPassword] = useState(false); // Track password visibility
  const [agreeToTerms, setAgreeToTerms] = useState(false); // Track if user agrees to terms
  const [password, setPassword] = useState(''); // Track password input

  // Password validation function
  const validatePassword = (password: string) => {
    const hasUppercase = /[A-Z]/.test(password); // Check for uppercase letters
    const hasLowercase = /[a-z]/.test(password); // Check for lowercase letters
    const hasNumber = /[0-9]/.test(password); // Check for numbers
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password); // Check for special characters
    const isLengthValid = password.length >= 8 && password.length <= 14; // Check length

    return hasUppercase && hasLowercase && hasNumber && hasSpecialChar && isLengthValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the user has agreed to the terms and conditions
    if (!agreeToTerms) {
      toast({
        title: "Terms Not Accepted",
        description: "You must agree to the Terms and Conditions to proceed.",
        variant: "destructive",
      });
      return;
    }

    // Validate password
    if (!validatePassword(password)) {
      toast({
        title: "Invalid Password",
        description:
          "Password must be 8-14 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
        variant: "destructive",
      });
      return;
    }

    // Simulate a successful login
    try {
      // Here, you would typically send the login credentials to your backend API
      // For now, we'll simulate a successful response
      setIsSuccess(true); // Set success state to true
      toast({
        title: "Login Successful",
        description: `Welcome back, ${userType}!`,
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    }
  };

  // If login is successful, display a success message
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-20 pb-10">
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm mt-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              🎉 Login Successful!
            </h1>
            <p className="text-gray-600 mb-8">
              Welcome back, {userType}! You can now proceed to the home page.
            </p>
            <Button onClick={() => navigate('/')}> {/* Redirect to index.tsx */}
              Go to Home
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Dynamic welcome message and description based on user type
  const getWelcomeMessage = () => {
    switch (userType) {
      case 'guide':
        return {
          title: "Welcome back, Guide!",
          description: "Sign in to your account to continue guiding travelers.",
        };
      case 'traveler':
        return {
          title: "Welcome back, Traveler!",
          description: "Sign in to your account to continue your travel journey.",
        };
      case 'activity-provider':
        return {
          title: "Welcome back, Activity Provider!",
          description: "Sign in to your account to manage your activities.",
        };
      case 'hotel':
        return {
          title: "Welcome back, Hotel Partner!",
          description: "Sign in to your account to manage your hotel listings.",
        };
      default:
        return {
          title: "Welcome back!",
          description: "Sign in to your account to continue.",
        };
    }
  };

  const { title, description } = getWelcomeMessage();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 pb-10">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm mt-8">
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
            {title}
          </h1>
          <p className="text-center text-gray-600 mb-8">
            {description}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"} // Toggle between text and password
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update password state
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500" /> // Hide password icon
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500" /> // Show password icon
                  )}
                </button>
              </div>
              {password && !validatePassword(password) && (
                <p className="text-sm text-red-600 mt-1">
                  Password must be 8-14 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.
                </p>
              )}
            </div>

            <div className="text-right">
              <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={agreeToTerms}
                onCheckedChange={(checked) => setAgreeToTerms(!!checked)}
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{" "}
                <a href="/terms-and-conditions" className="text-blue-600 hover:underline">
                  Terms and Conditions
                </a>
              </label>
            </div>

            <Button type="submit" className="w-full" disabled={!agreeToTerms || !validatePassword(password)}>
              Sign in
            </Button>
          </form>

          <div className="text-center mt-4">
            <span className="text-gray-600">Don't have an account? </span>
            <a href={`/signup/${userType}`} className="text-blue-600 hover:underline">
              Sign up as {userType}
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;