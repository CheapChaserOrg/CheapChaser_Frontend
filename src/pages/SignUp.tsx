import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useToast } from '../components/ui/use-toast';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'; // Import icons for show/hide password

const SignUp = () => {
  const { userType } = useParams<{ userType: string }>();
  const { toast } = useToast();
  const [hotelAmenities, setHotelAmenities] = useState<string[]>([]);
  const [roomFacilities, setRoomFacilities] = useState<string[]>([]);
  const [services, setServices] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [preferences, setPreferences] = useState<string[]>([]);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password validation function
  const validatePassword = (password: string): boolean => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/;
    return regex.test(password);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate password
    if (!validatePassword(password)) {
      toast({
        title: "Invalid Password",
        description: "Password must be 8-14 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
        variant: "destructive",
      });
      return;
    }

    // Check if passwords match
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
      description: `Attempted to register as ${userType}`,
    });
  };

  if (userType === 'guide') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-20 pb-10">
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm mt-8">
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Guide Registration
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
                    <Label htmlFor="gender">Gender</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="nationality">Nationality</Label>
                    <Input id="nationality" placeholder="Enter your nationality" required />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Languages Spoken</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                      {[
                        'English', 'Sinhala', 'Tamil', 'German', 'French', 'Chinese',
                        'Japanese', 'Korean', 'Russian'
                      ].map((language) => (
                        <div key={language} className="flex items-center space-x-2">
                          <Checkbox
                            id={language}
                            checked={languages.includes(language)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setLanguages([...languages, language]);
                              } else {
                                setLanguages(languages.filter(l => l !== language));
                              }
                            }}
                          />
                          <label htmlFor={language} className="text-sm">
                            {language}
                          </label>
                        </div>
                      ))}
                    </div>
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
                    <Input id="phone" type="tel" placeholder="Enter your phone number" required />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" placeholder="Enter your address" required />
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
                  </div><br></br>
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

              {/* Professional Details */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Professional Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="guideType">Guide Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select guide type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cultural">Cultural Guide</SelectItem>
                        <SelectItem value="wildlife">Wildlife Guide</SelectItem>
                        <SelectItem value="hiking">Hiking Guide</SelectItem>
                        <SelectItem value="adventure">Adventure Guide</SelectItem>
                        <SelectItem value="city">City Tour Guide</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input id="experience" type="number" min="0" placeholder="Enter years of experience" required />
                  </div>
                  <div>
                    <Label htmlFor="licenseNumber">Tourist Board License Number</Label>
                    <Input id="licenseNumber" placeholder="Enter license number" />
                  </div>
                  <div>
                    <Label htmlFor="license">Upload License/Certification</Label>
                    <Input id="license" type="file" accept=".pdf,.jpg,.jpeg,.png" />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Services Offered</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                      {[
                        'Private Tours', 'Group Tours', 'Airport Pickup', 'Hiking',
                        'Safari', 'City Tours', 'Cultural Tours', 'Photography Tours'
                      ].map((service) => (
                        <div key={service} className="flex items-center space-x-2">
                          <Checkbox
                            id={service}
                            checked={services.includes(service)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setServices([...services, service]);
                              } else {
                                setServices(services.filter(s => s !== service));
                              }
                            }}
                          />
                          <label htmlFor={service} className="text-sm">
                            {service}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing & Payments */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Pricing & Payments</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hourlyRate">Hourly Rate (USD)</Label>
                    <Input id="hourlyRate" type="number" min="0" placeholder="Enter hourly rate" required />
                  </div>
                  <div>
                    <Label htmlFor="dailyRate">Full-Day Rate (USD)</Label>
                    <Input id="dailyRate" type="number" min="0" placeholder="Enter daily rate" required />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="bankDetails">Bank Account Details</Label>
                    <Textarea id="bankDetails" placeholder="Enter bank account details" required />
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
                Register as Guide
              </Button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (userType === 'traveler') {
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
                  </div><br></br>
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
  }

  if (userType === 'activity-provider') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-20 pb-10">
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm mt-8">
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Activity Provider Registration
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Business Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Business Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input id="businessName" placeholder="Enter business name" required />
                  </div>
                  <div>
                    <Label htmlFor="businessType">Business Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="adventure">Adventure Sports</SelectItem>
                        <SelectItem value="cultural">Cultural Tours</SelectItem>
                        <SelectItem value="nature">Nature & Wildlife</SelectItem>
                        <SelectItem value="water">Water Activities</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="registrationNumber">Business Registration Number</Label>
                    <Input id="registrationNumber" placeholder="Enter registration number" required />
                  </div>
                  <div>
                    <Label htmlFor="certificate">Business Registration Certificate</Label>
                    <Input id="certificate" type="file" accept=".pdf,.jpg,.jpeg,.png" required />
                  </div>
                  <div>
                    <Label htmlFor="tin">Tax Identification Number (Optional)</Label>
                    <Input id="tin" placeholder="Enter TIN" />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactName">Full Name of Contact Person</Label>
                    <Input id="contactName" placeholder="Enter contact person's name" required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="Enter email" required />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number (WhatsApp optional)</Label>
                    <Input id="phone" type="tel" placeholder="Enter phone number" required />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Business Address</Label>
                    <Textarea id="address" placeholder="Enter business address" required />
                  </div>
                  <div>
                    <Label htmlFor="website">Website or Social Media Links</Label>
                    <Input id="website" type="url" placeholder="Enter website or social media links" />
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
                  </div><br></br>
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

              {/* Activity Details */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Activity Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="activityName">Activity Name</Label>
                    <Input id="activityName" placeholder="e.g., Surfing Lessons" required />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="water-sports">Water & Adventure Sports</SelectItem>
                        <SelectItem value="nature">Nature & Wildlife Experiences</SelectItem>
                        <SelectItem value="hiking">Hiking & Trekking</SelectItem>
                        <SelectItem value="cultural">Cultural & Historical Activities</SelectItem>
                        <SelectItem value="extreme">Extreme Adventure & Airborne Activities</SelectItem>
                        <SelectItem value="cycling">Cycling & Eco-Tours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="description">Activity Description</Label>
                    <Textarea id="description" placeholder="Enter activity description" required />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="arugam-bay">Arugam Bay</SelectItem>
                        <SelectItem value="ella">Ella</SelectItem>
                        <SelectItem value="kandy">Kandy</SelectItem>
                        <SelectItem value="sigiriya">Sigiriya</SelectItem>
                        <SelectItem value="galle">Galle</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="photos">Upload Photos of Activity</Label>
                    <Input id="photos" type="file" accept="image/*" multiple />
                  </div>
                </div>
              </div>

              {/* Pricing & Availability */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Pricing & Availability</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pricing">Base Price</Label>
                    <Input id="pricing" type="number" min="0" placeholder="Per person/group" required />
                  </div>
                  <div>
                    <Label htmlFor="groupDiscounts">Group Discounts Available?</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="cancellationPolicy">Cancellation Policy</Label>
                    <Textarea id="cancellationPolicy" placeholder="Enter cancellation policy" required />
                  </div>
                </div>
              </div>

              {/* Payment & Legal Compliance */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Payment & Legal Compliance</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label>Accepted Payment Methods</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="bankTransfer" />
                        <Label htmlFor="bankTransfer">Bank Transfer</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="onlinePayment" />
                        <Label htmlFor="onlinePayment">Online Payment</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="cash" />
                        <Label htmlFor="cash">Cash</Label>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="bankDetails">Bank Account Details</Label>
                    <Textarea id="bankDetails" placeholder="Enter bank account details" required />
                  </div>
                  <div>
                    <Label htmlFor="insurance">Liability Insurance</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="insuranceProof">Upload Insurance Proof</Label>
                    <Input id="insuranceProof" type="file" accept=".pdf,.jpg,.jpeg,.png" />
                  </div>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms">
                    I agree to the Terms & Conditions
                  </Label>
                </div>
              </div>

              <Button type="submit" className="w-full">
                Register as Activity Provider
              </Button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (userType === 'hotel') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-20 pb-10">
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm mt-8">
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Hotel Registration
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Hotel Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Hotel Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hotelName">Hotel Name</Label>
                    <Input id="hotelName" placeholder="Enter hotel name" required />
                  </div>
                  <div>
                    <Label htmlFor="hotelType">Hotel Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select hotel type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hotel">Hotel</SelectItem>
                        <SelectItem value="resort">Resort</SelectItem>
                        <SelectItem value="guesthouse">Guesthouse</SelectItem>
                        <SelectItem value="hostel">Hostel</SelectItem>
                        <SelectItem value="boutique">Boutique Hotel</SelectItem>
                        <SelectItem value="homestay">Homestay</SelectItem>
                        <SelectItem value="bungalow">Bungalow</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="starRating">Star Rating</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select star rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1★</SelectItem>
                        <SelectItem value="2">2★</SelectItem>
                        <SelectItem value="3">3★</SelectItem>
                        <SelectItem value="4">4★</SelectItem>
                        <SelectItem value="5">5★</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="regNumber">Business Registration Number</Label>
                    <Input id="regNumber" placeholder="Enter registration number" required />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactName">Full Name of Contact Person</Label>
                    <Input id="contactName" placeholder="Enter contact person's name" required />
                  </div>
                  <div>
                    <Label htmlFor="designation">Designation</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select designation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="owner">Owner</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="Enter email" required />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="Enter phone number" required />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Hotel Address</Label>
                    <Textarea id="address" placeholder="Enter hotel address" required />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="website">Hotel Website & Social Media Links</Label>
                    <Input id="website" placeholder="Enter website or social media links" />
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
                  </div><br></br>
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

              {/* Location & Accessibility */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Location & Accessibility</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="coordinates">GPS Coordinates</Label>
                    <Input id="coordinates" placeholder="e.g., 6.927079, 79.861243" />
                  </div>
                  <div>
                    <Label htmlFor="attractions">Nearby Attractions</Label>
                    <Input id="attractions" placeholder="e.g., 5km from Sigiriya" />
                  </div>
                  <div>
                    <Label>Airport Shuttle Service</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Accommodation Details */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Accommodation Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="roomCount">Number of Rooms</Label>
                    <Input id="roomCount" type="number" min="1" placeholder="Enter number of rooms" required />
                  </div>
                  <div>
                    <Label>Room Types Available</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select room types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="double">Double</SelectItem>
                        <SelectItem value="twin">Twin</SelectItem>
                        <SelectItem value="triple">Triple</SelectItem>
                        <SelectItem value="suite">Suite</SelectItem>
                        <SelectItem value="family">Family Room</SelectItem>
                        <SelectItem value="dormitory">Dormitory</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Label>Room Facilities</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                      {[
                        'AC', 'WiFi', 'TV', 'Mini Bar', 'Balcony', 'Private Bathroom',
                        'Hot Water', 'Safe', 'Kitchenette'
                      ].map((facility) => (
                        <div key={facility} className="flex items-center space-x-2">
                          <Checkbox
                            id={facility}
                            checked={roomFacilities.includes(facility)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setRoomFacilities([...roomFacilities, facility]);
                              } else {
                                setRoomFacilities(roomFacilities.filter(f => f !== facility));
                              }
                            }}
                          />
                          <label
                            htmlFor={facility}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {facility}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Hotel Amenities & Services */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Hotel Amenities & Services</h2>
                <div className="space-y-4">
                  <div>
                    <Label>General Facilities</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                      {[
                        'Restaurant', 'Swimming Pool', 'Gym', 'Spa', 'Parking', 'Bar',
                        'Business Center', 'Laundry Service', 'Room Service'
                      ].map((amenity) => (
                        <div key={amenity} className="flex items-center space-x-2">
                          <Checkbox
                            id={amenity}
                            checked={hotelAmenities.includes(amenity)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setHotelAmenities([...hotelAmenities, amenity]);
                              } else {
                                setHotelAmenities(hotelAmenities.filter(a => a !== amenity));
                              }
                            }}
                          />
                          <label
                            htmlFor={amenity}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {amenity}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing & Availability */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Pricing & Availability</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="basePrice">Base Room Price (Per Night)</Label>
                    <Input id="basePrice" type="number" min="0" placeholder="Enter base price" required />
                  </div>
                  <div>
                    <Label>Meal Plans</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select meal plan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="room-only">Room Only</SelectItem>
                        <SelectItem value="bed-breakfast">Bed & Breakfast</SelectItem>
                        <SelectItem value="half-board">Half Board</SelectItem>
                        <SelectItem value="full-board">Full Board</SelectItem>
                        <SelectItem value="all-inclusive">All Inclusive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="cancellation">Cancellation Policy</Label>
                    <Textarea id="cancellation" placeholder="Enter cancellation policy" required />
                  </div>
                </div>
              </div>

              {/* Legal Compliance */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Legal Compliance</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms">
                      I agree to the Terms & Conditions and Privacy Policy
                    </Label>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full">
                Register Hotel
              </Button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 pb-10">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm mt-8">
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Sign Up as {userType?.charAt(0).toUpperCase() + userType?.slice(1)}
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                required
              />
            </div>

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
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
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

            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;