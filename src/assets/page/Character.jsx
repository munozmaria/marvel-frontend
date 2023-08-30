import { useParams } from "react-router-dom";

const Character = () => {
  const { characterId } = useParams();
  console.log(characterId)

  return <div>Character: {characterId}</div>;
};

export default Character;
