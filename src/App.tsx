import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StayPlanProvider } from './context/StayPlanContext';
import { Home } from './pages/Home';
import { DesignSystem } from './pages/DesignSystem';
import { EstateExplorer } from './pages/EstateExplorer';
import { PlanYourStay } from './pages/PlanYourStay';
import { Chambers } from './pages/Chambers';
import { ChamberDetail } from './pages/ChamberDetail';
import { Experiences } from './pages/Experiences';
import { PrivateEstate } from './pages/PrivateEstate';
import { DirectBooking } from './pages/DirectBooking';
import { Distribution } from './pages/Distribution';
import { Destination } from './pages/Destination';
import { Enquiry } from './pages/Enquiry';

export function App() {
  return (
    <StayPlanProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<EstateExplorer />} />
          <Route path="/plan" element={<PlanYourStay />} />
          <Route path="/chambers" element={<Chambers />} />
          <Route path="/chambers/:id" element={<ChamberDetail />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/buyout" element={<PrivateEstate />} />
          <Route path="/book" element={<DirectBooking />} />
          <Route path="/distribution" element={<Distribution />} />
          <Route path="/destination" element={<Destination />} />
          <Route path="/enquire" element={<Enquiry />} />
          <Route path="/design-system" element={<DesignSystem />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </StayPlanProvider>
  );
}