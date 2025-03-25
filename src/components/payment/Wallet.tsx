import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const DigitalWallet = () => {
    const [showBalance, setShowBalance] = useState(false);
    const balance = 1250.75; // Example balance
    const { user } = useAuth();

    return (
        <div className="container mx-auto pt-10 pb-10 px-4">
            <h1 className="text-3xl font-bold tracking-tight text-center mb-6 ">CelebConnect Wallet</h1>

            {/* Balance Display */}
            <div className="bg-purple-300 dark:bg-gray-800 p-6 rounded-lg flex justify-between items-center">
                <span className="text-2xl font-semibold">
                    {showBalance ? `$${balance.toFixed(2)}` : "****"}
                </span>
                <button onClick={() => setShowBalance(!showBalance)}>
                    {showBalance ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                </button>
            </div>

            {/* Transaction History */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md">
                    <div className="flex justify-between items-center py-2 border-b">
                        <span>Received Payment</span>
                        <Badge className="bg-green-500 text-white">Success</Badge>
                        <span className="font-semibold">+$500</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                        <span>Withdrawal Request</span>
                        <Badge className="bg-yellow-500 text-white">Pending</Badge>
                        <span className="font-semibold">-$300</span>
                    </div>
                </div>
            </div>

            {/* Fund Transfer Section */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Wallet Actions</h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Send Money */}

                    {user?.role !== 'celebrity' && (
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="w-full">Send Money</Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                                <h3 className="text-lg font-semibold mb-4">Transfer Funds</h3>
                                <input
                                    type="text"
                                    placeholder="Recipient's Email or Phone"
                                    className="w-full p-3 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <input
                                    type="number"
                                    placeholder="Amount"
                                    className="w-full p-3 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <Button className="w-full bg-primary text-white hover:bg-primary-dark">Confirm Transfer</Button>
                            </DialogContent>
                        </Dialog>
                    )}
                    {/* Fund Wallet */}
                    {user?.role !== 'celebrity' && (
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="w-full">Fund Wallet</Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                                <h3 className="text-lg font-semibold mb-4">Fund Your Wallet</h3>
                                <select className="w-full p-3 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-primary">
                                    <option value="card">Credit/Debit Card</option>
                                    <option value="bank">Bank Transfer</option>
                                    <option value="crypto">Cryptocurrency</option>
                                </select>
                                <input
                                    type="number"
                                    placeholder="Amount"
                                    className="w-full p-3 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <Button className="w-full bg-primary text-white hover:bg-primary-dark">Add Funds</Button>
                            </DialogContent>
                        </Dialog>
                    )}
                    {/* Withdraw Funds */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="w-full">Withdraw Funds</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                            <h3 className="text-lg font-semibold mb-4">Withdraw Funds</h3>
                            <input
                                type="text"
                                placeholder="Bank Account or Wallet Address"
                                className="w-full p-3 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <input
                                type="number"
                                placeholder="Amount"
                                className="w-full p-3 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <Button className="w-full bg-primary text-white hover:bg-primary-dark">Withdraw</Button>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

        </div>
    );
};

export default DigitalWallet;
