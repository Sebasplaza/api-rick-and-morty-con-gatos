import { useEffect, useState } from "react";
import "./App.css";
const CAT_ENDPOINT_RANDOM_FACT = "https://catfact.ninja/fact";
// const CAT_ENDPOINT_IMAGE = `https://cataas.com/cat/says/${firstWord}?size=:size&color=:color&json=true`;
export function App() {
  const [fact, setFact] = useState("soy un texto de un gatio");
  const [imgUrl, setImgUrl] = useState();
  const [name, setName] = useState("sin nombre");
  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then((res) => res.json())
      .then((data) => {
        const { fact } = data;
        setFact(fact);

        const firstWord = fact.split(" ").slice(0, 3).join(" ");
        console.log(firstWord);

        fetch(`https://rickandmortyapi.com/api/character`)
          .then((res) => res.json())
          .then((response) => {
            function getRandomInt(min, max) {
              min = Math.ceil(min);
              max = Math.floor(max);
              return Math.floor(Math.random() * (max - min) + min);
            }
            setImgUrl(`https://rickandmortyapi.com/api/character/avatar/${getRandomInt(1, 826)}.jpeg
            `);
          });
      });
  }, []);

  return (
    <>
      <section>
        <div className="card">
          {imgUrl && <img src={imgUrl} alt={imgUrl} className="imagen" />}
          <p>{fact}</p>
        </div>
      </section>
    </>
  );
}
