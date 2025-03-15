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

const ActivityProviderSignUp = () => {
  const { toast } = useToast();
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
      description: "Attempted to register as Activity Provider",
    });
  };

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
};

export default ActivityProviderSignUp;