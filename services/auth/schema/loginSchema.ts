export const loginSchema = {
  $async: true,
  additionalProperties: false,
  properties: {
      password: {
          type: "string",
      },
      email: {
          maxLength: 250,
          type: "string",
      },
      token: {
          type: "string",
      }
  },
  required: ["password", "email"],
  type: "object",
};
