const rootUrl = "http://localhost:8081";

const options = (method, body) => ({
  method,
  headers: { "Content-Type": "application/json" },
  body: body ? JSON.stringify(body) : undefined,
});

export default {
  methods: {
    getNote: (id) => fetch(`${rootUrl}/documents/${id}`, options("GET")),
    getNotes: () => fetch(`${rootUrl}/documents`, options("GET")),
    postNote: (note) => fetch(`${rootUrl}/documents`, options("POST", note)),
    putNote: (id, note) =>
      fetch(`${rootUrl}/documents/${id}`, options("PUT", note)),
    deleteNote: (id) => fetch(`${rootUrl}/documents/${id}`, options("DELETE")),
  },
};
