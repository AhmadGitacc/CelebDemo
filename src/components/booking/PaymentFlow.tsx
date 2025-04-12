
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Lock, Shield, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface PaymentFlowProps {
  amount: number;
  onComplete?: () => void;
  className?: string;
}

const PaymentFlow: React.FC<PaymentFlowProps> = ({
  amount,
  onComplete,
  className
}) => {
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [hasClickedOnce, setHasClickedOnce] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // First click: open Paystack in new tab and change button text
    if (!hasClickedOnce) {
      setHasClickedOnce(true);
      window.open("https://paystack.com/pay/ev9jspf9ra", "_blank");
      return;
    }

    // Second click: simulate payment confirmation
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setCompleted(true);

      setTimeout(() => {
        if (onComplete) onComplete();
      }, 4000);
    }, 3000);
  };

  const getServiceFee = () => {
    return amount * 0.01; // 1% service fee
  };

  const getTotalAmount = () => {
    return amount + getServiceFee();
  };

  return (
    <div className={cn("space-y-6", className)}>
      {!completed ? (
        <form onSubmit={handleSubmit}>
          {/* <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">Payment Method</h3>
            <div className="flex items-center space-x-2 mb-4">
              <CreditCard className="h-5 w-5 text-accent" />
              <span className="font-medium">Credit / Debit Card</span>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input
                  id="card-number"
                  placeholder="1234 5678 9012 3456"
                  className="h-10"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    className="h-10"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input
                    id="cvc"
                    placeholder="123"
                    className="h-10"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Name on Card</Label>
                <Input
                  id="name"
                  placeholder="Name as appears on card"
                  className="h-10"
                />
              </div>
            </div>
          </div>

          <Separator className="my-6" /> */}

          <div className="space-y-3 mb-6">
            <h3 className="font-semibold text-lg mb-3">Payment Summary</h3>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Booking Amount</span>
              <span>₦{amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service Fee</span>
              <span>₦{getServiceFee().toLocaleString()}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>₦{getTotalAmount().toLocaleString()}</span>
            </div>
          </div>

          <div className="text-sm text-muted-foreground flex items-center mb-6">
            <Lock className="h-4 w-4 mr-1.5" />
            All transactions are secured and encrypted
          </div>

          <Button
            className="w-full font-medium h-12"
            disabled={processing}
            type="submit"
          >
            {processing ? (
              <span className="flex items-center">
                Processing
                <span className="ml-2">
                  <span className="loading-dot"></span>
                  <span className="loading-dot"></span>
                  <span className="loading-dot"></span>
                </span>
              </span>
            ) : hasClickedOnce ? 'Confirm Payment' : 'Pay Now'}
          </Button>

        </form>
      ) : (
        <div className="text-center py-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">Payment Complete!</h3>
          <p className="text-muted-foreground mb-6">
            Your booking request is made, wait for celebrity confirmation and hold on to the proof of payment.
          </p>
          <Link to='/dashboard'>
            <Button
              className="w-full"
            >
              View Booking Details
            </Button>
          </Link>
        </div>
      )}

      <div className="flex items-center justify-center text-sm text-muted-foreground mt-4">
        <Shield className="h-4 w-4 mr-1.5 text-accent" />
        Protected by yaza Guarantee
      </div>
    </div>
  );
};

export default PaymentFlow;
