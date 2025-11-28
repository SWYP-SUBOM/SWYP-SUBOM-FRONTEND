import freshButton from '../assets/Feed/fresh_button.svg';
import offFreshButton from '../assets/Feed/fresh_button_off.svg';
import likeButton from '../assets/Feed/like_button.svg';
import offLikeButton from '../assets/Feed/like_button_off.svg';
import relateButton from '../assets/Feed/relate_button.svg';
import offRelateButton from '../assets/Feed/relate_button_off.svg';

export const ReactionButtons = [
  { reactionName: '좋아요', officon: offLikeButton, icon: likeButton, reactionValue: 'LIKE' },
  {
    reactionName: '공감돼요',
    officon: offRelateButton,
    icon: relateButton,
    reactionValue: 'EMPATHY',
  },
  {
    reactionName: '새로워요',
    officon: offFreshButton,
    icon: freshButton,
    reactionValue: 'INSIGHTFUL',
  },
];
