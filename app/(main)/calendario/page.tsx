'use client';

import { Calendar, dayjsLocalizer, Event, EventPropGetter } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';

import { useState, useEffect } from 'react';
import { ClipboardPenLine } from 'lucide-react';

interface Events {
  id: number;
  start_time: string;
  end_time: string;
  title: string;
}

const CustomEvent = ({ event }: { event: Event }) => (
  <div className="flex items-center">
    <ClipboardPenLine className="w-4 h-4 mr-2" />
    <span>{event.title}</span>
  </div>
);

export default function Page() {
  const localizer = dayjsLocalizer(dayjs);
  const [events, setEvents] = useState<Events[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/events');
        console.log('Response status:', res.status);

        const data = await res.json();
        console.log('Response data:', data);

        if (!res.ok) {
          throw new Error(data.message || 'Algo salio mal');
        }

        setEvents(data as Events[]);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err as Error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Map the fetched data to the format required by React Big Calendar
  const calendarEvents: Event[] = events.map((event: Events) => ({
    start: new Date(event.end_time),
    end: new Date(event.end_time),
    title: event.title,
  }));


  const eventPropGetter: EventPropGetter<Event> = () => {
    const style = {
      backgroundColor: '#4CAF50',
      color: 'white',
    };

    return {
      style,
    };
  };

  return (
    <main className="flex items-center justify-center bg-white">
      <section className="h-screen w-11/12 m-8">
        <Calendar
          localizer={localizer}
          events={calendarEvents}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={eventPropGetter}
          components={{
            event: CustomEvent,
          }}
        />
      </section>
    </main>
  );
}