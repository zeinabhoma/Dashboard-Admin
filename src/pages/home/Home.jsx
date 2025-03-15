import React from 'react';
import Features from '../../components/features/Features';
import Chart from '../../components/chart/Chart';
import Sections from '../../components/sections/Sections';


export default function Home() {
  return (
    <div style={{width:'100%'}}>
      <Features/>
      <Chart/>
      <Sections/>
    </div>
  )
}
