import React from 'react'
import { ProblemPage } from '../interface'

export const DivideUpWork: ProblemPage = ({ team }) => {
  return (
    <div>
      <h1>HOla como estas estoy en la página</h1>

      {team?.name}
    </div>
  );
};
