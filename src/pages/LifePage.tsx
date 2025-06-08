import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/LifePage.css';

type NoteMap = {
  [key: string]: string;
};

const STORAGE_KEY = 'volga_life_notes';

function LifePage() {
  const [date, setDate] = useState<Date>(new Date());
  const [notes, setNotes] = useState<NoteMap>({});
  const [note, setNote] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  const key = date.toDateString();

  useEffect(() => {
    const savedNotes = localStorage.getItem(STORAGE_KEY);
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    setNote(notes[key] || '');
  }, [key, notes]);

  const handleDateChange = (
    value: Date | [Date | null, Date | null] | null,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (value instanceof Date) {
      setDate(value);
    } else if (Array.isArray(value) && value[0] instanceof Date) {
      setDate(value[0]);
    }
  };

  const saveNote = () => {
    const newNotes = { ...notes, [key]: note };
    setNotes(newNotes);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newNotes));
  };

  return (
    <div className="life-page">
      <h2 className="life-header">Мои заметки</h2>

      <Calendar onChange={handleDateChange} value={date} className="calendar" />

      <div className="note-card">
        <h3>{key}</h3>
        <textarea
          className="note-input"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Введите заметку..."
        />
        <button className="save-btn" onClick={saveNote}>Сохранить</button>
      </div>

      <button className="history-btn" onClick={() => setShowHistory(prev => !prev)}>
        {showHistory ? 'Скрыть историю' : 'Показать историю заметок'}
      </button>

      {showHistory && (
        <div className="history-section">
          <h3>История заметок</h3>
          {Object.entries(notes).length === 0 ? (
            <p>Нет сохранённых заметок.</p>
          ) : (
            <ul className="note-history">
              {Object.entries(notes).map(([dateKey, text]) => (
                <li key={dateKey} className="history-item">
                  <strong>{dateKey}:</strong> {text}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default LifePage;
