
import * as React from 'react';
import { Journalist } from '../types';
import Button from './common/Button';
import Card from './common/Card';

interface JournalistCardProps {
  journalist: Journalist;
  onVote: (id: number) => void;
  disabled: boolean;
}

const JournalistCard: React.FC<JournalistCardProps> = ({ journalist, onVote, disabled }) => {
  return (
    <Card className="text-center flex flex-col justify-between transition-transform transform hover:-translate-y-2 duration-300">
      <div>
        <img
          src={journalist.imageUrl}
          alt={journalist.name}
          className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-gray-700 shadow-lg"
        />
        <h3 className="mt-4 text-xl font-semibold text-white">{journalist.name}</h3>
        <p className="mt-4 text-3xl font-bold text-teal-400">{journalist.votes.toLocaleString('fa-IR')}</p>
        <p className="text-sm text-gray-400">رای</p>
      </div>
      <div className="mt-6">
        <Button onClick={() => onVote(journalist.id)} disabled={disabled}>
          {disabled ? 'ثبت شد' : 'ثبت رای'}
        </Button>
      </div>
    </Card>
  );
};

export default JournalistCard;