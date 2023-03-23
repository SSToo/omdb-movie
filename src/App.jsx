import './App.css'
import axios from 'axios'
import { useState } from 'react'

export default function App() {
  const [flie, setFlie] = useState('')
  const [word, setWord] = useState('')

  const newsite = `http://www.omdbapi.com/?s=${word}&apikey=e3ab2fb7`

  function changeword(e) {
    setWord(e.target.value)
  }

  function sourcebtn() {
    axios(newsite).then(data => setFlie(data))

  }


  return (
    <>
      <Header />
      <Search word={word} changeword={changeword} sourcebtn={sourcebtn} />
      {flie === '' ? <Def value={'在输入框上输入文字开始搜索电影'}/> : (flie.data.Response === 'False' ? <Def value={'没有相关影片呢！'} /> :
        <Films data={flie.data} changeword={changeword} sourcebtn={sourcebtn} setWord={setWord} />)
      }
    </>
  )
}

function Def({value}) {
  return (
      <h3 className='kong'>{value}</h3>
  )
}

function Header() {
  return (
      <div className="header">MOVIE</div>
  )
}

function Search({ word, changeword, sourcebtn }) {
  return (
    <div className='search'>
      <input type="text" placeholder='请输入电影名字' className='input'
        value={word} onChange={changeword} />
      <button className='btn' onClick={sourcebtn}>搜索</button>
    </div>
  )
}

function Film({ data }) {
  return (
      <span className='film'>
        <img src={data.Poster} alt="" className='pit' />
        <div className='title'>{data.Title}</div>
        <div className='year'>{data.Year}</div>
      </span>
  )
}

function Films({ data }) {
  const flims = data.Search.map(item => <Film data={item} key={item.imdbID} />)
  return (
      <div className='films'>
        {flims}
      </div>
  )
}