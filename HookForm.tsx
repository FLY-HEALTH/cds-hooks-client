import React, { useState } from 'react';
import { sendCdsHook } from '../api/sendCdsHook';
import { CdsCard } from './CdsCard';

const hookOptions = [
  'order-sign', 'order-select', 'patient-view',
  'encounter-start', 'encounter-discharge',
  'medication-prescribe', 'appointment-book'
];

export const HookForm = () => {
  const [hookId, setHookId] = useState('order-sign');
  const [cards, setCards] = useState<any[]>([]);
  const [context, setContext] = useState('{\n  "patientId": "123"\n}');
  const [fhirServer, setFhirServer] = useState('https://example.com/fhir');
  const [launchToken, setLaunchToken] = useState('mock-launch-token');

  const runHook = async () => {
    const parsedContext = JSON.parse(context || '{}');
    const response = await sendCdsHook(hookId, {
      hook: hookId,
      fhirServer,
      context: parsedContext
    });
    setCards(response);
  };

  return (
    <div>
      <h2>Run CDS Hook</h2>
      <div>
        <label>FHIR Server URL:</label>
        <input type="text" value={fhirServer} onChange={e => setFhirServer(e.target.value)} style={{ width: '100%' }} />
      </div>
      <div>
        <label>Launch Token:</label>
        <input type="text" value={launchToken} onChange={e => setLaunchToken(e.target.value)} style={{ width: '100%' }} />
      </div>
      <div>
        <label>Hook:</label>
        <select value={hookId} onChange={e => setHookId(e.target.value)} style={{ width: '100%' }}>
          {hookOptions.map(h => <option key={h} value={h}>{h}</option>)}
        </select>
      </div>
      <div>
        <label>Context (JSON):</label>
        <textarea
          rows={8}
          value={context}
          onChange={e => setContext(e.target.value)}
          style={{ width: '100%' }}
        />
      </div>
      <button onClick={runHook}>Execute Hook</button>
      <div style={{ marginTop: 20 }}>
        {cards.map((card, i) => (
          <CdsCard key={i} card={card} fhirServer={fhirServer} launchToken={launchToken} />
        ))}
      </div>
    </div>
  );
};
