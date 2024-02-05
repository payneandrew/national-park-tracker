import { ParkDetail } from '@/nps-api/parks/types';
import Image from 'next/image';

interface AddRemoveButtonProps {
  park: ParkDetail;
  isParkVisited: (parkCode: string) => boolean;
  toggleVisited: (
    parkCode: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

const AddRemoveButton: React.FC<AddRemoveButtonProps> = ({
  park,
  isParkVisited,
  toggleVisited,
}) => {
  return (
    <button
      title={
        isParkVisited(park.parkCode)
          ? 'Click to remove park from your list of visited parks.'
          : 'Click to add park to your list of visited parks.'
      }
      className="flex-shrink-0"
      onClick={(event) => {
        toggleVisited(park.parkCode, event);
      }}
      data-cy="add-remove-park-button"
    >
      <Image
        src={
          isParkVisited(park.parkCode)
            ? '/icons/checked.png'
            : '/icons/unchecked.png'
        }
        alt={!!isParkVisited ? 'Visited' : 'Not Visited'}
        width={50}
        height={50}
        className="cursor-pointer transform transition-transform duration-200 hover:scale-125"
      />
    </button>
  );
};

export default AddRemoveButton;
