import { useState, useEffect } from "react";
import { useToast } from "../../components/ui/use-toast";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Checkbox } from "../../components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { db } from "../../firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";

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
  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/;
    return regex.test(password);
  };

  const checkUsernameExists = async (username: string) => {
    const q = query(collection(db, "activityProviders"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

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
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (await checkUsernameExists(username)) {
      setUsernameError("Username already exists. Please choose a different one.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "activityProviders"), {
        username,
        email,
        password, // Note: Never store plain passwords in production. Use Firebase Authentication instead.
        businessName,
        businessAddress,
        registrationNumber,
      });
      console.log("Activity Provider document written with ID: ", docRef.id);

      toast({
        title: "Registration Successful",
        description: "You have successfully registered as an activity provider!",
      });

      // Clear the form
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setBusinessName("");
      setBusinessAddress("");
      setRegistrationNumber("");
      setAgreeToTerms(false);

      // Redirect to the activity provider's profile page
      navigate("/activity-provider/profile/TravellerProfile");
    } catch (error) {
      console.error("Error adding document: ", error);
      toast({
        title: "Registration Failed",
        description: "There was an error during registration.",
        variant: "destructive",
      });
    }
  };

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
            {/* Business Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Business Information</h2>
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
                  <Input id="email" type="email" placeholder="Enter email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input id="businessName" placeholder="Enter your business name" required value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="businessAddress">Business Address</Label>
                  <Input id="businessAddress" placeholder="Enter your business address" required value={businessAddress} onChange={(e) => setBusinessAddress(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="registrationNumber">Registration Number</Label>
                  <Input id="registrationNumber" placeholder="Enter your registration number" required value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value)} />
                </div>
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

            {/* Activity Details */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Activity Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="activityName">Activity Name</Label>
                  <Input id="activityName" placeholder="e.g., Surfing Lessons" required />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="description">Activity Description</Label>
                  <Textarea id="description" placeholder="Enter activity description" required />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Enter activity location" required />
                </div>
                <div>
                  <Label htmlFor="operatingHours">Operating Hours</Label>
                  <Input id="operatingHours" placeholder="e.g., 9 AM - 5 PM" required />
                </div>
                <div>
                  <Label htmlFor="minGroup">Minimum Group Size</Label>
                  <Input id="minGroup" type="number" min="1" placeholder="Enter minimum group size" required />
                </div>
                <div>
                  <Label htmlFor="maxGroup">Maximum Group Size</Label>
                  <Input id="maxGroup" type="number" min="1" placeholder="Enter maximum group size" required />
                </div>
                <div>
                  <Label htmlFor="ageRestrictions">Age Restrictions</Label>
                  <Input id="ageRestrictions" placeholder="e.g., Minimum age 12" />
                </div>
                <div>
                  <Label htmlFor="safetyEquipment">Safety Equipment Provided?</Label>
                  <Input id="safetyEquipment" placeholder="e.g., Yes or No" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="photos">Upload Photos of Activity</Label>
                  <Input id="photos" type="file" accept="image/*" multiple />
                </div>
              </div>
            </div>

            {/* Payment & Legal Compliance */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Payment & Legal Compliance</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="bankDetails">Bank Account Details</Label>
                  <Textarea id="bankDetails" placeholder="Enter bank account details" required />
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreeToTerms}
                  onCheckedChange={(checked) => setAgreeToTerms(!!checked)}
                />
                <Label htmlFor="terms">
                  I agree to the Terms & Conditions
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