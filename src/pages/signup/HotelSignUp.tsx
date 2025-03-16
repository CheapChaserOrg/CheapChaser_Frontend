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

const HotelSignUp = () => {
  const { toast } = useToast();
  const [hotelAmenities, setHotelAmenities] = useState<string[]>([]);
  const [roomFacilities, setRoomFacilities] = useState<string[]>([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/;
    return regex.test(password);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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

    toast({
      title: "Registration Attempted",
      description: "Attempted to register as Hotel",
    });
  };

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
                  <Input id="email" type="email" placeholder="Enter email" required value={email} onChange={(e) => setEmail(e.target.value)} />
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
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                      {[
                        'Single', 'Double', 'Twin', 'Triple', 'Suite', 'Family Room', 'Dormitory'
                      ].map((roomType) => (
                        <div key={roomType} className="flex items-center space-x-2">
                          <Checkbox
                            id={roomType}
                            checked={roomFacilities.includes(roomType)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setRoomFacilities([...roomFacilities, roomType]);
                              } else {
                                setRoomFacilities(roomFacilities.filter(f => f !== roomType));
                              }
                            }}
                          />
                          <label
                            htmlFor={roomType}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {roomType}
                          </label>
                        </div>
                      ))}
                    </div>
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
};

export default HotelSignUp;