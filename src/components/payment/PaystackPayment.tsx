
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Loader2, CreditCard, Check } from 'lucide-react';

interface PaymentData {
  email: string;
  amount: number;  // in the smallest currency unit (kobo for NGN)
  reference: string;
  currency?: string;
  metadata?: Record<string, any>;
}

interface PaystackPaymentProps {
  amount: number;
  onSuccess?: (reference: string) => void;
  onCancel?: () => void;
  currency?: string;
  metadata?: Record<string, any>;
  buttonText?: string;
  className?: string;
}

const PaystackPayment: React.FC<PaystackPaymentProps> = ({
  amount,
  onSuccess,
  onCancel,
  currency = 'NGN',
  metadata,
  buttonText = 'Pay Now',
  className
}) => {
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  const { toast } = useToast();
  
  const generateReference = () => {
    const timestamp = new Date().getTime();
    return `tx-${timestamp}-${Math.floor(Math.random() * 1000)}`;
  };
  
  const handlePayment = () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }
    
    setShowDialog(true);
  };
  
  const processPayment = () => {
    // Validate inputs
    if (!cardNumber || !expiry || !cvv) {
      toast({
        title: "Missing information",
        description: "Please fill in all card details",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    // In a real application, this would call the Paystack API
    // For this demo, we'll simulate a payment process
    
    const paymentData: PaymentData = {
      email,
      amount: amount * 100, // Convert to kobo
      reference: generateReference(),
      currency,
      metadata
    };
    
    console.log('Payment data:', paymentData);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setPaymentSuccess(true);
      
      // Call success callback after showing success message
      setTimeout(() => {
        if (onSuccess) {
          onSuccess(paymentData.reference);
        }
        setShowDialog(false);
        setPaymentSuccess(false);
        
        // Reset form
        setCardNumber('');
        setExpiry('');
        setCvv('');
        
        // Show success toast
        toast({
          title: "Payment Successful",
          description: `Your payment of ${currency} ${amount.toLocaleString()} has been processed`,
        });
      }, 2000);
    }, 2000);
  };
  
  const formatCardNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Limit to 16 digits
    const truncated = digits.slice(0, 16);
    
    // Add spaces every 4 digits
    let formatted = '';
    for (let i = 0; i < truncated.length; i += 4) {
      formatted += truncated.slice(i, i + 4) + ' ';
    }
    
    return formatted.trim();
  };
  
  const formatExpiry = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Limit to 4 digits
    const truncated = digits.slice(0, 4);
    
    // Add slash after first 2 digits
    if (truncated.length > 2) {
      return truncated.slice(0, 2) + '/' + truncated.slice(2);
    }
    
    return truncated;
  };
  
  return (
    <>
      <div className={className}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <Button onClick={handlePayment} disabled={!email} className="w-full">
            <CreditCard className="h-4 w-4 mr-2" />
            {buttonText}
          </Button>
        </div>
      </div>
      
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {paymentSuccess ? 'Payment Successful!' : 'Enter Card Details'}
            </DialogTitle>
          </DialogHeader>
          
          {paymentSuccess ? (
            <div className="flex flex-col items-center justify-center py-6">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-center text-muted-foreground">
                Your payment of {currency} {amount.toLocaleString()} has been processed successfully.
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input
                    id="card-number"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry (MM/YY)</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      type="password"
                      placeholder="•••"
                      maxLength={4}
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    />
                  </div>
                </div>
                
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Amount:</span>
                  <span className="font-medium text-foreground">
                    {currency} {amount.toLocaleString()}
                  </span>
                </div>
              </div>
              
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowDialog(false);
                    if (onCancel) onCancel();
                  }}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={processPayment} 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Pay Now'
                  )}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PaystackPayment;
