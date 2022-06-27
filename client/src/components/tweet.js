import '../App.css'


export default function Tweet(props){
   
    //pour formater la date
    let dateFormat = function (date) {
        var dates = new Date(date);
        return dates.toLocaleDateString("fr")
      }

    return (
        <>
         <div className="tweetCard">
            <div>
            <img src='../images/utilisateur.png' className='avatar' alt='avatar'/>
            </div>
            <div>
                <div className='tweetInfo'>
                <h6>{props.author}</h6>
                <p className='date'>{dateFormat(props.date)}</p>
                </div>
            <p className='content'>{props.content}</p>
            </div>
        </div>
        </>
       
    )
}