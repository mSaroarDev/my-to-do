import { SignJWT, jwtVerify } from "jose";

export async function CreateToken(id, fullName, email) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({ id: id, fullName: fullName, email: email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer(process.env.JWT_ISSUER)
    .setExpirationTime(process.env.JWT_EXPIRE)
    .sign(secret);

  return token;
}

export async function VerifyToken(token) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const decodedToken = await jwtVerify(token, secret);
  return decodedToken["payload"];
}
