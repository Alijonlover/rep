
import * as React from 'react';
import { Journalist } from '../types';
import JournalistCard from './JournalistCard';

interface VotingPageProps {
  journalists: Journalist[];
  onVote: (id: number) => void;
}

const VotingPage: React.FC<VotingPageProps> = ({ journalists, onVote }) => {
  const [hasVoted, setHasVoted] = React.useState(false);

  const handleVote = React.useCallback((id: number) => {
    if (!hasVoted) {
      onVote(id);
      setHasVoted(true);
    }
  }, [hasVoted, onVote]);
  
  const sortedJournalists = [...journalists].sort((a, b) => b.votes - a.votes);

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-white">به خبرنگار مورد علاقه خود رای دهید</h2>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-400">
          {hasVoted ? 'از شرکت شما در این نظرسنجی سپاسگزاریم.' : 'شما فقط یک بار می‌توانید رای دهید.'}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedJournalists.map(journalist => (
          <JournalistCard
            key={journalist.id}
            journalist={journalist}
            onVote={handleVote}
            disabled={hasVoted}
          />
        ))}
      </div>
    </div>
  );
};

export default VotingPage;