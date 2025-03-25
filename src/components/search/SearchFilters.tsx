
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Search, Filter, X } from 'lucide-react';
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SearchFiltersProps {
  onSearch: (filters: any) => void;
  className?: string;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onSearch, className }) => {
  const [priceRange, setPriceRange] = useState([500, 10000]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  const categories = [
    { id: 'musicians', label: 'Musicians' },
    { id: 'actors', label: 'Actors' },
    { id: 'comedians', label: 'Comedians' },
    { id: 'athletes', label: 'Athletes' },
    { id: 'influencers', label: 'Influencers' },
  ];

  const handleApplyFilters = () => {
    const newActiveFilters = [];
    if (selectedCategory) newActiveFilters.push(`Category: ${selectedCategory}`);
    if (location) newActiveFilters.push(`Location: ${location}`);
    newActiveFilters.push(`Price: $${priceRange[0]} - $${priceRange[1]}`);
    
    setActiveFilters(newActiveFilters);
    
    onSearch({
      category: selectedCategory,
      priceMin: priceRange[0],
      priceMax: priceRange[1],
      searchTerm,
      location,
    });
  };

  const handleResetFilters = () => {
    setPriceRange([500, 10000]);
    setSelectedCategory('');
    setLocation('');
    setActiveFilters([]);
    
    onSearch({
      category: '',
      priceMin: 500,
      priceMax: 10000,
      searchTerm,
      location: '',
    });
  };

  const handleRemoveFilter = (filter: string) => {
    setActiveFilters(prev => prev.filter(f => f !== filter));
    
    // Reset the corresponding filter
    if (filter.startsWith('Category:')) {
      setSelectedCategory('');
    } else if (filter.startsWith('Location:')) {
      setLocation('');
    } else if (filter.startsWith('Price:')) {
      setPriceRange([500, 10000]);
    }
  };

  return (
    <div className={cn('mb-8', className)}>
      <div className="flex flex-col space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search for celebrities by name..."
            className="pl-10 pr-10 h-12 rounded-full bg-background border-muted"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleApplyFilters();
              }
            }}
          />
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 text-muted-foreground"
                aria-label="Open filters"
              >
                <Filter className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={selectedCategory} 
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Enter a location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Price Range</Label>
                    <span className="text-sm text-muted-foreground">
                      ${priceRange[0]} - ${priceRange[1]}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[500, 10000]}
                    min={100}
                    max={20000}
                    step={100}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Availability</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="available-today" />
                      <label
                        htmlFor="available-today"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Today
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="available-this-week" />
                      <label
                        htmlFor="available-this-week"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        This Week
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="available-this-month" />
                      <label
                        htmlFor="available-this-month"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        This Month
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Features</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="instant-booking" />
                      <label
                        htmlFor="instant-booking"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Instant Booking
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="virtual-events" />
                      <label
                        htmlFor="virtual-events"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Virtual Events
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="top-rated" />
                      <label
                        htmlFor="top-rated"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Top Rated
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="verified" />
                      <label
                        htmlFor="verified"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Verified
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <SheetFooter className="sm:justify-start">
                <SheetClose asChild>
                  <Button onClick={handleApplyFilters}>Apply Filters</Button>
                </SheetClose>
                <Button variant="outline" onClick={handleResetFilters}>
                  Reset
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
        
        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {activeFilters.map((filter) => (
              <Badge key={filter} variant="outline" className="py-1.5 pl-3 pr-2">
                {filter}
                <button 
                  onClick={() => handleRemoveFilter(filter)}
                  className="ml-1 text-muted-foreground hover:text-foreground"
                  aria-label={`Remove ${filter} filter`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {activeFilters.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs h-7"
                onClick={handleResetFilters}
              >
                Clear All
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilters;
