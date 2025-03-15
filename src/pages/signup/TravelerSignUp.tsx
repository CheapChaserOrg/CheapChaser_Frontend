import { useState } from "react";
import { useToast } from "../../components/ui/use-toast";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { Checkbox } from "../../components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Eye, EyeOff } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const TravelerSignUp = () => {
  const { toast } = useToast();
  const [preferences, setPreferences] = useState<string[]>([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validatePassword = (password: string): boolean => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/;
    return regex.test(password);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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

    toast({
      title: "Registration Attempted",
      description: "Attempted to register as Traveler",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 pb-10">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm mt-8">
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Traveler Registration
          </h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" placeholder="Enter your full name" required />
                </div>
                <div>
                  <Label htmlFor="profilePicture">Profile Picture</Label>
                  <Input id="profilePicture" type="file" accept="image/*" />
                </div>
                <div>
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" type="date" required />
                </div>
                <div>
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input id="nationality" placeholder="Enter your nationality" required />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Enter your email" required />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="Enter your phone number" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Address (Optional)</Label>
                  <Textarea id="address" placeholder="Enter your address" />
                </div>
              </div>
            </div>

            {/* Account Security */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Account Security</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" placeholder="Enter your username" required />
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
                  <p className="text-sm text-gray-500 mt-1">
                    Password must be 8-14 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.
                  </p>
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
                  <p className="text-sm text-gray-500 mt-1">
                    Password must be 8-14 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.
                  </p>
                </div>
              </div>
            </div>

            {/* Travel Preferences */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Travel Preferences (Optional)</h2>
              <div className="space-y-4">
                <div>
                  <Label>Preferred Activities</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {[
                      'Surfing', 'Hiking', 'Wildlife', 'Historical Tours',
                      'Adventure Sports', 'Cultural Experiences', 'Beach Activities',
                      'Food Tours', 'Photography'
                    ].map((preference) => (
                      <div key={preference} className="flex items-center space-x-2">
                        <Checkbox
                          id={preference}
                          checked={preferences.includes(preference)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setPreferences([...preferences, preference]);
                            } else {
                              setPreferences(preferences.filter(p => p !== preference));
                            }
                          }}
                        />
                        <label htmlFor={preference} className="text-sm">
                          {preference}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="budgetRange">Budget Range</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="budget">Budget ($0-$50/day)</SelectItem>
                      <SelectItem value="moderate">Moderate ($50-$150/day)</SelectItem>
                      <SelectItem value="luxury">Luxury ($150+/day)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Additional Features */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Additional Features</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="newsletter" />
                  <Label htmlFor="newsletter">Subscribe to Newsletter</Label>
                </div>
                <div>
                  <Label htmlFor="referralCode">Referral Code (Optional)</Label>
                  <Input id="referralCode" placeholder="Enter referral code" />
                </div>
              </div>
            </div>

            {/* Legal Compliance */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" required />
                <Label htmlFor="terms">
                  I agree to the Terms & Conditions and Privacy Policy
                </Label>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Register as Traveler
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TravelerSignUp;