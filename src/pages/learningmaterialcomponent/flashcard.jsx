
 
import React, { useEffect, useState } from "react";

export const FlashCard = () => {
    const [objects, setObjects] = useState([
        { id: 1, front: 'nigga', back: 'niggaback', },
        { id: 2, front: 'what', back: 'whatback', },
        { id: 3, front: 'warren', back: 'warrenback', },
        { id: 4, front: 'eat', back: 'eatback', },
        { id: 5, front: 'sleep', back: 'sleepback', },
    ]);

    // Function to shuffle objects
    const shuffleObjects = () => {
        const shuffled = [...objects];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        setObjects(shuffled);
    };

    var [index, setIndex] = useState(0);


    if (index === objects.length) {
        index = 0;
        string = 'hidden';
    }
    if (index < 0) {
        index = objects.length-1;
    }


    console.log(index)

    const [showFlashCard, setShowFlashCard] = useState(false);
    var string = showFlashCard ? '' : 'hidden';

    const [showAnswer, setShowAnswer] = useState(false);
    const [backanswer, setBackAnswer] = useState('');
    // const showAnswerString = showAnswer ? '' : 'hidden';
  
    useEffect(() => {
        if (showAnswer === true) {
            setBackAnswer(objects[index].back); 
        }
        if (showAnswer === false) {
            setBackAnswer(''); 
        }
    }, [showAnswer])
       
    


    return (
        <div className="border border-green-400 h-[90%] w-[69rem] max-w-[95%]">

            <button onClick={() => { shuffleObjects(); setShowFlashCard(true); }} className="bg-yellow-500">sample flashcard</button>

            {objects.map(obj => (
                <li key={obj.id}>{obj.front}</li>
            ))}

            <div className={`${string} border border-yellow-500 h-[10rem] w-[12rem] flex flex-col items-center justify-between`}>

                <p>{objects[index].front}</p>
                <p>{backanswer}</p>
               

                <div className="w-full flex items-center justify-between">
                    <button onClick={() => {setShowAnswer(true)}} className="bg-green-500">
                        show answer
                    </button>
                    <button onClick={() => {setIndex(index - 1); setShowAnswer(false)}} className="bg-blue-500">
                        prev
                    </button>
                    <button onClick={() => {setIndex(index + 1); setShowAnswer(false)}} className="bg-blue-500">
                        next
                    </button>
                    <button onClick={() => setShowFlashCard(false)} className="bg-red-500">
                        close
                    </button>
                </div>

            </div>
        </div>
    );
};





