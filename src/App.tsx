import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
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
          {/* Active Prototype Routes */}
          <Route path="/explore" element={<EstateExplorer />} />
          <Route path="/tea-journey" element={<TeaJourney />} />
          <Route path="/destination" element={<Destination />} />
          <Route path="/plan" element={<PlanYourStay />} />
          <Route path="/book" element={<DirectBooking />} />
          <Route path="/pre-arrival" element={<PreArrival />} />
          
          {/* Redirects for unfinished/non-core pages */}
          <Route path="/" element={<Navigate to="/explore" replace />} />
          <Route path="/home" element={<Navigate to="/explore" replace />} />
          <Route path="/chambers" element={<Navigate to="/explore" replace />} />
          <Route path="/chambers/:id" element={<Navigate to="/explore" replace />} />
          <Route path="/experiences" element={<Navigate to="/explore" replace />} />
          <Route path="/dining" element={<Navigate to="/explore" replace />} />
          <Route path="/occasions" element={<Navigate to="/explore" replace />} />
          <Route path="/buyout" element={<Navigate to="/explore" replace />} />
          <Route path="/private-estate" element={<Navigate to="/explore" replace />} />
          <Route path="/gallery" element={<Navigate to="/explore" replace />} />
          <Route path="/journal" element={<Navigate to="/explore" replace />} />
          <Route path="/faq" element={<Navigate to="/explore" replace />} />
          <Route path="/enquire" element={<Navigate to="/explore" replace />} />
          <Route path="/distribution" element={<Navigate to="/explore" replace />} />
          <Route path="/design-system" element={<Navigate to="/explore" replace />} />
          <Route path="/offers" element={<Navigate to="/explore" replace />} />
          <Route path="/seasons" element={<Navigate to="/explore" replace />} />
          <Route path="/arrival" element={<Navigate to="/explore" replace />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/explore" replace />} />
        </Routes>
      </BrowserRouter>
    </StayPlanProvider>
  );
}