import { useEffect, useState } from "react";
import {
    collection,
    onSnapshot,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CheckSquare, Square, Edit, Trash, PlusCircle } from "lucide-react";
import GlassCard from "@/components/ui-custom/GlassCard";
import { toast } from "@/hooks/use-toast";

const CelebrityServices = ({ celebrityId }: { celebrityId: string }) => {
    const [services, setServices] = useState<any[]>([]);
    const [newService, setNewService] = useState({
        title: "",
        price: "",
        description: "",
        features: "",
        duration: "",
    });

    const [editingService, setEditingService] = useState<any | null>(null);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);

    useEffect(() => {
        const ref = collection(db, "celebrities", celebrityId, "services");
        const unsub = onSnapshot(ref, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setServices(data);
        });

        return () => unsub();
    }, [celebrityId]);

    const handleAddService = async (e: React.FormEvent) => {
        e.preventDefault();
        const ref = collection(db, "celebrities", celebrityId, "services");
        setOpenAddDialog(false);
        await addDoc(ref, {
            ...newService,
            price: parseFloat(newService.price),
        });
        toast({
            title: 'Service Added',
            className: "bg-green-100 border border-green-400 text-green-800",
        });
        setNewService({
            title: "",
            price: "",
            description: "",
            features: "",
            duration: "",
        });
    };

    const handleEditService = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingService) return;

        const ref = doc(db, "celebrities", celebrityId, "services", editingService.id);
        setOpenEditDialog(false);
        await updateDoc(ref, {
            title: editingService.title,
            price: parseFloat(editingService.price),
            description: editingService.description,
            features: editingService.features,
            duration: editingService.duration,
        });
        toast({
            title: 'Service Edited',
            className: "bg-green-100 border border-green-400 text-green-800",
        });
        setEditingService(null);
    };

    const handleDeleteService = async (id: string) => {
        const ref = doc(db, "celebrities", celebrityId, "services", id);
        await deleteDoc(ref);
        toast({
            title: 'Service Deleted',
            variant: 'destructive'
        });
    };

    return (
        <GlassCard className="p-6">
            <h3 className="font-medium mb-4">Services & Packages</h3>
            <div className="space-y-4">
                {services.map((pkg) => (
                    <div
                        key={pkg.id}
                        className="flex items-center justify-between p-3 rounded-md bg-background"
                    >
                        <div className="flex items-start space-x-3">                            
                            <div>
                                <h4 className="font-medium">{pkg.title}</h4>
                                <p className="text-muted-foreground my-1 text-sm">{pkg.description}</p>
                                <p className="text-sm text-muted-foreground">
                                    ${pkg.price.toLocaleString()} – {pkg.duration}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
                                <DialogTrigger asChild>
                                    <Button variant="ghost" size="sm" onClick={() => { setEditingService(pkg); setOpenEditDialog(true); }}>
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-md">
                                    <h3 className="text-lg font-semibold mb-4">Edit Service/Package</h3>
                                    <form onSubmit={handleEditService}>
                                        <Input
                                            placeholder="Title"
                                            value={editingService?.title || ""}
                                            onChange={(e) =>
                                                setEditingService({ ...editingService, title: e.target.value })
                                            }
                                            className="mb-3"
                                        />
                                        <Input
                                            placeholder="Price"
                                            type="number"
                                            value={editingService?.price || ""}
                                            onChange={(e) =>
                                                setEditingService({ ...editingService, price: e.target.value })
                                            }
                                            className="mb-3"
                                        />
                                        <Input
                                            placeholder="Description"
                                            value={editingService?.description || ""}
                                            onChange={(e) =>
                                                setEditingService({ ...editingService, description: e.target.value })
                                            }
                                            className="mb-3"
                                        />
                                        <Input
                                            placeholder="Features"
                                            value={editingService?.features || ""}
                                            onChange={(e) =>
                                                setEditingService({ ...editingService, features: e.target.value })
                                            }
                                            className="mb-3"
                                        />
                                        <Input
                                            placeholder="Duration"
                                            value={editingService?.duration || ""}
                                            onChange={(e) =>
                                                setEditingService({ ...editingService, duration: e.target.value })
                                            }
                                            className="mb-3"
                                        />
                                        <Button type="submit" className="w-full">
                                            Update Service
                                        </Button>
                                    </form>
                                </DialogContent>
                            </Dialog>

                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteService(pkg.id)}
                            >
                                <Trash className="h-4 w-4 text-red-700" />
                            </Button>
                        </div>
                    </div>
                ))}

                <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add Service
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Add Service/Package</h3>
                        <form onSubmit={handleAddService}>
                            <Input
                                placeholder="Title"
                                value={newService.title}
                                onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                                className="mb-3"
                            />
                            <Input
                                placeholder="Price"
                                type="number"
                                value={newService.price}
                                onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                                className="mb-3"
                            />
                            <Input
                                placeholder="Description"
                                value={newService.description}
                                onChange={(e) =>
                                    setNewService({ ...newService, description: e.target.value })
                                }
                                className="mb-3"
                            />
                            <Input
                                placeholder="Features"
                                value={newService.features}
                                onChange={(e) =>
                                    setNewService({ ...newService, features: e.target.value })
                                }
                                className="mb-3"
                            />
                            <Input
                                placeholder="Duration"
                                value={newService.duration}
                                onChange={(e) =>
                                    setNewService({ ...newService, duration: e.target.value })
                                }
                                className="mb-3"
                            />
                            <Button type="submit" className="w-full">
                                Add Service
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </GlassCard>
    );
};

export default CelebrityServices;
