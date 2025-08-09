const TicketInfo = ({ ticket }) => {
  const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div className="ticket-info">
      <h3>Ticket</h3>
      <p>Email: {ticket.requester?.email || 'N/A'}</p>
      <p>Subject: {truncateText(ticket.subject)}</p>
      <p>Description: {truncateText(ticket.description)}</p>
    </div>
  );
};

export default TicketInfo;