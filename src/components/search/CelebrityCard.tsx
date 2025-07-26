
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Calendar, MapPin, CheckCircle, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui-custom/GlassCard';
import { cn } from '@/lib/utils';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from "@/lib/firebase";


export interface Celebrity {
  id: string;
  stageName: string;
  name: string;
  category: string;
  subcategory?: string;
  profileImage: string;
  minPrice: number;
  maxPrice?: number;
  location: string;
  isVerified: boolean;
  isAvailableToday?: boolean;
  tags?: string[];
}

interface CelebrityCardProps {
  celebrity: Celebrity;
  className?: string;
}

const CelebrityCard: React.FC<CelebrityCardProps> = ({
  celebrity,
  className
}) => {
  const {
    id,
    stageName,
    name,
    category,
    subcategory,
    profileImage,
    minPrice,
    maxPrice,
    location,
    isVerified,
    isAvailableToday,
    tags
  } = celebrity;

  const [reviews, setReviews] = useState<any[]>([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const reviewsRef = collection(db, "reviews");
    const reviewsQuery = query(reviewsRef, where("celebrityId", "==", id));

    const unsubscribe = onSnapshot(
      reviewsQuery,
      (snapshot) => {
        const reviewsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setReviews(reviewsList);
      },
      (error) => {
        console.error("Error fetching reviews:", error);
      }
    );

    return () => unsubscribe();
  }, [id]);

  useEffect(() => {
    if (reviews.length > 0) {
      const total = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
      const avg = total / reviews.length;
      setAverageRating(avg);
    }
  }, [reviews]);


  return (
    <GlassCard
      className={cn("overflow-hidden", className)}
      interactive
    >
      <Link to={`/celebrities/${id}`} className="block">
        <div className="relative">
          <img
            src={profileImage || '/assets/wizkid.jpg'}
            alt={stageName}
            className="w-full h-64 object-cover object-center rounded-lg mb-4"
          />

          {!stageName && (
            <Badge
              variant="outline"
              className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm text-foreground border-0"
            >
              <Clock className="h-3 w-3 mr-1 text-green-600" />
              Coming Soon
            </Badge>
          )}
        </div>

        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-semibold mb-0.5 flex items-center">
              {stageName || name}
              <CheckCircle className="h-4 w-4 ml-1 text-accent" />
            </h3>
            <div className="text-sm text-muted-foreground">
              {category.charAt(0).toUpperCase() + category.slice(1)}
              {subcategory ? ` · ${subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}` : ''}
            </div>
          </div>

          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
            <span className="font-medium">{averageRating || "0.0"}</span>
            <span className="text-muted-foreground ml-1">({reviews.length || "0"})</span>
          </div>
        </div>

        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
          <span className="truncate">{location}</span>
        </div>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-auto">
          {/* <div className="font-medium">
            ${minPrice.toLocaleString()}{maxPrice ? ` - $${maxPrice.toLocaleString()}` : ''}
            <span className="text-sm text-muted-foreground font-normal"> / event</span>
          </div> */}

          <Button size="sm" className="rounded-full">
            <Calendar className="h-3.5 w-3.5 mr-1.5" />
            Book Now
          </Button>
        </div>
      </Link>
    </GlassCard>
  );
};

export default CelebrityCard;
