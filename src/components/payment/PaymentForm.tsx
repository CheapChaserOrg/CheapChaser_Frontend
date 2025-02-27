import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

interface PaymentFormProps {
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
  bookingType: 'activity' | 'hotel';
}

const PaymentForm = ({ amount, onSuccess, onCancel, bookingType }: PaymentFormProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Payment Successful!",
        description: `Your ${bookingType} booking has been confirmed.`,
      });
      
      onSuccess();
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Payment Details</h2>
        <p className="text-gray-600">Total Amount: ${amount.toFixed(2)}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">
            Cardholder Name
          </label>
          <Input
            id="cardName"
            type="text"
            placeholder="John Doe"
            required
            className="mt-1"
          />
        </div>

        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
            Card Number
          </label>
          <Input
            id="cardNumber"
            type="text"
            placeholder="1234 5678 9012 3456"
            required
            className="mt-1"
            maxLength={19}
            pattern="\d*"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">
              Expiry Date
            </label>
            <Input
              id="expiry"
              type="text"
              placeholder="MM/YY"
              required
              className="mt-1"
              maxLength={5}
            />
          </div>

          <div>
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
              CVV
            </label>
            <Input
              id="cvv"
              type="password"
              placeholder="123"
              required
              className="mt-1"
              maxLength={4}
            />
          </div>
        </div>

        <div className="flex gap-4 mt-6">
        <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-[#61dafbaa] hover:bg-[#61dafb]"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing
              </>
            ) : (
              `Pay $${amount.toFixed(2)}`
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;