import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TravelerProfile as TravelerProfileType } from "@/types/profile";
import { CalendarDays, Heart, MapPin, Wallet } from "lucide-react";

interface TravelerProfileProps {
  profile: TravelerProfileType;
}

export function TravelerProfile({ profile }: TravelerProfileProps) {
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profile.profilePicture} alt={profile.name} />
              <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">{profile.name}</h2>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="mr-1 h-4 w-4" />
                <span>{profile.contactDetails?.address || "Location not set"}</span>
              </div>
              <p className="text-muted-foreground">{profile.bio}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Content */}
      <Tabs defaultValue="trips" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trips">
            <CalendarDays className="mr-2 h-4 w-4" />
            Trips
          </TabsTrigger>
          <TabsTrigger value="wishlist">
            <Heart className="mr-2 h-4 w-4" />
            Wishlist
          </TabsTrigger>
          <TabsTrigger value="budget">
            <Wallet className="mr-2 h-4 w-4" />
            Budget
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trips" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Trips</CardTitle>
            </CardHeader>
            <CardContent>
              {profile.trips.map((trip) => (
                <div key={trip.id} className="mb-4 border-b pb-4 last:border-0">
                  <h3 className="font-semibold">{trip.destination}</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(trip.startDate).toLocaleDateString()} -{" "}
                    {new Date(trip.endDate).toLocaleDateString()}
                  </p>
                  <span className="inline-block mt-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {trip.status}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wishlist" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Wishlist</CardTitle>
            </CardHeader>
            <CardContent>
              {profile.wishlist.map((item) => (
                <div key={item.id} className="mb-4 border-b pb-4 last:border-0">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Added on {new Date(item.addedAt).toLocaleDateString()}
                  </p>
                  <span className="inline-block mt-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {item.type}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budget" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Budget Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              {profile.budgetTracking.map((entry) => (
                <div key={entry.id} className="mb-4 border-b pb-4 last:border-0">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{entry.category}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(entry.date).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="font-semibold">
                      ${entry.amount.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}