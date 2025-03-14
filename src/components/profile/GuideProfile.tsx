import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GuideProfile as GuideProfileType } from "@/types/profile";
import { Award, Calendar, MapPin, Star, Wallet } from "lucide-react";

interface GuideProfileProps {
  profile: GuideProfileType;
}

export function GuideProfile({ profile }: GuideProfileProps) {
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
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-medium">
                  {profile.reviews.length > 0
                    ? (
                        profile.reviews.reduce(
                          (acc, review) => acc + review.rating,
                          0
                        ) / profile.reviews.length
                      ).toFixed(1)
                    : "No reviews yet"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Content */}
      <Tabs defaultValue="trips" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trips">
            <Calendar className="mr-2 h-4 w-4" />
            Assigned Trips
          </TabsTrigger>
          <TabsTrigger value="certifications">
            <Award className="mr-2 h-4 w-4" />
            Certifications
          </TabsTrigger>
          <TabsTrigger value="earnings">
            <Wallet className="mr-2 h-4 w-4" />
            Earnings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trips" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Assigned Trips</CardTitle>
            </CardHeader>
            <CardContent>
              {profile.assignedTrips.map((trip) => (
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

        <TabsContent value="certifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Certifications</CardTitle>
            </CardHeader>
            <CardContent>
              {profile.certifications.map((cert) => (
                <div key={cert.id} className="mb-4 border-b pb-4 last:border-0">
                  <h3 className="font-semibold">{cert.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Issued by {cert.issuedBy}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Issued on {new Date(cert.issuedDate).toLocaleDateString()}
                    {cert.expiryDate &&
                      ` - Expires on ${new Date(
                        cert.expiryDate
                      ).toLocaleDateString()}`}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="earnings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Earnings & Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              {profile.earnings.map((transaction) => (
                <div
                  key={transaction.id}
                  className="mb-4 border-b pb-4 last:border-0"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{transaction.description}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                      <span
                        className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${
                          transaction.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </div>
                    <span
                      className={`font-semibold ${
                        transaction.type === "earning"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.type === "earning" ? "+" : "-"}$
                      {transaction.amount.toFixed(2)}
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