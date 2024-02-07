import { useState, useEffect } from 'react';
import { useGetSavedEventQuery } from '../stores/features/event/eventService';

function useEventsWithSavedStatus(allEvents: any[]) {
  const [eventsWithSavedStatus, setEventsWithSavedStatus] = useState([]);

  useEffect(() => {
    const fetchSavedStatus = async () => {
      const updatedEvents = [];
      for (const event of allEvents) {
        try {
          const { data: savedEventData } = await useGetSavedEventQuery(event.id);
          const isSaved = !!savedEventData;
          updatedEvents.push({ ...event, isSaved });
        } catch (error) {
          console.error('Error fetching saved status for event:', event.id, error);
        }
      }
      setEventsWithSavedStatus(updatedEvents);
    };

    if (allEvents.length > 0) {
      fetchSavedStatus();
    }
  }, [allEvents]);

  return eventsWithSavedStatus;
}

export default useEventsWithSavedStatus;
