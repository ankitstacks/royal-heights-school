import { useMemo, useState } from "react";
import {
  ArrowLeft, ArrowRight, CalendarDays, CalendarCheck, PartyPopper,
  BookOpen, Flag, Star, Clock3, MapPin, ChevronLeft, ChevronRight
} from "lucide-react";
import "./SchoolCalendar.css";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Replace or extend these sample entries with the school's confirmed dates.
const schoolEvents = [
  { date: "2026-11-14", title: "Children's Day Celebration", type: "Celebration", time: "9:00 AM", venue: "School Campus", description: "A special day of fun activities, performances and memorable moments for our students." },
  { date: "2026-11-19", title: "Parent–Teacher Meeting", type: "Academic", time: "10:00 AM – 1:00 PM", venue: "Respective Classrooms", description: "Parents can meet teachers to discuss student progress, learning goals and classroom participation." },
  { date: "2026-11-26", title: "Constitution Day", type: "Observance", time: "School Hours", venue: "School Assembly Area", description: "A school assembly to reflect on the values and principles of the Constitution of India." },
  { date: "2026-12-05", title: "Sports Activities", type: "Sports", time: "8:30 AM", venue: "School Ground", description: "Student participation in fun games and sports activities." },
  { date: "2026-12-20", title: "Winter Break Begins", type: "Holiday", time: "As per school notice", venue: "—", description: "Winter vacation begins. Please follow the official school circular for reopening details." },
];

const typeStyles = {
  Holiday: "holiday",
  Academic: "academic",
  Celebration: "celebration",
  Sports: "sports",
  Observance: "observance",
};

function dateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export default function SchoolCalendar() {
  const [viewDate, setViewDate] = useState(() => new Date(2026, 10, 1));
  const [selectedDate, setSelectedDate] = useState("2026-11-14");

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const eventsByDate = useMemo(() => {
    return schoolEvents.reduce((acc, event) => {
      (acc[event.date] ||= []).push(event);
      return acc;
    }, {});
  }, []);

  const calendarCells = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPreviousMonth = new Date(year, month, 0).getDate();
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;

    return Array.from({ length: totalCells }, (_, index) => {
      const dayNumber = index - firstDay + 1;
      if (dayNumber < 1) {
        const day = daysInPreviousMonth + dayNumber;
        return { day, date: dateKey(month === 0 ? year - 1 : year, month === 0 ? 11 : month - 1, day), outside: true };
      }
      if (dayNumber > daysInMonth) {
        const day = dayNumber - daysInMonth;
        return { day, date: dateKey(month === 11 ? year + 1 : year, month === 11 ? 0 : month + 1, day), outside: true };
      }
      return { day: dayNumber, date: dateKey(year, month, dayNumber), outside: false };
    });
  }, [year, month]);

  const selectedEvents = eventsByDate[selectedDate] || [];
  const upcomingEvents = schoolEvents
    .filter((event) => event.date >= "2026-11-05")
    .sort((a, b) => a.date.localeCompare(b.date));

  const moveMonth = (amount) => {
    setViewDate(new Date(year, month + amount, 1));
  };

  const goToToday = () => {
    const now = new Date();
    setViewDate(new Date(now.getFullYear(), now.getMonth(), 1));
    setSelectedDate(dateKey(now.getFullYear(), now.getMonth(), now.getDate()));
  };

  return (
    <main className="school-calendar-page">
      <section className="calendar-hero">
        <div className="calendar-hero-inner">
          <span className="calendar-eyebrow"><CalendarDays size={15} /> SCHOOL LIFE & IMPORTANT DATES</span>
          <h1>Our School <em>Calendar.</em></h1>
          <p>Stay connected with important school dates, celebrations, academic activities and holidays at Royal Heights Higher Secondary School.</p>
          <a className="calendar-back-link" href="/#events"><ArrowLeft size={16} /> Back to Events</a>
        </div>
        <div className="calendar-hero-decoration"><CalendarCheck size={150} strokeWidth={0.7} /></div>
      </section>

      <section className="calendar-content">
        <div className="calendar-heading-row">
          <div>
            <span className="calendar-section-kicker">PLAN AHEAD</span>
            <h2>Academic Calendar</h2>
            <p>Explore the month and select a date to view its details.</p>
          </div>
          <div className="calendar-legend">
            <span><i className="dot academic-dot" /> Academic</span>
            <span><i className="dot celebration-dot" /> Celebration</span>
            <span><i className="dot holiday-dot" /> Holiday</span>
            <span><i className="dot sports-dot" /> Sports</span>
          </div>
        </div>

        <div className="calendar-layout">
          <section className="calendar-card">
            <div className="calendar-toolbar">
              <div>
                <h3>{monthNames[month]} <span>{year}</span></h3>
                <p>School events and important dates</p>
              </div>
              <div className="calendar-controls">
                <button type="button" onClick={goToToday} className="today-button">Today</button>
                <button type="button" aria-label="Previous month" onClick={() => moveMonth(-1)}><ChevronLeft /></button>
                <button type="button" aria-label="Next month" onClick={() => moveMonth(1)}><ChevronRight /></button>
              </div>
            </div>

            <div className="calendar-grid calendar-weekdays">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => <div key={day}>{day}</div>)}
            </div>
            <div className="calendar-grid calendar-days">
              {calendarCells.map((cell, index) => {
                const dayEvents = eventsByDate[cell.date] || [];
                const selected = selectedDate === cell.date;
                return (
                  <button
                    type="button"
                    key={`${cell.date}-${index}`}
                    className={`calendar-day ${cell.outside ? "outside-month" : ""} ${selected ? "selected-day" : ""} ${dayEvents.length ? "has-event" : ""}`}
                    onClick={() => setSelectedDate(cell.date)}
                  >
                    <span className="day-number">{cell.day}</span>
                    {dayEvents.slice(0, 2).map((event) => (
                      <span key={event.title} className={`day-event-pill ${typeStyles[event.type] || "academic"}`}>{event.title}</span>
                    ))}
                    {dayEvents.length > 2 && <small>+{dayEvents.length - 2} more</small>}
                    {dayEvents.length > 0 && <span className="event-indicator" />}
                  </button>
                );
              })}
            </div>
            <p className="calendar-note">Dates and activities may change. Please refer to official school circulars for confirmed updates.</p>
          </section>

          <aside className="calendar-side-column">
            <section className="selected-event-card">
              <div className="side-card-heading">
                <span className="side-icon"><CalendarCheck size={21} /></span>
                <div><span className="calendar-section-kicker">DATE DETAILS</span><h3>Selected Day</h3></div>
              </div>
              <div className="selected-date-display">
                {new Date(`${selectedDate}T00:00:00`).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}
              </div>
              {selectedEvents.length ? selectedEvents.map((event) => (
                <article className="event-detail" key={event.title}>
                  <span className={`event-type-label ${typeStyles[event.type] || "academic"}`}>{event.type}</span>
                  <h4>{event.title}</h4>
                  <p>{event.description}</p>
                  <div className="event-meta"><Clock3 size={15} /> {event.time}</div>
                  <div className="event-meta"><MapPin size={15} /> {event.venue}</div>
                </article>
              )) : (
                <div className="no-event">
                  <Star size={24} />
                  <strong>No event scheduled</strong>
                  <p>There are no published activities for this date.</p>
                </div>
              )}
            </section>

            <section className="upcoming-card">
              <div className="side-card-heading">
                <span className="side-icon"><PartyPopper size={21} /></span>
                <div><span className="calendar-section-kicker">MARK YOUR DATES</span><h3>Upcoming Events</h3></div>
              </div>
              <div className="upcoming-list">
                {upcomingEvents.map((event) => {
                  const eventDate = new Date(`${event.date}T00:00:00`);
                  return (
                    <button type="button" className="upcoming-event" key={event.title} onClick={() => {
                      setViewDate(new Date(eventDate.getFullYear(), eventDate.getMonth(), 1));
                      setSelectedDate(event.date);
                    }}>
                      <span className="upcoming-date"><b>{eventDate.getDate()}</b><small>{eventDate.toLocaleDateString("en-IN", { month: "short" })}</small></span>
                      <span className="upcoming-copy"><strong>{event.title}</strong><small>{event.type} · {event.time}</small></span>
                      <ArrowRight size={16} />
                    </button>
                  );
                })}
              </div>
            </section>
          </aside>
        </div>

        <div className="calendar-footer-note">
          <BookOpen size={20} />
          <p><strong>Stay informed.</strong> The school will share confirmed changes, examination schedules and additional notices through official communication channels.</p>
        </div>
      </section>
    </main>
  );
}
