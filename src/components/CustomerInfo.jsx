const CustomerInfo = ({ user }) => {
  return (
    <div className="customer-info">
      <h3>Customer</h3>
      <p>Name: {user.name}</p>
      <p>Company: {user.company.name}</p>
      <p>City: {user.address.city}</p>
      <p>Website: <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a></p>
    </div>
  );
};

export default CustomerInfo;