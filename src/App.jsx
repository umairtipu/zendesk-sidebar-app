import { useEffect, useState } from 'react';
import TicketInfo from './components/TicketInfo';
import CustomerInfo from './components/CustomerInfo';
import PostsList from './components/PostsList';
import ReplyDraft from './components/ReplyDraft';

function App() {
  const [ticket, setTicket] = useState(null);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [replyDraft, setReplyDraft] = useState('');

  // Initialize ZAF client safely
  const getClient = () => {
    if (typeof ZAFClient !== 'undefined') {
      return ZAFClient.init();
    }
    
    // Fallback for development
    if (process.env.NODE_ENV === 'development') {
      return {
        get: async () => ({
          ticket: {
            requester: { email: 'Sincere@april.biz' },
            subject: 'Test Subject',
            description: 'Test Description'
          }
        })
      };
    }
    
    throw new Error('ZAFClient not available');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const client = getClient();
        
        // Get ticket data
        const ticketData = await client.get('ticket');
        setTicket(ticketData.ticket);

        // For development with mock data
        if (!ticketData.ticket.requester?.email && process.env.NODE_ENV === 'development') {
          ticketData.ticket.requester = { email: 'Sincere@april.biz' };
        }

        if (!ticketData.ticket.requester?.email) {
          setError('No requester email found');
          setLoading(false);
          return;
        }

        // Fetch user data
        const userResponse = await fetch(
          `https://jsonplaceholder.typicode.com/users?email=${ticketData.ticket.requester.email}`
        );
        const users = await userResponse.json();
        
        if (users.length === 0) {
          setError('Customer not found');
          setLoading(false);
          return;
        }

        const foundUser = users[0];
        setUser(foundUser);

        // Fetch posts
        const postsResponse = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${foundUser.id}`
        );
        const userPosts = await postsResponse.json();
        setPosts(userPosts.slice(-3).reverse());
        
        generateReplyDraft(ticketData.ticket, foundUser);

      } catch (err) {
        console.error("Error:", err);
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const generateReplyDraft = (ticket, user) => {
    const draft = `Hi ${user.name}, thanks for reaching out about "${ticket.subject}". I've reviewed your message and account with ${user.company.name} in ${user.address.city}. Here's what I can do next: ... Please confirm any extra details so I can proceed.`;
    setReplyDraft(draft);
  };

  const handleRefresh = () => window.location.reload();
  const handleCopy = () => navigator.clipboard.writeText(replyDraft);
  const handleRegenerate = () => user && ticket && generateReplyDraft(ticket, user);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error} <button onClick={handleRefresh}>Retry</button></div>;

  return (
    <div className="app">
      {ticket && <TicketInfo ticket={ticket} />}
      {user && (
        <>
          <CustomerInfo user={user} />
          <PostsList posts={posts} />
          <ReplyDraft draft={replyDraft} />
          <div className="buttons">
            <button onClick={handleRegenerate}>Regenerate</button>
            <button onClick={handleCopy}>Copy to Clipboard</button>
            <button onClick={handleRefresh}>Refresh Data</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;