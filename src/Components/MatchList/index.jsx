import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context';
import { fetchMatches } from '../../api';

const MatchList = () => {
    const { currentUser } = useContext(AppContext);
    const [matches, setMatches] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadMatches = async () => {
            if (currentUser) {
                const matchData = await fetchMatches(currentUser.id);
                setMatches(matchData);
            }
        };
        loadMatches();
    }, [currentUser]);

    const handleChatClick = (matchUserId) => {
        navigate(`/mensajes?chat=${matchUserId}`);
    };

    return (
        <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-2xl font-bold mb-4">Tus Matches</h2>
            <div className="grid grid-cols-1 gap-4">
                {matches.map((match) => (
                    <div 
                        key={match.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                        <div className="flex items-center space-x-4">
                            <img 
                                src={match.image} 
                                alt={match.first_name}
                                className="w-12 h-12 rounded-full"
                            />
                            <div>
                                <h3 className="font-semibold">
                                    {match.first_name} {match.last_name}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Match: {new Date(match.match_date).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleChatClick(match.id)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Chatear
                        </button>
                    </div>
                ))}
                {matches.length === 0 && (
                    <p className="text-center text-gray-500">
                        Aún no tienes matches. ¡Sigue dando likes!
                    </p>
                )}
            </div>
        </div>
    );
};

export default MatchList;