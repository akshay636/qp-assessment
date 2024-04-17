export const registerSchema = {
  $async: true,
  additionalProperties: false,
  errorMessage: {
      properties: {
          password: "Password should be 6 - 30 characters length.",
          email: "User with this email id is already exist.",
          phone: "User with this phone number is already exist."
      },
  },
  properties: {
      email: {
          format: "email",
          isUnique: {
              field: "email",
              model: "User",
          },
          maxLength: 100,
          minLength: 1,
          type: "string",
      },
      firstName:{
        type: "string",
      },
      lastName:{
        string:"string"
      },
      type:{
        type: "string",
        enum:["ADMIN", "CUSTOMER"]
      },
      password: {
          pattern: "^.{6,}$",
          type: "string",
      },
      phone: {
          isUnique: {
              field: "phone",
              model: "User",
          },
          maxLength: 15,
          minLength: 10,
          type: "string",
      },
      address: {
        type: "string"
      }
  },
  required: ["email", "password", "phone", "type","firstName"],
  type: "object",
};
