import React, { useState, useCallback } from 'react';

const App = () => {
  let [target, setTarget] = useState('');
  let [version, setVersion] = useState(1);
  let [oid, setOid] = useState('');

  let [error, setError] = useState(null);

  let [subtree, setSubtree] = useState([]);
  let [changed, setChanged] = useState([]);

  let fetchSubtree = useCallback(() => {
    let body = JSON.stringify({
      target,
      options: { version },
      oid,
    });

    fetch('http://localhost:4444/subtree', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    })
      .then(res => res.json())
      .then(setSubtree)
      .catch(setError);
  }, [target, version, oid]);

  return (
    <div>
      <h1>Firebone Drivers</h1>

      <section>
        <h2>Session</h2>
        <fieldset>
          <label>
            Host:
            <input value={target} onChange={e => setTarget(e.target.value)} />
          </label>
          <label>
            Version:
            <select value={version} onChange={e => setVersion(+e.target.value)}>
              <option value={0}>SNMP v1</option>
              <option value={1}>SNMP v2c</option>
            </select>
          </label>
        </fieldset>
      </section>

      <section>
        <h2>Subtree</h2>
        <fieldset>
          <label>
            Root OID:
            <input value={oid} onChange={e => setOid(e.target.value)} />
          </label>
          <button onClick={fetchSubtree}>Fetch</button>

          {error && <p>{error.message || error}</p>}
        </fieldset>

        <ul className="varbinds">
          {subtree.map(varbind => (
            <li key={varbind.oid}>
              <span className="oid">{varbind.oid}</span>
              <span className="type">{varbind.type}</span>
              <span className="value">{varbind.value}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default App;
