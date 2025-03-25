
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
    name: 'John Legend',
    category: 'Musician',
    subcategory: 'Singer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    rating: 4.9,
    reviewCount: 120,
    minPrice: 15000,
    location: 'Los Angeles, CA',
    isVerified: true,
    isInstantBooking: true,
    isAvailableToday: true,
    tags: ['R&B', 'Soul', 'Piano']
  },
  {
    id: '2',
    name: 'Emma Watson',
    category: 'Actor',
    subcategory: 'Film & TV',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    rating: 4.8,
    reviewCount: 85,
    minPrice: 25000,
    location: 'New York, NY',
    isVerified: true,
    isInstantBooking: false,
    tags: ['Brand Ambassador', 'Charity Events']
  },
  {
    id: '3',
    name: 'Kevin Hart',
    category: 'Comedian',
    subcategory: 'Stand-up',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    rating: 4.7,
    reviewCount: 92,
    minPrice: 35000,
    location: 'Miami, FL',
    isVerified: true,
    isInstantBooking: true,
    tags: ['Corporate Events', 'MC']
  },
  {
    id: '4',
    name: 'Serena Williams',
    category: 'Athlete',
    subcategory: 'Tennis',
    image: 'https://images.unsplash.com/photo-1617077644557-64be144aa306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    rating: 4.9,
    reviewCount: 78,
    minPrice: 40000,
    location: 'Palm Beach, FL',
    isVerified: true,
    isInstantBooking: false,
    isAvailableToday: false,
    tags: ['Motivational Speaker', 'Sports Events']
  },
  {
    id: '5',
    name: 'Chris Hemsworth',
    category: 'Actor',
    subcategory: 'Film',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    rating: 4.8,
    reviewCount: 65,
    minPrice: 50000,
    location: 'Sydney, Australia',
    isVerified: true,
    isInstantBooking: false,
    tags: ['Action', 'Brand Ambassador']
  },
  {
    id: '6',
    name: 'Beyoncé',
    category: 'Musician',
    subcategory: 'Singer & Performer',
    image: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    rating: 5.0,
    reviewCount: 150,
    minPrice: 100000,
    location: 'Houston, TX',
    isVerified: true,
    isInstantBooking: false,
    tags: ['R&B', 'Pop', 'Performance']
  },
  {
    id: '7',
    name: 'Trevor Noah',
    category: 'Comedian',
    subcategory: 'Host',
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    rating: 4.7,
    reviewCount: 88,
    minPrice: 30000,
    location: 'New York, NY',
    isVerified: true,
    isInstantBooking: true,
    isAvailableToday: true,
    tags: ['Corporate Events', 'MC', 'Host']
  },
  {
    id: '8',
    name: 'Jason Ludwig',
    category: 'Musician',
    subcategory: 'Singer-Songwriter',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    rating: 4.8,
    reviewCount: 18,
    minPrice: 5000,
    location: 'Los Angeles, CA',
    isVerified: true,
    isInstantBooking: true,
    tags: ['Acoustic', 'Weddings', 'Private Events']
  }
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
