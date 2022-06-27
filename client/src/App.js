import Tweet from './components/tweet'
import './App.css';
import { useEffect, useState } from 'react';
import { Modal } from 'antd';

export default function App() {

  const [tweets, setTweets] = useState([])

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [tweetName, setTweetName] = useState('');
  const [tweetContent, setTweetContent] = useState('');

  const [searchAuthor, setSearchAuthor] = useState("")

  const [error, setError] = useState("")

console.log(searchAuthor)
  // récupérer les tweets de la bdd au chargement de la page
  useEffect(() => {
    // Récupérer les tweets d'un auteur spécifique : 
    if (searchAuthor !== ""){
      const loadData = async () => {
        const rawData = await fetch(`/tweets/${searchAuthor}`);
        const data = await rawData.json();
        setTweets(data.authorTweets)
        setError(data.error)
        console.log(data)
      }
      loadData()
    } else {
      const loadData = async () => {
        const rawData = await fetch('/alltweets');
        const data = await rawData.json();
        setTweets(data.allTweets)
        console.log(data)
        setError()
      }
      loadData()
    }
  }, [confirmLoading, searchAuthor])

  console.log(tweets)

  // Afficher les tweets :
  let tweetList = tweets.map((t, i) => {
      return (
        <Tweet key={t._id} author={t.authorName} content={t.content} date={t.date} />
      )
    }).reverse()

  // Gestion de la modal
  const showModal = () => {
    setVisible(true);
    setTweetName('');
    setTweetContent('');
  };

  const handleOk = () => {
    setConfirmLoading(true);
    sendTweet()
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
    setTweetName();
    setTweetContent();
  };

  const handleCancel = () => {
    setVisible(false);
    setTweetName();
    setTweetContent();
  };

  // Envoi d'un nouveau Tweet :
  const sendTweet = async () => {
    const tweetData = await fetch('/sendtweet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `authorName=${tweetName}&content=${tweetContent}`
    })

    const body = await tweetData.json()

    console.log(body)
  }


  return (
    <div className="App">
      <h1>Welcome to WikiTweet !</h1>
      <div>
        <input placeholder="Chercher en auteur" className='search'
         onChange={(e) => setSearchAuthor(e.target.value)}/>
      </div>
      <button className='envoyerTweet' onClick={() => showModal()}>Envoyer un Tweet</button>
      <Modal
        title='Ecrivez votre tweet !'
        visible={visible}
        onOk={handleOk}
        okText="Envoyer"
        cancelText="Annuler"
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <form className='formTweet'>
          <input type="text" placeholder='Nom' className='nameInput'
            onChange={(e) => setTweetName(e.target.value)} />
          <textarea type="text" placeholder='Ajouter un tweet' className='tweetInput'
            onChange={(e) => setTweetContent(e.target.value)} />
        </form>
      </Modal>
      {error}
      {tweetList}
    </div>
  );
}

