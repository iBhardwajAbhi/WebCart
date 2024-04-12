import JWT from "jsonwebtoken";

export const isSignedIn = async (req, res, next) => {
  try {
    const decode = await JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    // console.log("authorization don");
    next();
  } catch (error) {
    console.log(req.headers.authorization);
    res.send("Unauthorized Access");
  }
};
