##  Calendar Implementation Notes

For this assessment, I chose to use the **[FullCalendar](https://fullcalendar.io/docs/react)** React library. It made implementing a calendar UI much easier and provided powerful built-in features like:

* Multiple views (month, week, list)
* Date selection
* Event rendering
* Good integration with external data sources

### Loading Events by Date Range

Events are **only loaded for a specific time range** (based on the visible calendar view). This improves performance significantly.

Imagine a system where all events are loaded at once – it would quickly become a performance bottleneck as the dataset grows. That's why I implemented **lazy loading** based on the current view’s start and end dates.

### 🗃️ Database Optimization

To support efficient date-based loading, the database table `appointments` should have appropriate **indexes**, especially if we expect a large number of events. For optimal query performance, I recommend indexing the following fields:

* `start`
* `end`
* `patient` (foreign key)
* `category` (foreign key)

```sql
CREATE INDEX idx_appointments_start_end ON public.appointments (start, end);
CREATE INDEX idx_appointments_patient ON public.appointments (patient);
CREATE INDEX idx_appointments_category ON public.appointments (category);
```

---

Thank you for the assessment! I really enjoyed working on it, and I hope you liked my submission. Looking forward to any feedback.
