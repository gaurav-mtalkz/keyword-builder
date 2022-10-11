import { useState } from 'react'
import Switch from 'react-switch'
import './App.css'

function App() {
  const [keywords, setKeywords] = useState([])
  const [currentKeyword, setCurrentKeyword] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(-1)

  const addKeyword = () => {
    const kw = {
      key: Math.random().toString(36).slice(2),
      type: 'message',
      description: '',
      keywordMessage: '',
      flowchartName: ''
    };
    setKeywords((kws) => ([...kws, kw]));
  }

  const selectKeyword = (idx) => {
    setCurrentIndex(idx);
    setCurrentKeyword(idx >= 0 ? keywords[idx] : null);
  }

  const deleteKeyword = async(idx) => {
    const kws = [...keywords];
    await kws.splice(idx, 1);
    setKeywords(kws);
    if (idx === currentIndex) {
      selectKeyword(kws.length ? 0 : -1);
    } else {
      selectKeyword(currentIndex);
    }
    dumpData();
  }

  const updateKeyword = (key, value) => {
    const kw = {...currentKeyword};
    kw[key] = value;
    setCurrentKeyword(kw);
    const kws = [...keywords];
    kws[currentIndex] = kw;
    setKeywords(kws);
  }

  const dumpData = () => {
    console.log(keywords);
  }

  return (
    <div className="App">
      <div className="KeywordsList">
        {keywords.map((keyword, idx) => {
          return (
            <div className='card' key={keyword.key} onClick={() => selectKeyword(idx)}>
              <p><b>Key:</b> {keyword.key} <a className="deleteBtn" onClick={() => deleteKeyword(idx)}> &times; </a></p>
              <span>{keyword.description}</span><br/>
              <span><i>{keyword.type === 'flowchart' ? keyword.flowchartName : keyword.keywordMessage}</i></span>
            </div>
          )}
        )}
        <button type="button" onClick={() => addKeyword()}>Add</button>
        <button type="button" onClick={() => dumpData()}>Log to Console</button>
      </div>
      <div className="KeywordsForm">
        { currentKeyword ? (
          <form>
            <label htmlFor="key">Key<br/>
              <input type="text" id="key" onChange={(e) => updateKeyword('key', e.target.value)} value={currentKeyword.key}/>
            </label>
            <br/>
            <label htmlFor="description">Description<br/>
              <input type="text" id="description" onChange={(e) => updateKeyword('description', e.target.value)} value={currentKeyword.description}/>
            </label>
            <br/>
            <label htmlFor="type">Type<br/>
              Message
              <Switch
                checked={currentKeyword.type === 'flowchart'}
                onChange={(checked) => updateKeyword('type', checked ? 'flowchart' : 'message')}
                offColor="#008"
                onColor="#008"
                uncheckedIcon={false}
                checkedIcon={false}
              />
              Flowchart
            </label>
            <br/>
            {currentKeyword.type === 'message' && (
              <label htmlFor="message">Message<br/>
                <input type="text" id="message" onChange={(e) => updateKeyword('keywordMessage', e.target.value)} value={currentKeyword.keywordMessage}/>
              </label>
            )}
            {currentKeyword.type === 'flowchart' && (
              <label htmlFor="flowchart">flowchart<br/>
                <select id="flowchart" onChange={(e) => updateKeyword('flowchartName', e.target.value)} value={currentKeyword.flowchartName}>
                  <option value="">(None)</option>
                  <option value="first">First</option>
                  <option value="second">Second</option>
                  <option value="third">Third</option>
                </select>
              </label>
            )}
          </form>
        ) : (
          <p>Please Add a New Keyword</p>
        )}
      </div>
    </div>
  )
}

export default App
