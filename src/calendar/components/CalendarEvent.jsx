export const CalendarEvent = ({ event }) => {
  const { title, user } = event;

  return (
    <>
      <strong>{title}</strong>
      {user && <span> - {user.name}</span>}
    </>
  );
};