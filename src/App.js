import { useState } from 'react';
import { ArrowLeft, Trash2, Send } from 'lucide-react';
import './App.css';

export default function App() {
  const [screen, setScreen] = useState('list')
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [texts, setTexts] = useState([
    { id: 1, title: 'All about TON. How The Open Network works ', description: `
      The history of the Telegram Open Network
In 2018, the Durov brothers published a technical document for the first-level blockchain Telegram Open Network (TON). The idea of the project was to transfer the popular Telegram messenger to TON, in order to subsequently make the most anonymous and secure application protected by its own proxy.

TON was described as a platform for decentralized applications and services that could be used as an alternative to Visa and MasterCard payment processing services due to its scalability and ability to support millions of transactions per second.

Telegram Open Network had unique features, including shardchains, a self-healing mechanism, a decentralized data warehouse, a domain name service, a TON virtual machine, and built-in privacy tools. The cryptocurrency of the project was called Gram (GRM) and was used for calculations and payment of commissions.

To finance the development of the blockchain, Telegram conducted a private initial coin offering. The ICO, which took place in February-March 2018, was a huge success. In two rounds, the company raised $1.7 billion from investors, selling 44% of the total issue of tokens.

Conflict with the SEC
In October 2019, the U.S. Securities and Exchange Commission (SEC) sued Telegram. The agency claimed that the original buyers of Gram would act as underwriters in the distribution of unregistered securities. 

On June 11, 2020, a six-month legal battle ended with a federal court ruling that Telegram should refrain from issuing tokens.

After that, Pavel Durov announced the termination of the messenger's active cooperation with TON.

Telegram soon entered into an agreement with the SEC and agreed to return $1.22 billion as the "termination amount" of the Gram purchase agreements. The company also paid a fine of $18.5 million to the regulator. 

After the defeat in court, Telegram announced the termination of work on the TON network and posted the source code of the project in open access on GitHub, calling on the community to take over management.` },
    { id: 2, title: 'The story of Tact language: from idea to release', description: `Several major events happened recently in the TON Ecosystem regarding Tact language:

 Tact 1.0 was released, meaning the compiler got the basic feature set required for relying on Tact as a fully fleshed-out language. It should be noted that the compiler is still undergoing reviews and security audits.
 Tact Software Foundation was established. So while this community body is not a part of the TON Foundation, it is supported and guided by TON Foundation. Tact Software Foundation is managed by four founders that are very active in the TON community: Oleg Andreev, Steve Korshakov, Tal Kol and Kirill Emelyanenko. There are also two advisers: Kirill Malev and Lyubov Shombina.
New ecosystem projects emerged such as the Tact by Example website made by Tal Kol.
So Tact graduated to a new level of maturity, and it's time for many developers in the TON ecosystem to consider it.

But why was there a need for another language for TON if there are FunC and Fift? How did it all start? And how did it get to where it is today? To answer that, I reached out to some of the key people involved in Tact and they told me their perspectives.` },
    { id: 3, title: 'Tact Programming Language', description: `Tact and FunC
FunC is a lower-level language aimed at developers who are deeply familiar with TON architecture. FunC liberates developers from writing raw Fift code, while providing the same level of control.

Unfortunately, the precision of FunC makes it harder to write complex multi-contract systems.

Tact enables developers to go even further: you can write the entire suites of smart contracts with strongly typed interfaces and statically verified execution costs. With Tact you can focus on your problem and worry less about blockchain idiosyncrasies.` },
  ])

  const handleSave = () => {
    if (title && text) {
      setTexts([...texts, { id: Date.now(), title:title, description: text }])
      setTitle('')
      setText('')
      setScreen('list')
    }
  }

  function findItem(id){
    console.log(id);
    let saved = '';
    texts.forEach((item) => {
      console.log(`item id: ${item.id}  id: ${id}`)
      console.log(`equals: ${item.id == id}`)

        if(item.id == id){
          saved = item;
        }
    })
    console.log(saved);
    return saved;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F7F9FB]">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
        {screen === 'list' && (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Hello @LarKeSss</h2>
            <div className="space-y-2 mb-4">
              {texts.map((item) => (
                <div
                  key={item.id}
                  className="p-2 bg-[#F7F9FB] rounded cursor-pointer hover:bg-gray-200"
                  onClick={() => setScreen(`view|${item.id}`)}
                >
                  {item.title}
                </div>
              ))}
            </div>
            <button
              className="w-full py-2 bg-[#0098EA] text-white rounded hover:bg-[#2D83EC]"
              onClick={() => setScreen('new')}
            >
              Create new article!
            </button>
          </div>
        )}

        {screen.includes("view") && (
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <button onClick={() => setScreen('list')}>
                <ArrowLeft className="text-[#0098EA]" />
              </button>
              <h2 className="text-xl font-bold">
                {findItem(screen.split("|")[1]).title}
              </h2>
              <button>
                <Trash2 
                className="text-[#0098EA]" 
                onClick={() => {
                  setTexts(texts.filter((item) => {
                    return item.id != screen.split("|")[1];
                  }));
                  setScreen('list');
                }}
                />
              </button>
            </div>
            <div className="bg-[#F7F9FB] p-4 rounded-lg h-96 overflow-y-auto">
             {findItem(screen.split("|")[1]).description}
            </div>
          </div>
        )}

        {screen === 'new' && (
          <div className="p-4">
            <div className="flex items-center mb-4">
              <button onClick={() => setScreen('list')}>
                <ArrowLeft className="text-[#0098EA]" />
              </button>
              <input
                type="text"
                placeholder="Title"
                className="flex-grow ml-4 p-2 border rounded"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <textarea
              className="w-full h-96 p-4 bg-[#F7F9FB] rounded-lg resize-none mb-4"
              placeholder="Text Area"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
            <button
              className="w-full py-2 bg-[#0098EA] text-white rounded hover:bg-[#2D83EC] flex items-center justify-center"
              onClick={handleSave}
            >
                            <Send className="mr-2" />
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  )
}