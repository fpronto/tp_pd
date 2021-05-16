const rootUrl = "https://localhost:8081";

const options = (method, body) => ({
  method: method,
  headers: { "Content-Type": "application/json" },
  mode: "cors",
  cache: "no-cache",
  body: body ? JSON.stringify(body) : undefined,
});

export default {
  methods: {
    getNotes: () => fetch(`${rootUrl}/posts`, options("get")),
    postNote: (note) => fetch(`${rootUrl}/posts`, options("post", { note })),
    putNote: (id, note) =>
      fetch(`${rootUrl}/posts/${id}`, options("put", { note })),
    deleteNote: (id) => fetch(`${rootUrl}/posts${id}`, options("delete")),
  },
};
