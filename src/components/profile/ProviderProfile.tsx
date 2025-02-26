import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProviderProfile as ProviderProfileType } from "@/types/profile";
import {
  Calendar,
  ImageIcon,
  MapPin,
  Percent,
  Star,
  Wallet,
} from "lucide-react";

interface ProviderProfileProps {
  profile: ProviderProfileType;
}

export function ProviderProfile({ profile }: ProviderProfileProps) {
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
              <h2 className="text-2xl font-bold">
                {profile.businessInfo.businessName}
              </h2>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="mr-1 h-4 w-4" />
                <span>{profile.businessInfo.location}</span>
              </div>
              <p className="text-muted-foreground">
                {profile.businessInfo.description}
              </p>
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
      <Tabs defaultValue="services" className="space-y-4">
        <TabsList>
          <TabsTrigger value="services">
            <Calendar className="mr-2 h-4 w-4" />
            Services
          </TabsTrigger>
          <TabsTrigger value="gallery">
            <ImageIcon className="mr-2 h-4 w-4" />
            Gallery
          </TabsTrigger>
          <TabsTrigger value="promotions">
            <Percent className="mr-2 h-4 w-4" />
            Promotions
          </TabsTrigger>
          <TabsTrigger value="earnings">
            <Wallet className="mr-2 h-4 w-4" />
            Earnings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Services & Availability</CardTitle>
            </CardHeader>
            <CardContent>
              {profile.services.map((service) => (
                <div key={service.id} className="mb-4 border-b pb-4 last:border-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{service.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {service.description}
                      </p>
                    </div>
                    <span className="font-semibold">
                      ${service.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gallery" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gallery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {profile.gallery.map((item) => (
                  <div
                    key={item.id}
                    className="relative aspect-square rounded-lg overflow-hidden"
                  >
                    {item.type === "image" ? (
                      <img
                        src={item.url}
                        alt={item.caption || "Gallery image"}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <video
                        src={item.url}
                        className="object-cover w-full h-full"
                        controls
                      />
                    )}
                    {item.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm">
                        {item.caption}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="promotions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Promotions</CardTitle>
            </CardHeader>
            <CardContent>
              {profile.promotions.map((promo) => (
                <div key={promo.id} className="mb-4 border-b pb-4 last:border-0">
                  <h3 className="font-semibold">{promo.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {promo.description}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Valid until {new Date(promo.endDate).toLocaleDateString()}
                    </span>
                    <span className="font-semibold text-primary">
                      {promo.discount}% OFF
                    </span>
                  </div>
                  {promo.code && (
                    <div className="mt-2 inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                      Code: {promo.code}
                    </div>
                  )}
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