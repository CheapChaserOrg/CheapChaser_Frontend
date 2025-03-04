import { useToast } from '../components/ui/use-toast';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

const GuideLogin = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here
    toast({
      title: "Login Attempted",
      description: "Attempted to login as Guide",
    });
  };

  const handleGoogleLoginSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if ('profileObj' in response) {
      const { profileObj } = response;
      toast({
        title: "Google Login Successful",
        description: `Welcome, ${profileObj.name}!`,
      });
      // Redirect or handle user data
    }
  };

  const handleGoogleLoginFailure = (error: any) => {
    toast({
      title: "Google Login Failed",
      description: error.error,
      variant: "destructive",
    });
  };

  const handleFacebookLoginSuccess = (response: any) => {
    toast({
      title: "Facebook Login Successful",
      description: `Welcome, ${response.name}!`,
    });
    // Redirect or handle user data
  };

  const handleFacebookLoginFailure = (error: any) => {
    toast({
      title: "Facebook Login Failed",
      description: error.error,
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Guide Login
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full">
                Login as Guide
              </Button>
            </div>

            <div className="text-center">
              <span className="text-gray-600">Or</span>
            </div>

            <div className="space-y-4">
              <GoogleLogin
                clientId="YOUR_GOOGLE_CLIENT_ID"
                buttonText="Login with Google"
                onSuccess={handleGoogleLoginSuccess}
                onFailure={handleGoogleLoginFailure}
                cookiePolicy={'single_host_origin'}
                className="w-full"
              />
              <FacebookLogin
                appId="YOUR_FACEBOOK_APP_ID"
                autoLoad={false}
                fields="name,email,picture"
                callback={handleFacebookLoginSuccess}
                onFailure={handleFacebookLoginFailure}
                cssClass="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                textButton="Login with Facebook"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GuideLogin;