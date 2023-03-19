export function createLocal() {
  const local = {
    id: 1,
    name: "local1"
  };
  return local; 
}

export function createActivity(localId: number) {
  return {
    id: 1,
    description: "atividade1",
    hourStart: "2023-03-18:9:30",
    hourEnd: "2023-03-18:10:00",
    localId,
    date: "2023-03-18",
    limit: 20
  }; 
}
