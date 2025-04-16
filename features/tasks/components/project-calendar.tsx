'use client';

import {
  format,
  getDay,
  parse,
  startOfWeek,
  addMonths,
  subMonths,
} from 'date-fns';

import { Calendar, dateFnsLocalizer } from 'react-big-calendar';

import { TaskWithProjectAndAssignee } from '@/types';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './data-calendar.css';
const locale = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locale,
});

import React, { useState } from 'react';

type Props = {
  tasks: TaskWithProjectAndAssignee[];
};

export const ProjectCalendar = ({ tasks }: Props) => {
  const [value, setValue] = useState(
    tasks.length > 0 ? new Date(tasks[0].dueDate) : new Date()
  );

  const events = tasks.map((task) => ({
    start: new Date(task.dueDate),
    end: new Date(task.dueDate),
    title: task.name,
    project: task.project,
    assignee: task.assignee,
    status: task.status,
    id: task.$id,
  }));
  console.log(events);

  const handleNavigate = (action: 'PREV' | 'NEXT' | 'TODAY') => {
    if (action === 'PREV') {
      setValue(subMonths(value, 1));
    } else if (action === 'NEXT') {
      setValue(addMonths(value, 1));
    } else {
      setValue(new Date());
    }
  };

  return (
    <Calendar
      localizer={localizer}
      date={value}
      events={events}
      views={['month']}
      defaultView="month"
      toolbar
      showAllEvents
      className="h-full"
      max={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
      formats={{
        weekdayFormat: (date, culture, localizer) =>
          localizer?.format(date, 'EEE', culture) ?? '',
      }}
    />
  );
};
