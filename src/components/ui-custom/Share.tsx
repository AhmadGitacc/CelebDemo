
import React from 'react';
import { Share as ShareIcon } from 'lucide-react';

interface ShareProps {
  className?: string;
}

const Share: React.FC<ShareProps> = ({ className }) => {
  return <ShareIcon className={className} />;
};

export default Share;
