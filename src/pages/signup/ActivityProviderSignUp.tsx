import { useState, useEffect } from "react";
import { useToast } from "../../components/ui/use-toast";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Checkbox } from "../../components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { db, auth } from "../../firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";

const ActivityProviderSignUp = () => {
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [activityName, setActivityName] = useState("");
  const [location, setLocation] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [description, setDescription] = useState("");
  const [activityTypes, setActivityTypes] = useState<string[]>([]);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const navigate = useNavigate();

  // Validate email format
  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Validate password format
  const validatePassword = (password: string): boolean => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/;
    return regex.test(password);
  };

  // Check if username already exists in Firestore
  const checkUsernameExists = async (username: string) => {
    const q = query(collection(db, "activityProviders"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreeToTerms) {
      toast({
        title: "Terms Not Accepted",
        description: "You must agree to the Terms and Conditions to proceed.",
        variant: "destructive",
      });
      return;
    }

    if (!validateEmail(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    if (!validatePassword(password)) {
      toast({
        title: "Invalid Password",
        description: "Password must be 8-14 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    if (await checkUsernameExists(username)) {
      setUsernameError("Username already exists. Please choose a different one.");
      return;
    }

    try {
      // Step 1: Register user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Step 2: Save additional user data in Firestore
      await addDoc(collection(db, "activityProviders"), {
        uid: user.uid, // Link Firestore document with Firebase Authentication user
        username,
        email,
        activityName,
        location,
        contactNumber,
        description,
        activityTypes,
      });

      // Success message
      toast({
        title: "Registration Successful",
        description: "You have successfully registered as an activity provider!",
      });

      // Clear the form
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setActivityName("");
      setLocation("");
      setContactNumber("");
      setDescription("");
      setActivityTypes([]);
      setAgreeToTerms(false);

      // Redirect to the activity provider's profile page
      navigate("/activity-provider/profile");
    } catch (error: any) {
      console.error("Error during registration:", error);
      toast({
        title: "Registration Failed",
        description: error.message || "There was an error during registration.",
        variant: "destructive",
      });
    }
  };

  // Validate password in real-time
  useEffect(() => {
    if (password.length > 0 && !validatePassword(password)) {
      setPasswordError("Password must be 8-14 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
    } else {
      setPasswordError("");
    }
  }, [password]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 pb-10">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm mt-8">
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">Activity Provider Registration</h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="Enter your username"
                    required
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setUsernameError("");
                    }}
                  />
                  {usernameError && <p className="text-sm text-red-500">{usernameError}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
            </div>

            {/* Activity Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Activity Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="activityName">Activity Name</Label>
                  <Input id="activityName" placeholder="Enter your activity name" required value={activityName} onChange={(e) => setActivityName(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Enter your activity location" required value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="contactNumber">Contact Number</Label>
                  <Input id="contactNumber" placeholder="Enter your contact number" required value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" placeholder="Enter a brief description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
              </div>
            </div>

            {/* Activity Types */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Activity Types</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {[
                  "Hiking",
                  "Surfing",
                  "Cultural Tours",
                  "Adventure Sports",
                  "Food Tours",
                  "Wildlife Safaris",
                ].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={type}
                      checked={activityTypes.includes(type)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setActivityTypes([...activityTypes, type]);
                        } else {
                          setActivityTypes(activityTypes.filter((t) => t !== type));
                        }
                      }}
                    />
                    <label htmlFor={type} className="text-sm">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Account Security */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Account Security</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Legal Compliance */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreeToTerms}
                  onCheckedChange={(checked) => setAgreeToTerms(!!checked)}
                />
                <Label htmlFor="terms">
                  I agree to the Terms & Conditions and Privacy Policy
                </Label>
              </div>
            </div>

            {agreeToTerms && (
              <Button type="submit" className="w-full">
                Register as Activity Provider
              </Button>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ActivityProviderSignUp;