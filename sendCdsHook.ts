import axios from 'axios';

export interface CdsHookRequest {
  hook: string;
  fhirServer?: string;
  context: Record<string, any>;
  prefetch?: Record<string, any>;
}

export const sendCdsHook = async (hookId: string, payload: CdsHookRequest) => {
  const res = await axios.post(`http://localhost:3000/cds-services/${hookId}`, payload, {
    headers: { 'Content-Type': 'application/json' }
  });
  return res.data.cards || [];
};
