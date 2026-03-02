import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { StudioStateContext } from '../context/StudioStateProvider';
import CharacterCard from '../components/ui/CharacterCard';
import { primusApi } from '../api/primus';

const CharacterMode = () => {
  const { setStudioState } = useContext(StudioStateContext);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    // Trigger the Studio State Awakening
    setStudioState('CHARACTER_AWAKENING');
  }, []);

  const handleCreateCharacter = async (data) => {
    const response = await primusApi.createCharacter(data);
    setCharacters([...characters, response]);
    // This triggers the Universe Theme update in the Provider
  };

  return (
    <div className="p-12 flex h-full">
      <div className="w-1/3 flex flex-col justify-center">
        <motion.h1 
          initial={{ x: -100 }} animate={{ x: 0 }}
          className="text-6xl font-black italic uppercase tracking-tighter"
        >
          Character <br /> Awakening
        </motion.h1>
        <p className="mt-4 text-gray-400 max-w-sm">
          Bring your inhabitants to life. The studio will shift to reflect their origins.
        </p>
        {/* Form component logic from your original Characters.jsx goes here */}
      </div>

      <div className="w-2/3 grid grid-cols-2 gap-8 overflow-y-auto pr-4 custom-scrollbar">
        {characters.map((char) => (
          <CharacterCard key={char.id} character={char} />
        ))}
      </div>
    </div>
  );
};

export default CharacterMode;