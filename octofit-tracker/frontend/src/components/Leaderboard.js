import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboards, setLeaderboards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboards/`;
        console.log('Fetching Leaderboard from:', apiUrl);
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log('Leaderboard data received:', data);
        
        // Handle both paginated and plain array responses
        const leaderboardList = data.results ? data.results : Array.isArray(data) ? data : [];
        setLeaderboards(leaderboardList);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <div className="loading">Loading leaderboard...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="card shadow mb-4">
      <div className="card-body">
        <h2 className="card-title text-primary mb-4">Leaderboard</h2>
        {leaderboards.length === 0 ? (
          <p>No leaderboard data found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Team</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {leaderboards.map((entry) => (
                  <tr key={entry.id}>
                    <td>{entry.id}</td>
                    <td>{entry.team}</td>
                    <td>{entry.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <button className="btn btn-primary mt-3" onClick={() => window.location.reload()}>
          Refresh
        </button>
      </div>
    </div>
  );
}

export default Leaderboard;
