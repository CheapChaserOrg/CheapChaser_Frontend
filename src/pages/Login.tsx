import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useToast } from '../components/ui/use-toast';
import { useState } from 'react';
import { auth, db } from "../firebase";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { Separator } from '../components/ui/separator';
import { collection, query, where, getDocs } from "firebase/firestore";

const Login = () => {
  const { userType } = useParams<{ userType: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeToTerms) {
      toast({
        title: "Terms Not Accepted",
        description: "You must agree to the Terms and Conditions to proceed.",
        variant: "destructive",
      });
      return;
    }

    let email = emailOrUsername;

    // If the input is not an email, assume it's a username and fetch the corresponding email
    if (!validateEmail(emailOrUsername)) {
      try {
        const q = query(collection(db, userType + "s"), where("username", "==", emailOrUsername));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          toast({
            title: "Invalid Username",
            description: "No user found with this username.",
            variant: "destructive",
          });
          return;
        }
        email = querySnapshot.docs[0].data().email; // Get the email associated with the username
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to fetch user details.",
          variant: "destructive",
        });
        return;
      }
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({ title: "Login Successful", description: `Welcome back, ${userType}!` });

      // Fetch user profile from Firestore
      const q = query(collection(db, userType + "s"), where("email", "==", email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userProfile = querySnapshot.docs[0].data();
        localStorage.setItem("userProfile", JSON.stringify(userProfile)); // Store profile in localStorage
        navigate(`/${userType}/profile`); // Redirect to profile page
      } else {
        toast({
          title: "Profile Not Found",
          description: "Your profile could not be found.",
          variant: "destructive",
        });
      }
    } catch (err: any) {
      let errorMessage = "Login failed. Please try again.";
      if (err.code === "auth/invalid-email") {
        errorMessage = "Invalid email address.";
      } else if (err.code === "auth/wrong-password") {
        errorMessage = "Incorrect password.";
      } else if (err.code === "auth/user-not-found") {
        errorMessage = "No user found with this email.";
      }
      setError(errorMessage);
      toast({ title: "Login Failed", description: errorMessage, variant: "destructive" });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      toast({ title: "Login Successful", description: "You are now signed in with Google." });
      navigate("/");
    } catch (err: any) {
      setError(err.message);
      toast({ title: "Login Failed", description: err.message, variant: "destructive" });
    }
  };

  const handleForgotPassword = async () => {
    if (!emailOrUsername) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to reset your password.",
        variant: "destructive",
      });
      return;
    }

    let email = emailOrUsername;

    // If the input is not an email, assume it's a username and fetch the corresponding email
    if (!validateEmail(emailOrUsername)) {
      try {
        const q = query(collection(db, userType + "s"), where("username", "==", emailOrUsername));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          toast({
            title: "Invalid Username",
            description: "No user found with this username.",
            variant: "destructive",
          });
          return;
        }
        email = querySnapshot.docs[0].data().email; // Get the email associated with the username
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to fetch user details.",
          variant: "destructive",
        });
        return;
      }
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast({
        title: "Password Reset Email Sent",
        description: "Please check your email to reset your password.",
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  const formattedUserType = userType ? userType.charAt(0).toUpperCase() + userType.slice(1) : "User";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Welcome back, {formattedUserType}!
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please enter your details to sign in.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Email or Username"
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{" "}
                  <a href="/terms-and-conditions" className="text-blue-600 hover:underline">
                    Terms and Conditions
                  </a>
                </label>
              </div>
              <a href="#" className="text-sm text-primary hover:underline" onClick={handleForgotPassword}>
                Forgot password?
              </a>
            </div>
            <Button type="submit" className="w-full hover:white" disabled={!agreeToTerms}>
              Sign in
            </Button>
          </form>

          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6">
            <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign in with Google
            </Button>
          </div>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Don't have an account? </span>
            <a href={`/signup/${userType}`} className="text-primary hover:underline">
              Sign up
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;