const { guard } = require("../helpers/guard");
const passport = require("passport");

describe.skip("testing authorization guard ", () => {
  const user = { token: "111222333" };
  let req, res, next;
  beforeEach(() => {
    req = { get: jest.fn((header) => `Bearer ${user.token}`), user };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn((data) => data),
    };
    next = jest.fn();
  });
  it("with token success", async () => {
    passport.authenticate = jest.fn(
      (strategy, options, cb) => (req, res, next) => cb(null, user)
    );
    await guard(req, res, next);
    expect(req.get).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
  it("wrong token ", async () => {
    passport.authenticate = jest.fn(
      (strategy, options, cb) => (req, res, next) => cb(null, false)
    );
    await guard(req, res, next);
    expect(req.get).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it("not have token", async () => {
    passport.authenticate = jest.fn(
      (strategy, options, cb) => (req, res, next) =>
        cb(null, { token: "123456" })
    );
    await guard(req, res, next);
    expect(req.get).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
  });
});
