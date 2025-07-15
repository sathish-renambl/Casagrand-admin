import { useState, useEffect } from 'react';
import Blank from '../../components/ui/Blank';
import AgentTable from '../../components/Agents/agentTable';
import { Agent } from '../../components/Agents/agentType';
import { useAppContext } from '../../context/appContext';
import { useLogOut } from '../../hooks/useLogOut';
import { useInRouterContext } from 'react-router-dom';

const Agents: React.FC = () => {
  const { URL } = useAppContext();
  const logOut = useLogOut();
  const [agentsData, setAgentsData] = useState<Agent[]>([]);
  console.log("Is in router context:", useInRouterContext());
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchAllAgents(token);
      console.log("Token ===>",token)
    } else {
      console.log('Token not found. Please log in.');
    }
  }, []);

  async function fetchAllAgents(token: string) {
    try {
      const res = await fetch(`${URL}agents/getAllAgents`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        const data: Agent[] = await res.json();
        console.log("Agent Data ===>",data)
        setAgentsData(data);
      } else if (res.status === 401 || res.status === 403) {
        console.log('Unauthorized access. Please log in again.');
        logOut();
      } else {
        console.log(`Unexpected error: ${res.status}`);
      }
    } catch (error) {
      console.error('Failed to fetch agents:', error);
    }
  }

  return (
    <Blank title="Agents">
      <AgentTable agents={agentsData} />
    </Blank>
  );
};

export default Agents;