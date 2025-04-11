import React from 'react';

type Props = {
  isActive: boolean;
  onClick: () => void;
  name: string;
  imageUrl?: string;
};

export const ProjectItem = ({ isActive, onClick, name, imageUrl }: Props) => {
  return <div onClick={onClick}>ProjectItem</div>;
};
