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

// Catch Up Features
import { Dining } from './pages/Dining';
import { Occasions } from './pages/Occasions';
import { Gallery } from './pages/Gallery';
import { Journal } from './pages/Journal';
import { FAQ } from './pages/FAQ';
import { Offers } from './pages/Offers';

// Leapfrog Features
import { TeaJourney } from './pages/TeaJourney';
import { EstateSeasons } from './pages/EstateSeasons';
import { ArrivalJourney } from './pages/ArrivalJourney';
import { PreArrival } from './pages/PreArrival';

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
          
          {/* Catch Up Routes */}
          <Route path="/dining" element={<Dining />} />
          <Route path="/occasions" element={<Occasions />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/offers" element={<Offers />} />

          {/* Leapfrog Routes (Stubs) */}
          <Route path="/tea-journey" element={<TeaJourney />} />
          <Route path="/seasons" element={<EstateSeasons />} />
          <Route path="/arrival" element={<ArrivalJourney />} />
          <Route path="/pre-arrival" element={<PreArrival />} />

          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </StayPlanProvider>
  );
}