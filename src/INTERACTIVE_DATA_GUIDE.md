


```tsx
import { useData } from '../../lib/DataContext';

function MyComponent() {
  const {
    fireIncidents,
    addFireIncident,
    updateFireIncident,
    deleteFireIncident
  } = useData();

  // READ: Display data
  const activeIncidents = fireIncidents.filter(i => i.status === 'active');

  // CREATE: Add new incident
  const handleSubmit = (data) => {
    const newIncident = addFireIncident({
      location: data.location,
      barangay: data.barangay,
      purok: data.purok,
      description: data.description,
      reportedBy: user.name,
      reportedAt: 'Just now',
      status: 'pending',
      severity: data.severity,
      lat: data.lat,
      lng: data.lng
    });
    // ID is auto-generated
  };

  // UPDATE: Change incident status
  const handleResolve = (id) => {
    updateFireIncident(id, {
      status: 'resolved'
    });
  };

  // DELETE: Remove incident
  const handleDelete = (id) => {
    if (confirm('Delete this incident?')) {
      deleteFireIncident(id);
    }
  };
}
``