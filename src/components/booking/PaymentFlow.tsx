import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Lock, Shield, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import PaystackPop from '@paystack/inline-js'

interface PaymentFlowProps {
  amount: number;
  userEmail: string;
  onComplete?: () => void;
  className?: string;
}

const PaymentFlow: React.FC<PaymentFlowProps> = ({
  amount,
  userEmail,
  onComplete,
  className
}) => {
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);

  const getServiceFee = () => {
    return amount * 0.01;
  };

  const getTotalAmount = () => {
    return amount + getServiceFee();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY, // Make sure you set this in your .env
      amount: getTotalAmount() * 100, // in kobo
      email: userEmail,
      onSuccess: (transaction) => {
        setCompleted(true);
        setProcessing(false);
        console.log('Payment successful! Transaction:', transaction);
        if (onComplete) onComplete();
      },
      onCancel: () => {
        setProcessing(false);
      },
    });
  };

  return (
    <div className={cn("space-y-6", className)}>
      {!completed ? (
        <form onSubmit={handleSubmit}>
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
            ) : 'Pay Now'}
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
            <Button className="w-full">
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
