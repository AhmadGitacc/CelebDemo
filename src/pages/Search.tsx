
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Filter, ArrowUpDown, Grid3X3, List } from 'lucide-react';
import GlassCard from '@/components/ui-custom/GlassCard';
import PageTransition from '@/components/ui-custom/PageTransition';
import SearchFilters from '@/components/search/SearchFilters';
import CelebrityCard, { Celebrity } from '@/components/search/CelebrityCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock data for celebrities
const mockCelebrities: Celebrity[] = [
  {
    id: '1',
    name: 'Wizkid',
    category: 'Musician',
    subcategory: 'Singer',
    image: '../../public/assets/wizkid.jpg',
    rating: 4.7,
    reviewCount: 120,
    minPrice: 15000,
    location: 'Lagos, NG',
    isVerified: true,
    isInstantBooking: false,
    isAvailableToday: false,
    tags: ['Afrobeats', 'Hiphop']
  },
  {
    id: '2',
    name: 'Davido',
    category: 'Musician',
    subcategory: 'Singer',
    image: '../../public/assets/davido.jpg',
    rating: 4.9,
    reviewCount: 120,
    minPrice: 10000,
    location: 'Lagos, NG',
    isVerified: true,
    isInstantBooking: false,
    isAvailableToday: true,
    tags: ['Afrobeats']
  },
  {
    id: '3',
    name: 'Burnaboy',
    category: 'Musician',
    subcategory: 'Rapper',
    image: '../../public/assets/burnaboy.jpg',
    rating: 4.7,
    reviewCount: 120,
    minPrice: 25000,
    location: 'Lagos, NG',
    isVerified: true,
    isInstantBooking: false,
    isAvailableToday: true,
    tags: ['Afrobeats', 'Amapiano, Hiphop']
  },
  {
    id: '4',
    name: 'Olamide',
    category: 'Musician',
    subcategory: 'Rapper',
    image: '../../public/assets/olamide.jpg',
    rating: 4.3,
    reviewCount: 120,
    minPrice: 15000,
    location: 'Lagos, NG',
    isVerified: true,
    isInstantBooking: false,
    isAvailableToday: false,
    tags: ['Amapiano', 'Afrobeats']
  },
  {
    id: '5',
    name: 'Don Jazzy',
    category: 'Producer',
    subcategory: 'Musician',
    image: '../../public/assets/donjazzy.jpg',
    rating: 4.3,
    reviewCount: 120,
    minPrice: 20000,
    location: 'Lagos, NG',
    isVerified: true,
    isInstantBooking: true,
    isAvailableToday: false,
    tags: ['Amapiano', 'Afrobeats', 'Hiphop']
  },
  
];

const Search: React.FC = () => {
  const [celebrities, setCelebrities] = useState<Celebrity[]>(mockCelebrities);
  const [filteredCelebrities, setFilteredCelebrities] = useState<Celebrity[]>(mockCelebrities);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortOption, setSortOption] = useState('relevance');

  const handleSearch = (filters: any) => {
    setLoading(true);
    
    // Simulate API request delay
    setTimeout(() => {
      let results = [...celebrities];
      
      // Filter by category - now handling 'all' value properly
      if (filters.category && filters.category !== 'all') {
        results = results.filter(celeb => 
          celeb.category.toLowerCase() === filters.category.toLowerCase()
        );
      }
      
      // Filter by price range
      if (filters.priceMin || filters.priceMax) {
        results = results.filter(celeb => 
          celeb.minPrice >= filters.priceMin && 
          (filters.priceMax ? celeb.minPrice <= filters.priceMax : true)
        );
      }
      
      // Filter by search term
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        results = results.filter(celeb => 
          celeb.name.toLowerCase().includes(searchLower) || 
          celeb.category.toLowerCase().includes(searchLower) ||
          (celeb.subcategory && celeb.subcategory.toLowerCase().includes(searchLower)) ||
          (celeb.tags && celeb.tags.some(tag => tag.toLowerCase().includes(searchLower)))
        );
      }
      
      // Filter by location
      if (filters.location) {
        const locationLower = filters.location.toLowerCase();
        results = results.filter(celeb => 
          celeb.location.toLowerCase().includes(locationLower)
        );
      }
      
      setFilteredCelebrities(results);
      setLoading(false);
    }, 500);
  };

  const handleSort = (value: string) => {
    setSortOption(value);
    let sorted = [...filteredCelebrities];
    
    switch (value) {
      case 'price-low':
        sorted.sort((a, b) => a.minPrice - b.minPrice);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.minPrice - a.minPrice);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'popularity':
        sorted.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        // Relevance (no sorting)
        break;
    }
    
    setFilteredCelebrities(sorted);
  };

  return (
    <PageTransition>
      <div className="container mx-auto pt-28 pb-16 px-4">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Browse Celebrities</h1>
            <p className="text-muted-foreground">
              Discover and book top celebrities for your events, campaigns, and special occasions
            </p>
          </div>
          
          <SearchFilters onSearch={handleSearch} />
          
          <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
            <p className="text-muted-foreground text-sm">
              Showing <span className="font-medium text-foreground">{filteredCelebrities.length}</span> celebrities
            </p>
            <div className="flex items-center gap-3">
              <Select value={sortOption} onValueChange={handleSort}>
                <SelectTrigger className="w-[180px]">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                  <SelectItem value="popularity">Most Popular</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex items-center border rounded-md overflow-hidden">
                <Button 
                  variant={viewMode === 'grid' ? 'default' : 'ghost'} 
                  size="sm" 
                  className="rounded-none"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button 
                  variant={viewMode === 'list' ? 'default' : 'ghost'} 
                  size="sm" 
                  className="rounded-none"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {loading ? (
            <div className="min-h-[400px] flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="flex space-x-1 mb-3">
                  <div className="loading-dot"></div>
                  <div className="loading-dot"></div>
                  <div className="loading-dot"></div>
                </div>
                <p className="text-muted-foreground">Loading celebrities...</p>
              </div>
            </div>
          ) : filteredCelebrities.length === 0 ? (
            <GlassCard className="p-8 text-center">
              <h2 className="text-xl font-semibold mb-2">No celebrities found</h2>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters to find more matches
              </p>
              <Button onClick={() => handleSearch({})}>
                Reset Filters
              </Button>
            </GlassCard>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-6'
            }>
              {filteredCelebrities.map(celebrity => (
                <CelebrityCard 
                  key={celebrity.id} 
                  celebrity={celebrity} 
                  className={viewMode === 'list' ? 'flex flex-col md:flex-row' : ''}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Search;
