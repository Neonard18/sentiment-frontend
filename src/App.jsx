import React, {useEffect, useState } from "react";
import Swal from "sweetalert2";


function App(props) {
  const [user, setUser] = useState([])
  const [news, setNews] = useState(null)
  const [ticker, setTicker] = useState(null)
  const [watchList, setWatchList] = useState([])
  const [graph, setGraph] = useState(null)
  const [loading, setLoading] = useState()
  const [symbol, setSymbol] = useState()


  useEffect(() => {getUser()},
  [])
  useEffect(() => {getWatchList()},
  [watchList])

  const popupForm = document.getElementById('popupForm')
  const symb = document.getElementById('symb')
  // const closeButton = document.querySelector('.close-button')


  // User API
  let getUser = async () => {
    let resp = await fetch('http://localhost:8000/api/user/get_current_user/',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${props.token.token.token}`,
        }
      }
    )
    
    let data = await resp.json()
    setUser(data)
  }

  let getWatchList = async () => {
    let resp = await fetch('http://localhost:8000/api/watch-list/get_stock_data/',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${props.token.token.token}`,
          }
      }
    )

    let data = await resp.json()
    setWatchList(data);
  }

  let getGraph = async () => {
    setLoading(true)
    let resp = await fetch('http://localhost:8000/api/watch-list/plot_stock_data/',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${props.token.token.token}`,
          }
      }
    )

    let data = await resp.json()
    if (data['data'] === 'Plotted') {
      let response = await fetch(`http://localhost:8000/api/static/graph${user.id}.png/`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Token ${props.token.token.token}`,
          }
        }
      )
      let data = await response.blob()
      const url = URL.createObjectURL(data)
      setLoading(false)
      setGraph(url)
    }
  }

  let addSymbol = async (symbol) => {
    try{
      let resp = await fetch('http://localhost:8000/api/watch-list/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${props.token.token.token}`,
        },
        body: JSON.stringify({'symbol':symbol})
      })

      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`);
      } else{
        Swal.fire({
          title: `${symbol.toUpperCase()} have been created.`,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        })
      }   
    }catch (error) {
      console.log(error);
    }
  }

  let deleteList = (id) => {
   fetch(`http://localhost:8000/api/watch-list/${id}/`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${props.token.token.token}`,
        }
      }
    )
    getWatchList()
  }

  const spanStyle = {
    display: 'block',
    margin: '6px',
  }
  
  if (!props.token.token) window.location.href = '/'
  return (
    <>
      <head>
        <title>Dashboard</title>
      </head>
      <div className="second-body">
      <div className="nav-bar">
        <div className="logo">
          <button className="log-out"
            onClick={() => {
              props.removeToken('token')
            }}>Log Out</button>
        </div>

        <div className="user">
          <img src="" alt="" className="image-user" />
          <div className="user-flex">
            <h1>{user && user.email}</h1>
          </div>
        </div>
      </div>

      <div className="dash-place">
        <div className="dash-board">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Stock Name</th>
                <th>Last Price</th>
                <th>24h %</th>
                <th>Market Cap</th>
                <th>News</th>
              </tr>
            </thead>
            <tbody>
            {
              Array.isArray(watchList)? 
              (watchList.map((item, index) => (
                  <tr key={index}>
                    <td>{item.symbol ?? 'N/A'}</td>
                    <td>${item.close ?? 'N/A'}</td>
                    <td>{item.per_chg ?? 'N/A'}</td>
                    <td>${item.cap ?? 'N/A'}</td>
                    <td>
                      <button
                        className="news-button"
                        onClick={() => {
                        setNews(item.news);
                        setTicker(item.symbol)}}>
                        News
                      </button>
                    </td>
                    <td>
                      <td className="delete" 
                      onClick={() => {deleteList(item.id)}}>delete
                      </td>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No data available. Check your internet connection</td>
                </tr>
              )}
            </tbody>
          </table>
          
          <button id="popupButton" className="plus-button"
            onClick={() => {
              popupForm.style.display = 'flex'
            }}>+</button>

        <div id="popupForm" className="popup-form">
          <div className="popup-content">
            <span className="close-button"
              onClick={() => {
                popupForm.style.display = 'none'
              }}>&times;</span>
            <h2>Add Symbol</h2>
              <div>
                <input type="text" id="symb" className="input-field" defaultValue="" name="symbol" placeholder="Ticker" 
                  onChange={
                    (event) => {setSymbol(event.target.value)} 
                    }/>
                <button type="submit" className="login-button" 
                  onClick={() => {
                    popupForm.style.display = 'none'
                    symb.value = ''
                    addSymbol(symbol)
                    }}>POST</button>
              </div>
          </div>
        </div>

          <div className="dash-row">
            <div className="news-section">
              <h1>Latest News</h1> <span>{ticker}</span>
              <p className="fetched-text">
                {news?
                  news.map((headline, index) => (
                    <React.Fragment key={index}>
                        <span style={spanStyle}>{headline}.</span>               
                    </React.Fragment>
                  )):
                  <>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse
                    blanditiis quae mollitia totam, quia ea dolores beatae possimus
                    voluptas numquam nesciunt libero rem delectus optio veritatis ex
                    ipsam? Placeat enim voluptatem in saepe! Sit neque similique
                    rerum modi reiciendis fugit! Lorem ipsum dolor, sit amet
                    consectetur adipisicing elit. Sapiente at earum quae, repellat
                    eum soluta unde illo provident eaque necessitatibus.
                  </>}
              </p>
            </div>
            <div className="plot-section">
              <button className="plot-graph"
                onClick={
                  () => {getGraph()}}>
                    Plot Graph
              </button>
              <h1>Graph</h1>
              {loading? 
                <div className="parent-loader"><div className="loader">i</div></div> :
                <img src={graph} alt=""></img>}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
   
  );
}

export default App;
