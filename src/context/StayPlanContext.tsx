import React, { createContext, useContext, useState, useEffect } from 'react';

export interface StayDates {
  checkIn: string;
  checkOut: string;
  nights: number;
}

export interface StayGuests {
  adults: number;
  children: number;
}

export interface StayPlanState {
  dates: StayDates;
  guests: StayGuests;
  travelStyle: string;
  interests: string[];
  selectedChamberIds: string[];
  selectedExperienceIds: string[];
  occasion?: string;
  isBuyout: boolean;
  specialRequests: string;
}

interface StayPlanContextType {
  plan: StayPlanState;
  setDates: (dates: Partial<StayDates>) => void;
  setGuests: (guests: Partial<StayGuests>) => void;
  setTravelStyle: (style: string) => void;
  toggleInterest: (interestId: string) => void;
  addChamber: (chamberId: string) => void;
  removeChamber: (chamberId: string) => void;
  toggleChamber: (chamberId: string) => void;
  addExperience: (experienceId: string) => void;
  removeExperience: (experienceId: string) => void;
  toggleExperience: (experienceId: string) => void;
  setIsBuyout: (isBuyout: boolean) => void;
  setOccasion: (occasion: string) => void;
  setSpecialRequests: (requests: string) => void;
  resetPlan: () => void;
  totalSelectedItems: number;
}

const defaultDates: StayDates = {
  checkIn: '2026-10-15',
  checkOut: '2026-10-18',
  nights: 3
};

const defaultGuests: StayGuests = {
  adults: 2,
  children: 0
};

const defaultPlan: StayPlanState = {
  dates: defaultDates,
  guests: defaultGuests,
  travelStyle: 'Couple',
  interests: ['tea', 'nature', 'table'],
  selectedChamberIds: ['founders'],
  selectedExperienceIds: ['tea-walks', 'tea-tastings'],
  isBuyout: false,
  specialRequests: ''
};

const StayPlanContext = createContext<StayPlanContextType | undefined>(undefined);

export function StayPlanProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<StayPlanState>(() => {
    const saved = localStorage.getItem('teabungalow_stay_plan');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return defaultPlan;
  });

  useEffect(() => {
    localStorage.setItem('teabungalow_stay_plan', JSON.stringify(plan));
  }, [plan]);

  const setDates = (newDates: Partial<StayDates>) => {
    setPlan((prev) => {
      const updated = { ...prev.dates, ...newDates };
      if (updated.checkIn && updated.checkOut) {
        const start = new Date(updated.checkIn);
        const end = new Date(updated.checkOut);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        updated.nights = diffDays > 0 ? diffDays : 1;
      }
      return { ...prev, dates: updated };
    });
  };

  const setGuests = (newGuests: Partial<StayGuests>) => {
    setPlan((prev) => ({ ...prev, guests: { ...prev.guests, ...newGuests } }));
  };

  const setTravelStyle = (travelStyle: string) => {
    setPlan((prev) => ({ ...prev, travelStyle }));
  };

  const toggleInterest = (interestId: string) => {
    setPlan((prev) => {
      const exists = prev.interests.includes(interestId);
      const updated = exists
        ? prev.interests.filter((id) => id !== interestId)
        : [...prev.interests, interestId];
      return { ...prev, interests: updated };
    });
  };

  const addChamber = (chamberId: string) => {
    setPlan((prev) => {
      if (prev.selectedChamberIds.includes(chamberId)) return prev;
      return { ...prev, selectedChamberIds: [...prev.selectedChamberIds, chamberId] };
    });
  };

  const removeChamber = (chamberId: string) => {
    setPlan((prev) => ({
      ...prev,
      selectedChamberIds: prev.selectedChamberIds.filter((id) => id !== chamberId)
    }));
  };

  const toggleChamber = (chamberId: string) => {
    setPlan((prev) => {
      const exists = prev.selectedChamberIds.includes(chamberId);
      return {
        ...prev,
        selectedChamberIds: exists
          ? prev.selectedChamberIds.filter((id) => id !== chamberId)
          : [...prev.selectedChamberIds, chamberId]
      };
    });
  };

  const addExperience = (experienceId: string) => {
    setPlan((prev) => {
      if (prev.selectedExperienceIds.includes(experienceId)) return prev;
      return { ...prev, selectedExperienceIds: [...prev.selectedExperienceIds, experienceId] };
    });
  };

  const removeExperience = (experienceId: string) => {
    setPlan((prev) => ({
      ...prev,
      selectedExperienceIds: prev.selectedExperienceIds.filter((id) => id !== experienceId)
    }));
  };

  const toggleExperience = (experienceId: string) => {
    setPlan((prev) => {
      const exists = prev.selectedExperienceIds.includes(experienceId);
      return {
        ...prev,
        selectedExperienceIds: exists
          ? prev.selectedExperienceIds.filter((id) => id !== experienceId)
          : [...prev.selectedExperienceIds, experienceId]
      };
    });
  };

  const setIsBuyout = (isBuyout: boolean) => {
    setPlan((prev) => ({ ...prev, isBuyout }));
  };

  const setOccasion = (occasion: string) => {
    setPlan((prev) => ({ ...prev, occasion }));
  };

  const setSpecialRequests = (specialRequests: string) => {
    setPlan((prev) => ({ ...prev, specialRequests }));
  };

  const resetPlan = () => {
    setPlan(defaultPlan);
  };

  const totalSelectedItems = plan.selectedChamberIds.length + plan.selectedExperienceIds.length;

  return (
    <StayPlanContext.Provider
      value={{
        plan,
        setDates,
        setGuests,
        setTravelStyle,
        toggleInterest,
        addChamber,
        removeChamber,
        toggleChamber,
        addExperience,
        removeExperience,
        toggleExperience,
        setIsBuyout,
        setOccasion,
        setSpecialRequests,
        resetPlan,
        totalSelectedItems
      }}
    >
      {children}
    </StayPlanContext.Provider>
  );
}

export function useStayPlan() {
  const context = useContext(StayPlanContext);
  if (!context) {
    throw new Error('useStayPlan must be used within a StayPlanProvider');
  }
  return context;
}
