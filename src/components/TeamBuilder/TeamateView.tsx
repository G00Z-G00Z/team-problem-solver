import React from 'react'
import { Member } from '../../types/interfaces'

export const TeamateView = ({ member }: { member: Member }) => {
  return <div>{JSON.stringify(member)}</div>;
};
