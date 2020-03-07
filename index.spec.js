const db = require("./data/dbConfig.js");
const supertest = require("supertest");
const server = require("./index.js");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInVzZXJuYW1lIjoiVGVzdCBVc2VyIiwiaWF0IjoxNTgzNTUxMDc0LCJleHAiOjE1ODM2MjY2NzR9.aAblS9PRoad8sgFmORj6n-JNQkY35Mx7oyksH7eSJgU";

const checkStatusAndType = (res, status) => {
  expect(res.status).toBe(status);
  expect(res.type).toBe("application/json");
};

beforeEach(() => {
  return db.migrate
    .rollback()
    .then(() => db.migrate.latest())
    .then(() => db.seed.run());
});

/*=============== USERS ===============*/

// GET "/api/users"
test("SUCCESSFUL GET REQUEST (/api/users)", async () => {
  const res = await supertest(server)
    .get("/api/users")
    .set({
      Authorization: token
    });

  checkStatusAndType(res, 200);
  expect(res.body.length).toBe(4);
  expect(res.body[0]["username"]).toBe("autobot-leader");
});

// GET "/api/users/:id"
test("SUCCESSFUL GET REQUEST (/api/users/:id)", async () => {
  const res = await supertest(server)
    .get("/api/users/2")
    .set({ Authorization: token });

  checkStatusAndType(res, 200);
  expect(res.body.id).toBe(2);
  expect(res.body.username).toBe("all-hail-me");
});

// POST "/api/users/register"
test("SUCCESSFUL REGISTRATION (/api/users/register)", async () => {
  const res = await supertest(server)
    .post("/api/users/register")
    .send({
      username: "Test User",
      email: "testuser@test.com",
      password: "testpassword",
      creator: true
    });

  checkStatusAndType(res, 201);
  expect(res.body.user.id).toBe(5);
});

// POST "/api/users/login"
test("SUCCESSFUL LOGIN (/api/users/login)", async () => {
  const res = await supertest(server)
    .post("/api/users/login")
    .send({
      email: "ejeeeect@decepticons.com",
      password: "autobotsinferior"
    });

  checkStatusAndType(res, 200);
  expect(res.body.message).toBe("cassette-master has successfully logged in.");
});

// PUT "/api/users/:id"
test("SUCCESSFUL USER UPDATE (/api/users/:id)", async () => {
  const res = await supertest(server)
    .put("/api/users/3")
    .send({ email: "test", password: "testtest" })
    .set({ Authorization: token });

  checkStatusAndType(res, 200);
  expect(res.body.id).toBe(3);
  expect(res.body.email).toBe("test");
});

// DELETE "/api/users/:id"
test("SUCCESSFUL USER DELETION (/api/users/:id)", async () => {
  const res = await supertest(server)
    .delete("/api/users/3")
    .set({ Authorization: token });

  checkStatusAndType(res, 200);
  expect(res.body.message).toBe("1 record was deleted.");
});

/*=============== HOW-TOS ===============*/

// GET "/api/how-tos"
test("SUCCESSFUL GET REQUEST (/api/how-tos)", async () => {
  const res = await supertest(server)
    .get("/api/how-tos")
    .set({
      Authorization: token
    });

  checkStatusAndType(res, 200);
  expect(res.body.length).toBe(4);
  expect(res.body[0]["title"]).toBe("Test How-To #1");
});

// GET "/api/how-tos/:id"
test("SUCCESSFUL GET REQUEST (/api/how-tos/:id)", async () => {
  const res = await supertest(server)
    .get("/api/how-tos/3")
    .set({ Authorization: token });

  checkStatusAndType(res, 200);
  expect(res.body.id).toBe(3);
  expect(res.body.title).toBe("Test How-To #3");
});

// POST "/api/how-tos"
test("SUCCESSFUL HOW-TO ADD (/api/how-tos)", async () => {
  const res = await supertest(server)
    .post("/api/how-tos")
    .send({
      title: "Test",
      summary: "Postman test test test",
      content: "Postman test test test test test test test test test test.",
      user_id: 1
    })
    .set({ Authorization: token });

  checkStatusAndType(res, 201);
  expect(res.body.id).toBe(5);
  expect(res.body.title).toBe("Test");
});

// PUT "/api/how-tos/:id"
test("SUCCESSFUL USER UPDATE (/api/how-tos/:id)", async () => {
  const res = await supertest(server)
    .put("/api/how-tos/3")
    .send({ title: "Update Test", likes: 5, dislikes: 2 })
    .set({ Authorization: token });

  checkStatusAndType(res, 200);
  expect(res.body.id).toBe(3);
  expect(res.body.title).toBe("Update Test");
});

// DELETE "/api/how-tos/:id"
test("SUCCESSFUL USER DELETION (/api/how-tos/:id)", async () => {
  const res = await supertest(server)
    .delete("/api/how-tos/3")
    .set({ Authorization: token });

  checkStatusAndType(res, 200);
  expect(res.body.message).toBe("1 record was deleted.");
});

/*=============== LIKES ===============*/

// POST "/api/likes"
test("SUCCESSFUL LIKE ADD (/api/likes)", async () => {
  const res = await supertest(server)
    .post("/api/likes")
    .send({
      user_id: 4,
      how_to_id: 4
    })
    .set({ Authorization: token });

  checkStatusAndType(res, 201);
  expect(res.body.id).toBe(4);
  expect(res.body.likes).toBe(4);
});

// DELETE "/api/likes"
test("SUCCESSFUL USER DELETION (/api/likes)", async () => {
  const res = await supertest(server)
    .delete("/api/likes")
    .send({ user_id: 1, how_to_id: 2 })
    .set({ Authorization: token });

  checkStatusAndType(res, 200);
  expect(res.body.id).toBe(2);
  expect(res.body.likes).toBe(1);
});

/*=============== DISLIKES ===============*/

// POST "/api/dislikes"
test("SUCCESSFUL LIKE ADD (/api/dislikes)", async () => {
  const res = await supertest(server)
    .post("/api/dislikes")
    .send({
      user_id: 4,
      how_to_id: 4
    })
    .set({ Authorization: token });

  checkStatusAndType(res, 201);
  expect(res.body.id).toBe(4);
  expect(res.body.dislikes).toBe(1);
});

// DELETE "/api/dislikes"
test("SUCCESSFUL USER DELETION (/api/dislikes)", async () => {
  const res = await supertest(server)
    .delete("/api/dislikes")
    .send({ user_id: 2, how_to_id: 2 })
    .set({ Authorization: token });

  checkStatusAndType(res, 200);
  expect(res.body.id).toBe(2);
  expect(res.body.dislikes).toBe(0);
});
