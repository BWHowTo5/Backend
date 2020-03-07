const db = require("./data/dbConfig.js");
const supertest = require("supertest");
const server = require("./index.js");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInVzZXJuYW1lIjoiVGVzdCBVc2VyIiwiaWF0IjoxNTgzNTUxMDc0LCJleHAiOjE1ODM2MjY2NzR9.aAblS9PRoad8sgFmORj6n-JNQkY35Mx7oyksH7eSJgU";

const checkStatusAndType = (res, status) => {
  expect(res.status).toBe(status);
  expect(res.type).toBe("application/json");
};

beforeEach(async () => {
  await db.seed.run();
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
test("SUCCESSFUL GET REQUEST (/api/users/:id", async () => {
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
