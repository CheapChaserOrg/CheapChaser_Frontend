<<<<<<< Updated upstream
=======
import { useState } from "react";
>>>>>>> Stashed changes
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { useToast } from "../components/ui/use-toast";

const Contact = () => {
  const { toast } = useToast();
<<<<<<< Updated upstream

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
=======
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/meoebdrb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "We'll get back to you as soon as possible.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" }); // Clear form
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Network Error",
        description: "Unable to send message. Check your internet connection.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
>>>>>>> Stashed changes
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gradient-to-b from-primary/10 to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16 animate-fade-up">
            <h1 className="text-4xl font-bold text-primary mb-4">Get in Touch</h1>
            <p className="text-lg text-gray-600">
              We'd love to hear from you. Let us help plan your perfect Sri Lankan adventure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Information */}
            <div className="space-y-8 p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg animate-fade-up">
              <h2 className="text-2xl font-semibold text-primary">Contact Information</h2>
              
              <div className="space-y-6">
                <ContactItem 
                  icon={<Mail className="text-primary" />}
                  title="Email"
                  detail="cheapchaser001@gmail.com"
                />
                <ContactItem 
                  icon={<Phone className="text-primary" />}
                  title="Phone"
                  detail="+94 11 709 472"
                />
                <ContactItem 
                  icon={<MapPin className="text-primary" />}
                  title="Address"
                  detail="123 Temple Road, Colombo 03, Sri Lanka"
                />
                <ContactItem 
                  icon={<MessageSquare className="text-primary" />}
                  title="Social Media"
                  detail="CheapChaser.travel"
                />
              </div>

              <div className="mt-8 p-4 bg-muted rounded-lg">
                <p className="text-sm text-gray-600">
                  Our team typically responds within 24 hours during business days.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6 p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg animate-fade-up">
              <h2 className="text-2xl font-semibold text-primary mb-6">Send us a Message</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
<<<<<<< Updated upstream
                  <Input id="name" placeholder="Your name" required />
=======
                  <Input id="name" placeholder="Your name" required value={formData.name} onChange={handleChange} />
>>>>>>> Stashed changes
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
<<<<<<< Updated upstream
                  <Input id="email" type="email" placeholder="your@email.com" required />
=======
                  <Input id="email" type="email" placeholder="your@email.com" required value={formData.email} onChange={handleChange} />
>>>>>>> Stashed changes
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
<<<<<<< Updated upstream
                  <Input id="subject" placeholder="How can we help?" required />
=======
                  <Input id="subject" placeholder="How can we help?" required value={formData.subject} onChange={handleChange} />
>>>>>>> Stashed changes
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us more about your travel plans..." 
                    className="min-h-[150px]"
                    required 
<<<<<<< Updated upstream
=======
                    value={formData.message}
                    onChange={handleChange}
>>>>>>> Stashed changes
                  />
                </div>
              </div>

<<<<<<< Updated upstream
              <Button type="submit" className="w-full">
                Send Message
=======
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
>>>>>>> Stashed changes
              </Button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const ContactItem = ({ 
  icon, 
  title, 
  detail 
}: { 
  icon: React.ReactNode; 
  title: string; 
  detail: string;
}) => (
  <div className="flex items-start space-x-4">
    <div className="p-2 bg-primary/10 rounded-lg">
      {icon}
    </div>
    <div>
      <h3 className="font-medium text-gray-900">{title}</h3>
      <p className="text-gray-600">{detail}</p>
    </div>
  </div>
);

<<<<<<< Updated upstream
export default Contact;
=======
export default Contact;
>>>>>>> Stashed changes
