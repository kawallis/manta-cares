const BASE_URL = "http://localhost:3030";

async function handleResponse(res: Response) {
  const json = await res.json();
  if (!res.ok || json.code !== 200) {
    throw new Error(json.message || "Unknown error");
  }
  return json.message;
}

export const api = {
  getSymptoms: async () => {
    const res = await fetch(`${BASE_URL}/symptoms/getAll`);
    return handleResponse(res);
  },
  getSymptomById: async (id: number | string) => {
    const res = await fetch(`${BASE_URL}/symptoms/getById/${id}`);
    return handleResponse(res);
  },
  getInterventions: async () => {
    const res = await fetch(`${BASE_URL}/interventions/getAll`);
    return handleResponse(res);
  },
  getInterventionById: async (id: number | string) => {
    const res = await fetch(`${BASE_URL}/interventions/getById/${id}`);
    return handleResponse(res);
  },
};
